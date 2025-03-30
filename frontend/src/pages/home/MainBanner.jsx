import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import Banner01 from './Banner01';
import Banner02 from './Banner02';
import Banner03 from './Banner03';
import Banner04 from './Banner04';

const MainBanner = () => {
  return (
    <div className='max-w-[1400px] mx-auto p-8'>
        <Swiper
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 2500, // Time interval for auto transition
            disableOnInteraction: false, // Keep autoplay running after interaction
          }}
          loop={true}  // Enables looping
          direction="horizontal" // Ensures horizontal direction (right to left)
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Banner01/>
          </SwiperSlide>
          <SwiperSlide>
            <Banner02/>
          </SwiperSlide>
          <SwiperSlide>
            <Banner03/>
          </SwiperSlide>
          <SwiperSlide>
            <Banner04/>
          </SwiperSlide>
        </Swiper>
      
    </div>
  )
}

export default MainBanner
