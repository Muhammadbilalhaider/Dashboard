import React from 'react';

import loginimg from '../assets/loginimg.svg';

const Register = () => {
  return (
    <div className='flex justify-center items-center w-full bg-white'>

      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-4 items-center w-maxWidthPage justify-center'>

        <form className='font-bold text-sm md:text-base lg:text-lg order-2 md:order-1 justify-center '>
          <h2 className='text-sm md:text-base lg:text-lg items-center'>Register</h2>
          <h1 className='text-sm md:text-base lg:text-lg font-normal'>
            Please fill your detail to access your account
          </h1>
          <div className='flex flex-col py-4 font-interFont'>
            <label className='text-sm md:text-base lg:text-lg pt-4 pb-1'>First Name</label>
            <input className='border p-2' type="text" />
            <label className='text-sm md:text-base lg:text-lg pt-4 pb-1'>Last Name</label>
            <input className='border p-2' type="text" />
            <label className='text-sm md:text-base lg:text-lg pt-4 pb-1'>Email</label>
            <input className='border p-2' type="email" />
            <label className='text-sm md:text-base lg:text-lg pt-4 pb-1'>Password</label>
            <input className='border p-2' type="password" />
            <div className='flex items-center space-x-4 p-3'>
              <label className='flex items-center'>
                <input type="radio" name="gender" value="male" className='mr-2' />
                Male
              </label>
              <label className='flex items-center'>
                <input type="radio" name="gender" value="female" className='mr-2' />
                Female
              </label>
              <label className='flex items-center'>
                <input type="radio" name="gender" value="other" className='mr-2' />
                Other
              </label>
            </div>
            <button className='border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor'>
              Register
            </button>
          </div>
        </form>

        <div className=' flex order-1 md:order-2 w-imgWidth h-imgHeight'>
          <img className='object-contain  w-imgWidth h-imgHeight' src={loginimg} alt="Login Visual" />
        </div>

      </div>

    </div>
  )
}

export default Register