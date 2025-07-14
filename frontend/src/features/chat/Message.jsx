const Message = ({ message, currentUserId }) => {
  const isOwn = message.senderId === currentUserId;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`text-sm p-2 rounded-lg max-w-xs break-words shadow-sm
        ${isOwn ? 'bg-primary text-white' : 'bg-gray-400 text-gray-900'}`}
      >
        {message.text}
        <div className="text-[10px] text-right text-white mt-1">
          {message.timestamp?.toDate().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;
