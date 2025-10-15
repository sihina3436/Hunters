import React from 'react'
import { useSelector } from 'react-redux';
import ChatBox from '../../features/chat/ChatBox';

const UserChat = () => {
   const user = useSelector((state) => state.auth.user);
  const currentUserId = `user_${user._id}`;
  const adminId = '6875f3f1c516a1d9184ce940'; 
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Chat with Seller</h2>
      <ChatBox currentUserId={currentUserId} recipientId={adminId} />
    </div>
  );
}

export default UserChat