import React, { useState, useMemo } from 'react';
import commentorIcon from '../../../assets/userImg.jpg';
import { formatDate } from '../../../utils/formateDate';
import RatingStars from '../../../components/RatingStars';
import PostAReviews from './PostAReviews';
import ReviewSummary from './ReviewSummary';

const ReviewsCart = ({ ProductRevies }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  const reviews = ProductRevies || [];

  const handleOpenReviewModal = () => setIsModelOpen(true);
  const handleCloseReviewModal = () => setIsModelOpen(false);

  const filteredReviews = useMemo(() => {
    let result = [...reviews];
    if (filter === 'with-images') result = result.filter(r => r.image);
    else if (filter === '5-star') result = result.filter(r => r.rating === 5);

    if (sort === 'newest') result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    else if (sort === 'highest') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'lowest') result.sort((a, b) => a.rating - b.rating);

    return result;
  }, [reviews, sort, filter]);

  const ratingSummary = useMemo(() => {
    const totalRatings = reviews.length;
    const starCounts = [0, 0, 0, 0, 0, 0];
    let sum = 0;
    reviews.forEach(r => {
      starCounts[r.rating]++;
      sum += r.rating;
    });

    return {
      average: totalRatings ? (sum / totalRatings).toFixed(1) : 0,
      starCounts,
      totalRatings,
    };
  }, [reviews]);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10 font-sans">
      {/* Section Title */}
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Product Reviews
      </h1>

      {/* Review Summary Section */}
      <ReviewSummary
        average={ratingSummary.average}
        totalRatings={ratingSummary.totalRatings}
        starCounts={ratingSummary.starCounts}
      />

      {/* Sort & Filter Section */}
      {filteredReviews.length > 0 && (
      <div className="w-full max-w-6xl mx-auto flex flex-wrap gap-6 items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 font-medium">Sort by:</label>
          <select
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 font-medium">Filter:</label>
          <select
            className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="with-images">With Images Only</option>
            <option value="5-star">5 Star Only</option>
          </select>
        </div>
      </div>
      )}

      {/* Review List (Full Width) */}
      <div className="w-full max-w-7xl mx-auto">
        {filteredReviews.length > 0 ? (
          <div className="space-y-8">
            {filteredReviews.map((review, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6"
              >
                <img
                  src={commentorIcon}
                  alt="user"
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-primary font-semibold capitalize underline underline-offset-4 mb-1">
                    {review.userId.username}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">{formatDate(review.updatedAt)}</p>
                  <RatingStars rating={review.rating} />
                  <p className="mt-4 text-gray-700">{review.comment}</p>
                </div>
                {review.image && (
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-40 h-auto object-cover rounded-lg shadow-md self-start mx-10"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No reviews yet.</p>
        )}
      </div>

      {/* Add Review Button */}
      <div className="text-center mt-12">
        <button
          onClick={handleOpenReviewModal}
          className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full shadow-lg transition"
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
