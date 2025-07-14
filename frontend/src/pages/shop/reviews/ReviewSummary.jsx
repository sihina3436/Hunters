import React from 'react';
import RatingStars from '../../../components/RatingStars';

const ReviewSummary = ({ average, totalRatings, starCounts }) => {
  const getBarWidthPercent = (count) =>
    totalRatings ? (count / totalRatings) * 100 : 0;

  return (
    <div className="p-8 bg-white rounded-3xl shadow-lg max-w-4xl mx-auto mb-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Average Rating */}
        <div className="text-center md:text-left mx-20">
          <p className="text-5xl font-extrabold text-gray-900">{average}</p>
          <div className="flex items-center justify-center md:justify-start mt-2 text-2xl">
            <RatingStars rating={Math.round(average)} />
          </div>
          <p className="text-md text-gray-700 mt-2">
            Customer Reviews: {totalRatings}
          </p>
        </div>

        {/* Breakdown Bars */}
        <div className="w-full max-w-sm space-y-2 mx-10">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = starCounts[star];
            const percent = getBarWidthPercent(count);

            return (
              <div key={star} className="flex items-center text-sm">
                <span className="w-8 text-gray-700 font-medium">
                  {star} <i className="ri-star-fill text-primary"></i>
                </span>
                <div className="relative flex-1 h-3 bg-gray-200 rounded-full mx-3 overflow-hidden max-w-[300px]">
                  <div
                    className="h-3 bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="w-8 text-gray-500 text-right font-semibold">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
