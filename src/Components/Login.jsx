import React from 'react';

import loginimg from '../assets/loginimg.svg';

const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full bg-white'>
      <div className='max-w-[1000px] w-full mx-auto bg-white p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>

        <form className='order-2 md:order-1 md:w-full justify-center'>
          <h2 className='text-sm md:text-base lg:text-lg font-bold py-1 font-interFont text-center md:text-left'>Login</h2>
          <h1 className='text-sm md:text-base lg:text-lg font-normal text-center md:text-left'>
            Please fill your detail to access your account
          </h1>
          <div className='flex flex-col py-4 font-interFont'>
            <label className='text-sm md:text-base lg:text-lg font-interFont m-1'>Email</label>
            <input className='border p-2 rounded-xl' type="text" placeholder='Email' />
          </div>
          <div className='flex flex-col py-2'>
            <label className='text-sm md:text-base lg:text-lg font-interFont  m-1'>Password</label>
            <input className='border p-2 rounded-xl ' type="password" placeholder='Password' />
          </div>
          <div className='flex justify-between items-center font-interFont'>
            <p className='flex text-sm md:text-base lg:text-lg items-center'>
              <input className='mr-2 font-interFont rounded-xl' type="checkbox" /> Remember me
            </p>
            <div className=' md:flex'>
              <a href='/ApplicationLogin' className='font-medium text-fuchsia-800'> Forgot Password?</a>
            </div>
          </div>
          <button className='border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor rounded-lg'>
            SignIn
          </button>

          <div className='hidden md:flex flex-col items-center mt-2'>
            <a href='/ApplicationLogin' className='text-blue-700 font-semibold justify-center items-center'>
              Application Form
            </a>
          </div>
        </form>
        <div className='order-1 md:order-2 w-full h-full flex justify-center md:justify-end items-center md:items-center m-5 md:m-20'>
          <img className='w-ful min-h-full' src={loginimg} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
