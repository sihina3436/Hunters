import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserRole = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user?.role);
    const [updateUserRole] = useUpdateUserRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ userId: user?._id, role }).unwrap();
            alert("User role updated successfully");
            onRoleUpdate(); 
            onClose(); 
        } catch (error) {
            console.error("Error updating user role:", error);
            alert("Failed to update user role. Please try again.");
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm'>
            <div className='bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transition-all'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Update User Role</h2>

                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-600 mb-1'>Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-800 focus:outline-none cursor-not-allowed focus:ring-primary focus:border-primary'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-600 mb-1'>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
                        >
                            <option value="user" >User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <div className='flex justify-end space-x-3 mt-8'>
                    <button
                        onClick={onClose}
                        className='px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        className='px-4 py-2 text-sm rounded-lg bg-primary text-white hover:bg-primary-dark transition'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserRole;
