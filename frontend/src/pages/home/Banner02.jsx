import React from 'react';
import banner02 from '../../assets/Banner02.png';

const Banner02 = () => {
  return (
    <div className="max-w-screen-2xl m-auto py-12 px-4 sm:py-16 md:py-20 min-h-[500px] md:min-h-[650px] bg-primary-light rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      {/* Text Section */}
      <div className="max-w-[600px] mx-auto text-center md:text-left">
        <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl font-bold">
          Fresh Finds Just for You!
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2">
          Shop the Latest Trends Now!
        </h2>
        <h4 className="mt-3 text-sm sm:text-base md:text-lg text-primary mb-5">
          Be the first to get your hands on the hottest new arrivals! From fashion to home
          essentials, discover what’s trending today.
        </h4>

        <button className="py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base text-white bg-primary rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-primary-dark">
          SHOP NOW
        </button>
      </div>

      {/* Image Section */}
      <div className="relative flex justify-center md:justify-end h-64 sm:h-80 md:h-full">
        <img
          src={banner02}
          alt="banner02"
          className="max-w-[300px] sm:max-w-[400px] md:max-w-[500px] object-contain"
        />
      </div>

    </div>
  );
};

export default Banner02;
