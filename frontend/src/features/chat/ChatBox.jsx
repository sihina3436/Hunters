// src/features/chat/ChatBox.js
import React, { useEffect, useRef, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import Message from './Message';

const ChatBox = ({ currentUserId, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  const getChatId = (a, b) => {
    return [a, b].sort().join('_');
  };

  useEffect(() => {
    const chatId = getChatId(currentUserId, recipientId);
    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('timestamp')
    );

    const unsub = onSnapshot(q, async (querySnapshot) => {
      const msgs = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((msg) => msg.timestamp);

      setMessages(msgs);

      
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.recipientId === currentUserId && !data.isRead) {
          batch.update(doc.ref, { isRead: true });
        }
      });
      await batch.commit();
    });

    return () => unsub();
  }, [currentUserId, recipientId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const chatId = getChatId(currentUserId, recipientId);

    await addDoc(collection(db, 'messages'), {
      chatId,
      senderId: currentUserId,
      recipientId,
      text: newMsg.trim(),
      timestamp: serverTimestamp(),
      isRead: false, 
    });

    setNewMsg('');
  };

  return (
    <div className="w-full h-[500px] border rounded p-4 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} currentUserId={currentUserId} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="border flex-1 p-2 rounded"
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
