import React, { useState } from 'react';
import ChatBox from '../../features/chat/ChatBox';

const AdminChat = () => {
  const adminId = '68132d81d2cff31598b17d46';
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { _id: '6866de720bef8ef8b7a8dc6c', name: 'Sandini' },
    { _id: '6825a0090add62eaf9337b48', name: 'Nekmal' },
    { _id: '6866e5c90bef8ef8b7a8dcad', name: 'Theekshana' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">💬 Admin Chat Dashboard</h2>

        <div className="flex gap-6">
          {/* Sidebar - User List */}
          <div className="w-1/4 bg-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3"><i class="ri-user-3-fill text-primary"></i> Users</h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(`user_${user._id}`)}
                  className={`cursor-pointer px-3 py-2 rounded-md transition
                    ${
                      selectedUser === `user_${user._id}`
                        ? 'bg-primary text-white'
                        : 'hover:bg-blue-100 text-gray-800'
                    }`}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 bg-gray-50 rounded-lg border p-4">
            {selectedUser ? (
              <ChatBox currentUserId={adminId} recipientId={selectedUser} />
            ) : (
              <div className="text-gray-500 h-full flex items-center justify-center">
                Select a user to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
