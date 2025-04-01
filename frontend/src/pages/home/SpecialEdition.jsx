import React from 'react'
import SpecialEditionimg from '../../assets/SpecialEdition.jpg'

const SpecialEdition = () => {
  return (
     <div className='max-w-[1400px] mx-auto p-8'>
        <h2 className="relative mb-4 text-[42px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">Special Edition</h2>
        <div className="bg-primary text-white flex items-center p-8 rounded-lg">
    <div className="w-1/2">
      <p className="uppercase text-sm font-semibold">Limited Time Offer</p>
      <h2 className="text-3xl font-bold mt-2">Special Edition</h2>
      <p className="mt-3 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec 
        ullamcorper mattis, pulvinar dapibus leo.
      </p>
      <p className="mt-4 font-semibold">
        Buy This T-shirt At 20% Discount, Use Code <span className="text-yellow-400">OFF20</span>
      </p>
      <button className="mt-6 bg-white text-primary px-6 py-2 font-bold rounded shadow-md hover:bg-gray-200">
        SHOP NOW
      </button>
    </div>
    <div className="w-1/2">
      <img
        src={SpecialEditionimg}
        alt="Special Edition"
        className="rounded-lg"
      />
    </div>
  </div>
     </div>
  )
}

export default SpecialEdition
