import React from 'react';

const Spinner = () => {
  return (
    
<div className="flex justify-center items-center h-screen">
<div className="relative w-24 h-24">
  <div className="absolute w-16 h-16 border-4 border-t-4 border-transparent border-t-primary rounded-full animate-spin"></div>
</div>
</div> 
  );
};

export default Spinner;


