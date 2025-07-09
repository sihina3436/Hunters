import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import about from '../assets/who-we-are.jpg';
import category01 from '../assets/category01.jpg';
import category02 from '../assets/category02.jpg';
import category03 from '../assets/category03.jpg';
import category04 from '../assets/category04.jpg';
import category1101 from '../assets/category1101.jpg';
import product01 from '../assets/product01.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const About = () => {
    return (
        <div className="text-gray-800">
            <Navbar />
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
                    <div className='w-50'> <h2 className="text-3xl font-bold text-pink-800 mb-6 ">About Us</h2>
                        <p className="text-lg leading-relaxed mb-4 text-gray-700"> ZeroZ Cloths began in 2019 as a boutique in Colombo, Sri Lanka, offering chic and affordable women's wear. As demand grew, we transformed our brand into a digital-first fashion experience, bringing quality fashion directly to your doorstep. </p>
                        <p className="text-lg leading-relaxed text-gray-700"> Our e-commerce platform enables easy browsing, secure checkouts, 24/7 support, and quick delivery across the country. Whether you're dressing for work, a wedding, or a casual outing — we’ve got you covered. </p>
                    </div>

                    {/* Right - Image */}
                    <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
                        <img src={about} alt="ZeroZ Cloths Store" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}

<section className="bg-gray-50 py-16 px-6"> <div className="max-w-6xl mx-auto text-center"> <h2 className="text-3xl font-bold text-pink-800 mb-4">Our Vision & Mission</h2> 
<p className="text-gray-700 text-base max-w-2xl mx-auto mb-10"> We believe fashion is more than clothing — it’s a reflection of confidence, comfort, and community. </p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
  {/* Vision */}
  <div className="bg-white border-l-4 border-pink-500 p-6 rounded-lg shadow hover:shadow-md transition">
    <div className="flex items-center mb-4">
      <h3 className="text-2xl font-semibold text-pink-700">Our Vision</h3>
    </div>
    <p className="text-gray-700 text-md">
      To be Sri Lanka’s most beloved digital fashion destination — inspiring every woman to express herself with style and confidence through innovative and accessible clothing.
    </p>
  </div>

  {/* Mission */}
  <div className="bg-white border-l-4 border-pink-500 p-6 rounded-lg shadow hover:shadow-md transition">
    <div className="flex items-center mb-4">
      <h3 className="text-2xl font-semibold text-pink-700">Our Mission</h3>
    </div>
    <p className="text-gray-700 text-md">
      To provide high-quality, affordable fashion through a secure and user-friendly e-commerce platform — backed by fast delivery, 24/7 support, and transparent service for all.
    </p>
  </div>
</div>
</div> </section>

            

            <section className="bg-white py-16 px-6"> <div className="max-w-6xl mx-auto text-center"> <h2 className="text-3xl font-bold text-pink-800 mb-4">Our Impact</h2> <p className="text-gray-600 text-lg mb-10"> We’re proud of the community and momentum we’ve built through fashion. </p>

<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {[
    { label: 'Customers', value: '2,430', icon: '👥' },
    { label: 'Orders Delivered', value: '6,700+', icon: '📦' },
    { label: 'Products Listed', value: '320+', icon: '👗' },
    { label: 'Positive Reviews', value: '4.8/5', icon: '⭐' },
  ].map((item, i) => (
    <div
      key={i}
      className="bg-pink-50 rounded-lg py-6 px-4 shadow hover:shadow-md transition"
    >
      <div className="text-4xl mb-2">{item.icon}</div>
      <h3 className="text-2xl font-bold text-pink-700">{item.value}</h3>
      <p className="text-sm text-gray-600 mt-1">{item.label}</p>
    </div>
  ))}
</div>
</div> </section>

{/* What We Sell Section */}

            <section className="bg-gray-50 py-16 px-6"> <div className="max-w-6xl mx-auto text-center"> <h2 className="text-3xl font-bold text-pink-800 mb-4">What We Sell</h2> <p className="text-gray-600 text-lg mb-10"> From everyday essentials to standout pieces, explore our fashionable categories made for every moment. </p>

                <Swiper
                    
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1.2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    className="!pb-10"
                >
                    {[
                        {
                            title: 'Dresses',
                            desc: 'Elegant and casual styles for every occasion.',
                            image: category03,
                        },
                        {
                            title: 'Tops & Blouses',
                            desc: 'From basics to statement pieces.',
                            image: category02,
                        },
                        {
                            title: 'Bottoms',
                            desc: 'Comfortable skirts, jeans, and trousers.',
                            image: category01,
                        },
                        {
                            title: 'Outerwear',
                            desc: 'Stylish jackets and coats for any season.',
                            image: product01,
                        },
                        {
                            title: 'Accessories',
                            desc: 'Bags, belts, and more to complete your look.',
                            image: category04,
                        },
                        {
                            title: 'Seasonal Collections',
                            desc: 'Trendy drops and limited-edition releases.',
                            image: category1101,
                        },
                    ].map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition duration-300 bg-white">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-52 object-cover transform group-hover:scale-105 transition duration-300"
                                />
                                <div className="p-5 text-left">
                                    <h3 className="text-xl font-semibold text-pink-700">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div> </section>



            


            {/* Contact */}
            <section className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2 text-pink-800">Have Questions or Feedback?</h2>
                <p className="text-gray-600 mb-6">We’d love to hear from you. Reach out anytime.</p>
                <a
                    href="/contactUs"
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-lg font-medium transition"
                >
                    Contact Us
                </a>
            </section>
            <Footer />

        </div>
    )
}

export default About
