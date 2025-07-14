import React from 'react';

const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
  const isActive = isCompleted || isCurrent;


  let bgColorClass = 'bg-gray-200';
  let textColorClass = 'text-gray-500';

  if (isActive) {
    if (icon.bgColor === 'red-500') {
      bgColorClass = 'bg-red-500';
      textColorClass = 'text-white';
    } else if (icon.bgColor === 'yellow-800') {
      bgColorClass = 'bg-yellow-800';
      textColorClass = 'text-white';
    } else if (icon.bgColor === 'blue-800') {
      bgColorClass = 'bg-blue-800';
      textColorClass = 'text-white';
    } else if (icon.bgColor === 'green-800') {
      bgColorClass = 'bg-green-800';
      textColorClass = 'text-white';
    }
  }

  const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-300';
  const labelTextColor = isActive ? 'text-gray-900' : 'text-gray-500';
  const descriptionTextColor = isActive ? 'text-gray-700' : 'text-gray-400';

  return (
    <li className="relative mb-10 sm:mb-0 flex-1">
      <div className="flex items-center">
        <div className={`z-10 w-10 h-10 flex items-center justify-center ${bgColorClass} ${textColorClass} rounded-full shadow-md transition-all duration-300`}>
          <i className={`ri-${icon.iconName} text-xl`}></i>
        </div>
        {!isLastStep && (
          <div className={`hidden sm:block flex-grow h-1 ${connectorColor} ml-2 mr-2 rounded-full`}></div>
        )}
      </div>
      <div className="mt-4 sm:ml-0 px-4 py-2 rounded-xl transition-all duration-300">
        <h3 className={`text-lg font-semibold ${labelTextColor}`}>{step.label}</h3>
        <time className="block text-sm text-gray-400 mb-1">
          {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
        </time>
        <p className={`text-sm ${descriptionTextColor}`}>{description}</p>
      </div>
    </li>
  );
};

export default TimelineStep;
