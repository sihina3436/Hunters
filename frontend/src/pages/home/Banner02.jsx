import React from 'react'
import banner02 from '../../assets/Banner02.png';

const Banner02 = () => {
  return (
    <div className="max-w-screen-2xl m-auto py-20 px-4 min-h-[650px] bg-primary-light rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      <div className="max-w-[600px] ml-auto">
        <h1 className="uppercase text-5xl font-bold">Fresh Finds Just for You!</h1>
        <h1 className="text-3xl font-bold mt-2">Shop the Latest Trends Now!</h1>
        <h4 className="mt-3 text-lg  text-primary mb-5">Be the first to get your hands on the hottest new arrivals! From fashion to home essentials, discover what’s trending today</h4>

        <button className="py-3 px-6 outline-none border-0 text-base text-white bg-primary rounded-[5px] cursor-pointer transition-all duration-300 hover:bg-primary-dark">
          SHOP NOW
        </button>
      </div>

      <div className="relative h-full ml-8">
        <img src={banner02} alt="banner01" className='absolute left-1/2 bottom-[-5rem] -translate-x-1/2 max-w-[500px] '/>
      </div>

    </div>
  )
}

export default Banner02
