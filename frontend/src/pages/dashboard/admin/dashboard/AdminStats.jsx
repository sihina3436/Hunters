import React from 'react'
import { Pie, Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminStatsChart = ({ stats }) => {
    console.log(stats);

    const pieData = {
        labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'],
        datasets: [
            {
                label: "Admin Stats",
                data: [
                    stats?.totalOrders,
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: [
                    '#FB9EC6',
                    '#EC7FA9',
                    '#FDB7EA',
                    '#FF77B7',
                ],
                hoverBackgroundColor: [
                    '#FB9EC6',
                    '#EC7FA9',
                    '#FDB7EA',
                    '#FF77B7',
                ]
            }
        ]
    };

    const monthlyEarningsData = new Array(12).fill(0);
    stats?.monthlyEarnings.forEach((entry) => {
        monthlyEarningsData[entry.month - 1] = entry.earnings;
    });

    const lineData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: monthlyEarningsData,
                fill: false,
                backgroundColor: '#e53888',
                borderColor: '#E53888',
                tension: 0.3,
            }
        ]
    };

    const barData = {
        labels: ['Total Products', 'Total Reviews', 'Total Users'],
        datasets: [
            {
                label: 'Stats Summary',
                data: [
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: ['#FB9EC6', '#EC7FA9', '#FDB7EA'],
                borderRadius: 6,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12, // smaller font
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 10,
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: 10,
                    }
                }
            }
        }
    };

    return (
        <div className="mt-10 space-y-10">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <i className="ri-bar-chart-2-fill text-primary"></i> Admin Stats Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-white rounded-xl shadow-md p-4 h-[300px] justify-center items-center flex flex-col">
                    <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                        <i className="ri-pie-chart-2-fill text-pink-500"></i> Orders / Products / Reviews / Users
                    </h3>
                    <Pie data={pieData}  />
                </div>

                {/* Line Chart */}
                <div className="bg-white rounded-xl shadow-md p-4 h-[300px] justify-center items-center flex flex-col">
                    <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                        <i className="ri-line-chart-line text-primary"></i> Monthly Earnings
                    </h3>
                    <Line data={lineData} options={options} />
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-4 h-[300px] justify-center items-center flex flex-col">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <i className="ri-bar-chart-fill text-primary"></i> Products / Reviews / Users Summary
                </h3>
                <Bar data={barData} options={options} />
            </div>

            <div className="text-center text-gray-400 text-sm mt-6">
                ZeroZcloths © 2025
            </div>
        </div>
    );
}

export default AdminStatsChart;
