import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi';
import UpdateUserRole from './UpdateUserRole';

const ManageUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id).unwrap();
      alert("User deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <h2 className="text-3xl font-bold mb-6"><i class="ri-user-line text-primary text-2xl"></i>Manage Users</h2>

        {isLoading && (
          <div className="text-center py-20">
            <i className="ri-loader-4-line animate-spin text-3xl text-primary"></i>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-10">
            <i className="ri-error-warning-line text-2xl"></i>
            <p>Failed to load users data.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="text-left px-6 py-3">No.</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Role</th>
                  <th className="text-left px-6 py-3">Edit</th>
                  <th className="text-left px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {users.map((user, index) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{user?.email || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          user?.role === 'admin'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user?.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleEdit(user)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm hover:bg-primary-light transition"
                      >
                        <i className="ri-edit-2-line"></i>Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(user?._id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary-dark transition"
                      >
                        <i className="ri-delete-bin-6-line"></i>Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

    
      </div>

      {isModalOpen && selectedUser && (
        <UpdateUserRole
          user={selectedUser}
          onClose={handleCloseModal}
          onRoleUpdate={refetch}
        />
      )}
    </>
  );
};

export default ManageUsers;
