import React from 'react'

const RatingStars = ({rating}) => {
    const stars = [];
    for(let i = 1; i <= 5; i++){
        stars.push(
            <span key={i} className={`ri-star${i <= rating ? '-fill' : '-line'}`}></span>
        )
    }
  return (
    <div className="mb-1 text-xs text-primary">
      {stars}
    </div>
  )
}

export default RatingStars
