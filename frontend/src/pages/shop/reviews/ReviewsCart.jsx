import React, { useState } from 'react';
import commentorIcon from '../../../assets/userImg.jpg';
import { formatDate } from '../../../utils/formateDate';
import RatingStars from '../../../components/RatingStars';
import PostAReviews from './PostAReviews';


const ReviewsCart = ({ ProductRevies }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const reviews = ProductRevies || [];

  const handleOpenReviewModal = () => setIsModelOpen(true);
  const handleCloseReviewModal = () => setIsModelOpen(false);

  return (
    <div className="my-10 p-6 bg-white rounded-2xl shadow-md">
      <div className="mb-8">
        {reviews.length > 0 ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">All Comments</h3>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <img
                      src={commentorIcon}
                      alt="user"
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-primary font-medium capitalize underline underline-offset-4">
                        {review.userId.username}
                      </p>
                      <p className="text-sm text-gray-400">{formatDate(review.updatedAt)}</p>
                      <div className="mt-1">
                        <RatingStars rating={review.rating} />
                      </div>
                      <p className="mt-4 text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center">No reviews yet!</p>
        )}
      </div>

      {/* Add Review Button */}
      <div className="text-center">
        <button
          onClick={handleOpenReviewModal}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      <PostAReviews isModelOpen={isModelOpen} handleClose={handleCloseReviewModal} />
    </div>
  );
};

export default ReviewsCart;
