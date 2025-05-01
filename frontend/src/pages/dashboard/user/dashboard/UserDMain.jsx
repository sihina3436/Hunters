import React from 'react'
import { useSelector } from 'react-redux';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import Spinner from '../../../../components/Spinner';
import { Bar } from "react-chartjs-2";
import UserStats from './UserStats';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  if (isLoading) return <Spinner />;
  if (!stats) return <div className='text-center text-2xl font-semibold text-gray-600'>No Data Available</div>;

  const data = {
    labels: ['Total Payments', 'Total Reviews', 'Total Purchase Products'],
    datasets: [
      {
        label: 'User Stats',
        data: [stats?.totalPayments, stats?.totalReviews * 100, stats?.totalPurchasedProducts * 100],
        backgroundColor: 'rgba(229, 56, 136, 0.6)',
        borderColor: 'rgba(172, 23, 84, 1)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.label === 'Total Payments') {
              return `Total Payments: ${tooltipItem.raw.toFixed(2)}`;
            }
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen space-y-8">

      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Hi, <span className="font-semibold">{user?.username}</span> — Here's your activity overview.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Performance Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <UserStats stats={stats} />
          </div>
          <div>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserDMain
