import React from "react";
import Shipping from "../../assets/Shipping.png";
import Quality from "../../assets/Quality.png";
import Offers from "../../assets/Offers.png";
import Payment from "../../assets/Payments.png";

const Features = () => {
  const features = [
    { title: "Worldwide Shipping", icon: Shipping },
    { title: "Best Quality", icon: Quality },
    { title: "Best Offers", icon: Offers },
    { title: "Secure Payments", icon: Payment },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center py-10">
        {features.map((feature, index) => (
          <div key={index} className="p-4 flex flex-col items-center text-center">
            {/* Centered Image */}
            <div className="w-20 h-20 flex justify-center items-center">
              <img src={feature.icon} alt={feature.title} className="w-16 h-16 object-contain" />
            </div>
            {/* Feature Title */}
            <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
            {/* Feature Description */}
            <p className="text-gray-500 text-sm mt-2">
              It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
