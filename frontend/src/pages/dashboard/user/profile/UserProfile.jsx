import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditProfileMutation } from '../../../../redux/features/auth/authApi';
import { setUser } from '../../../../redux/features/auth/authSlice';
import userImage from '../../../../assets/userImg.jpg';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [editProfile, { isLoading, isError, error, isSuccess }] = useEditProfileMutation();

  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    profileImage: '',
    bio: '',
    profession: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });

  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        userId: user._id || '',
        username: user.username || '',
        profileImage: user.profileImage || '',
        bio: user.bio || '',
        profession: user.profession || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          postalCode: user.address?.postalCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["street", "city", "state", "postalCode", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: formData.userId,
      username: formData.username,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      address: formData.address
    };

    try {
      const response = await editProfile(updatedUser).unwrap();
      dispatch(setUser(response.user));
      alert("Profile updated successfully");
      setIsModelOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={formData.profileImage || userImage}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-primary"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold mb-2">{formData.username || 'N/A'}</h2>
          <p className="text-gray-600 mb-1"><span className="font-semibold">Bio:</span> {formData.bio || 'N/A'}</p>
          <p className="text-gray-600 mb-4"><span className="font-semibold">Profession:</span> {formData.profession || 'N/A'}</p>

          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Shpping Address</h3>
            <p><span className="font-medium">Street:</span> {formData.address.street || 'N/A'}</p>
            <p><span className="font-medium">City:</span> {formData.address.city || 'N/A'}</p>
            <p><span className="font-medium">State:</span> {formData.address.state || 'N/A'}</p>
            <p><span className="font-medium">Postal Code:</span> {formData.address.postalCode || 'N/A'}</p>
            <p><span className="font-medium">Country:</span> {formData.address.country || 'N/A'}</p>
          </div>
        </div>

        <button
          onClick={() => setIsModelOpen(true)}
          className="ml-auto bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-lg shadow-md transition"
          aria-label="Edit Profile"
          title="Edit Profile"
        >
          <i className="ri-profile-fill text-xl"></i> Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start pt-12 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-xl md:w-3/4 max-w-3xl mx-auto relative shadow-lg">
            <button
              onClick={() => setIsModelOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              aria-label="Close modal"
            >
              <i className="ri-close-circle-line"></i>
            </button>

            <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left column */}
              <div>
                <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />

                <label htmlFor="profileImage" className="block mt-4 mb-1 font-semibold text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                />

                <label htmlFor="bio" className="block mt-4 mb-1 font-semibold text-gray-700">Bio</label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />

                <label htmlFor="profession" className="block mt-4 mb-1 font-semibold text-gray-700">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                />
              </div>

              {/* Right column (address fields) */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

                <label htmlFor="street" className="block mb-1 font-semibold text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />

                <label htmlFor="city" className="block mt-4 mb-1 font-semibold text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />

                <label htmlFor="state" className="block mt-4 mb-1 font-semibold text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />

                <label htmlFor="postalCode" className="block mt-4 mb-1 font-semibold text-gray-700">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />

                <label htmlFor="country" className="block mt-4 mb-1 font-semibold text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.address.country}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-gray-300"
                  required
                />
              </div>

              {/* Submit button spans full width */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {/* Status messages */}
              {isError && (
                <p className="text-red-500 col-span-2 mt-2">Something went wrong. {console.log(error)}</p>
              )}
              {isSuccess && (
                <p className="text-green-500 col-span-2 mt-2">Profile updated successfully</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
