import React from "react";
import { Link } from "react-router-dom";
import promotion01 from "../../assets/promotion01.jpg";
import promotion02 from "../../assets/promotion02.jpg";
import promotion03 from "../../assets/promotion03.jpg";

const Promotions = () => {
  const promotions = [
    {
      title: "20% Off On Tank Tops",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: promotion01, 
      buttonText: "SHOP NOW",
      link: "/shop",
    },
    {
      title: "Latest Eyewear For You",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: promotion02, 
      buttonText: "SHOP NOW",
      link: "/shop",
    },
    {
      title: "Let's Lorem Suit Up!",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.",
      image: promotion03,
      buttonText: "CHECK OUT",
      link: "/shop",
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
        {/* <h2 className='mb-4 text-[32px] font-semibold font-custom text-text-dark text-center '>Promotions</h2> */}
        <h2 className="relative mb-4 text-[42px] font-semibold font-custom text-text-dark text-center after:content-[''] after:block after:w-28 after:h-1 after:bg-primary after:mx-auto after:mt-2">
  Promotions
</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {promotions.map((item, index) => (
          <div key={index} className="relative group overflow-hidden shadow-sm rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-4">
              <h3 className="text-white text-base font-[1000]">{item.title}</h3>
              <p className="text-white text-xs mb-3">{item.description}</p>
              <Link
                to={item.link}
                className="bg-white text-black px-3 py-1 text-sm font-medium rounded hover:bg-gray-200 transition"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
