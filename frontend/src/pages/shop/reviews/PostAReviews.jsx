import React, { useState } from 'react';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewApi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import upload_area from '../../../assets/upload_area.png'

const PostAReviews = ({ isModelOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null)
  // const [image2, setImage2] = useState(null)

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReviews] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('rating', rating);
    formData.append('userId', user?._id);
    formData.append('productId', id);

    if (image) formData.append('file', image);
    // if (image2) formData.append('file', image2)

    try {
      await postReviews(formData).unwrap();
      alert('Review posted successfully!');
      setComment('');
      setRating(0);
      setImage(false)
      // setImage2(false)
      refetch();
      handleClose();
    } catch (error) {
      alert(error?.data?.message || error.message);
    }


  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${isModelOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-90'
        }`}
    >
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl transform transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Post a Review</h2>

        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={`text-2xl cursor-pointer transition-colors ${rating >= star ? 'text-primary' : 'text-gray-300'
                }`}
            >
              <i className={rating >= star ? 'ri-star-fill' : 'ri-star-line'}></i>
            </span>
          ))}
        </div>

        <textarea
          rows={4}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none mb-4 resize-none"
        ></textarea>

        {/* image upload */}
        <div className="flex gap-2 mb-2">
          <label htmlFor="image">
              <img src={ !image ? upload_area : URL.createObjectURL(image)} className='w-10 cursor-pointer' alt="" />
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
            {/* <label htmlFor="image2">
              <img src={ !image2 ? upload_area : URL.createObjectURL(image2)} className='w-10 cursor-pointer' alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
            </label> */}
        </div>
      

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReviews;
