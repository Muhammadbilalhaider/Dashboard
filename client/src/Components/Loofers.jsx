import React from 'react';

import loofer from '../assets/loofers.png';

const Loofers = () => {
  return (
    <div className="flex flex-col w-full h-full bg-black">
      <h2 className='text-white'>Loofers</h2>




      <div className="flex flex-row space-x-10 w-full h-60 justify-center">

        <div className="flex flex-col justify-center items-center rounded-2xl bg-white">
          <img className="flex w-56 h-auto  justify-center items-center" src={loofer} alt="" />
          <span className=' flex-col pb-10'>
            <h3 className="flex ">Name</h3>
            <h3 className="flex ">$25</h3>
          </span>
        </div>
        <div className="flex flex-col justify-center items-center rounded-2xl bg-white">
          <img className="flex w-56 h-auto  justify-center items-center" src={loofer} alt="" />
          <span className=' flex-col pb-10'>
            <h3 className="flex ">Name</h3>
            <h3 className="flex ">$25</h3>
          </span>
        </div>
        <div className="flex flex-col justify-center items-center rounded-2xl bg-white">
          <img className="flex w-56 h-auto  justify-center items-center" src={loofer} alt="" />
          <span className=' flex-col pb-10'>
            <h3 className="flex ">Name</h3>
            <h3 className="flex ">$25</h3>
          </span>
        </div>

      </div>

    </div>
  );
};

export default Loofers;
