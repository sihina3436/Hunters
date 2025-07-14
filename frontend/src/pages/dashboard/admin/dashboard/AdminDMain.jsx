import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import Spinner from '../../../../components/Spinner';
import ProfileImage from '../../../../components/ProfileImage';
import userImg from '../../../../assets/userImg.jpg';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <div>Failed to load stats!</div>;
  if (!stats) return <div>No stats found</div>;

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Admin Dashboard</h1>
            <p className="text-gray-500">
              Hi, {user?.username}! Welcome to the admin dashboard.
            </p>
          </div>

          <div>
            <ProfileImage
              src={user?.image?.trim() ? user.image : userImg}
              alt={user?.username}
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>

        <AdminStats stats={stats} />
        <AdminStatsChart stats={stats} />
      </div>
    </div>
  );
};

export default AdminDMain;
