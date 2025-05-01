import React from 'react';

const ProfileImage = ({ src, alt }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={src}
        alt={alt || "Profile"}
        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default ProfileImage;
