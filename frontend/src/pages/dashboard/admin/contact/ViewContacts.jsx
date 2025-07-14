import React from 'react';
import { useGetContactsQuery } from '../../../../redux/features/contact/contactApi';

const ViewContacts = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery();

  if (isLoading) return <div className="text-center py-12 text-gray-500">Loading contact messages...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error loading messages.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center flex items-center justify-center gap-2">
        <i className="ri-mail-send-line text-3xl"></i>
        Contact Messages
      </h2>

      {contacts?.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map(({ _id, name, email, message, createdAt }) => (
            <div
              key={_id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="text-primary font-semibold mb-2 flex items-center gap-2">
                <i className="ri-user-line text-lg"></i>
                {name}
              </div>

              <div className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                <i className="ri-mail-line text-lg"></i>
                {email}
              </div>

              <p className="text-gray-800 mb-4 whitespace-pre-wrap border-l-4 border-pink-100 pl-4 py-2 italic">
                {message}
              </p>

              <div className="flex items-center text-gray-400 text-sm mt-4">
                <i className="ri-time-line mr-1 text-base"></i>
                {new Date(createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewContacts;
