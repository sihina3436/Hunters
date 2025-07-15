// src/pages/admin/AdminChat.js
import React, { useEffect, useState } from 'react';
import ChatBox from '../../features/chat/ChatBox';
import { db } from '../../features/chat/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import { useSelector } from 'react-redux';

const AdminChat = () => {

  const {user} = useSelector((state) => state.auth);
  // const adminId2 = `user_${user._id}`; // Use the current admin's

 const adminId = '6875f3f1c516a1d9184ce940';

 //console.log(`Admin ID: ${adminId}`);
 //console.log(`Admin ID2: ${adminId2}`);
 


  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});

  const { data: users = [], error, isLoading } = useGetUserQuery();

  // 🔴 Listen for unread messages to Admin
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('recipientId', '==', adminId),
      where('isRead', '==', false)
    );

    const unsub = onSnapshot(q, (querySnapshot) => {
      const counts = {};

      querySnapshot.docs.forEach((doc) => {
        const senderId = doc.data().senderId;
        const normalizedId = senderId.startsWith('user_') ? senderId : `user_${senderId}`;
        counts[normalizedId] = (counts[normalizedId] || 0) + 1;
      });

      setUnreadCounts(counts);
    });

    return () => unsub();
  }, []);

  console.log(users);

  // 🌀 Loading / Error Handling
  if (isLoading) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center text-gray-600">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center text-red-600">
        Failed to load users 😢
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          💬 Admin Chat Dashboard
        </h2>

        <div className="flex gap-6">
          {/* Sidebar - User List */}
          <div className="w-1/4 bg-gray-100 rounded-lg p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              <i className="ri-user-3-fill text-primary"></i> Users
            </h3>
            <div className="space-y-2">
              {users.map((user) => {
                const userId = `user_${user._id}`;
                const unreadCount = unreadCounts[userId] || 0;

                return (
                  <div
                    key={user._id}
                    onClick={() => setSelectedUser(userId)}
                    className={`relative cursor-pointer px-3 py-2 rounded-md transition
                      ${
                        selectedUser === userId
                          ? 'bg-primary text-white'
                          : 'hover:bg-blue-100 text-gray-800'
                      }`}
                  >
                    {user.username}
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                );
              })}
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
