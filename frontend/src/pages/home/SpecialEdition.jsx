import React from 'react'
import SpecialEditionimg from '../../assets/SpecialEdition.jpg'

const SpecialEdition = () => {
  return (
    <div className='max-w-[1400px] mx-auto p-4 sm:p-8'>
      {/* Heading */}
      <h2 className="relative mb-6 text-2xl sm:text-[42px] font-semibold font-custom text-text-dark text-center 
        after:content-[''] after:block after:w-20 sm:after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
        Special Edition
      </h2>

      {/* Main content */}
      <div className="bg-primary text-white flex flex-col md:flex-row items-center p-6 sm:p-8 rounded-lg">
        {/* Text section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="uppercase text-xs sm:text-sm font-semibold">Limited Time Offer</p>
          <h2 className="text-xl sm:text-3xl font-bold mt-2">Special Edition</h2>
          <p className="mt-3 text-xs sm:text-sm px-2 md:px-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec 
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <p className="mt-4 font-semibold text-sm sm:text-base">
            Buy This T-shirt At 20% Discount, Use Code 
            <span className="text-yellow-400"> OFF20</span>
          </p>
          <button className="mt-6 bg-white text-primary px-6 py-2 text-sm sm:text-base font-bold rounded shadow-md hover:bg-gray-200">
            SHOP NOW
          </button>
        </div>

        {/* Image section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <img
            src={SpecialEditionimg}
            alt="Special Edition"
            className="rounded-lg max-w-[80%] sm:max-w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default SpecialEdition
