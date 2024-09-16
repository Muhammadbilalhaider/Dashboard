import React from 'react';

import loginimg from '../assets/loginimg.svg';

const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full bg-white'>

      <div className='max-w-[1000px] w-full mx-auto bg-white p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center'>

        <form className='order-2 sm:order-1  justify-center'>
          <h2 className='text-sm md:text-base lg:text-lg font-bold py-1 font-interFont'>Login</h2>
          <h1 className='text-sm md:text-base lg:text-lg font-normal '>
            Please fill your detail to access your account
          </h1>
          <div className='flex flex-col py-4 font-interFont'>
            <label className='text-sm md:text-base lg:text-lg'>Email</label>
            <input className='border p-2' type="text" />
          </div>
          <div className='flex flex-col py-2'>
            <label className='text-sm md:text-base lg:text-lg'>Password</label>
            <input className='border p-2' type="password" />
          </div>
          <div className='flex justify-between items-center'>
            <p className='flex text-sm md:text-base lg:text-lg items-center'>
              <input className='mr-2' type="checkbox" /> Remember me
            </p>
            <div className='hidden md:flex'>
              <a href='/ApplicationLogin' className='font-medium text-fuchsia-800'> Forgot Password?</a>
            </div>
          </div>
          <button
            className='border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor'
          >
            SignIn
          </button>
          <div className='flex md:hidden justify-center'>
            <a href='/ApplicationLogin' className='font-medium text-fuchsia-800 text-sm md:text-base lg:text-lg'> Forgot Password?</a>
          </div>
          <div className='hidden md:flex flex-col items-center mt-2'>
            <a href='/ApplicationLogin' className='text-blue-700 font-semibold justify-center items-center'>
              Application Form
            </a>
          </div>
        </form>

        <div className='order-1 sm:order-2 w-full h-full flex justify-end '>
          <img className='object-contain  w-imgWidth h-imgHeight max-h-[100%]' src={loginimg} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
