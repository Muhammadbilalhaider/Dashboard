import React from 'react'

const ForgotPassword = () => {
  return (
    <div className='flex flex-col w-full max-h-screen bg-slate-100'>


      <div className='flex lg:flex-row w-full flex-col lg:items-start sm:justify-center justify-between p-2 px-4 mt-5 bg-white'>
        <div className='flex justify-center lg:justify-between items-center w-full'>
          <span className='flex w-44 justify-center items-center'>
            <img className='md:w-64 sm:w-40' src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Login Visual" />
          </span>
        </div>

        <span className='flex lg:flex-row w-full flex-col lg:justify-center items-center lg:space-y-0 space-y-2 lg:space-x-4'>
          <input className='border p-2 rounded-md' type='email' placeholder='Email Address' />
          <input className='border p-2 rounded-md' type='password' placeholder='Password' />
          <button className='bg-buttonColor p-2 rounded-md text-white w-16'>Login</button>
          <h2 className='text-buttonColor items-center text-center sm:text-xs lg:text-base'>Forgotten Account?</h2>
        </span>
      </div>

      <div className='flex flex-col w-full max-h-screen justify-center items-center'>

        <div className='flex flex-col lg:w-3/12 w-72 h-52 lg:h-72 shadow-lg shadow-slate-400 lg:space-y-4 space-y-2 bg-white rounded-md mt-11'>

          <div className='flex flex-col'>
            <span className='flex p-3 lg:items-start lg:justify-start justify-center items-center'>
              <h1 className='font-bold lg:text-xl text-xs font-interFont text-center lg:text-start'>Find Your Account</h1>
            </span>
            <span className='border-gray-200 border-t-2 w-full'></span>
          </div>

          <div className='flex flex-col justify-center lg:w-full w-72 space-y-4 p-1 lg:p-3'>
            <p className='text-xs lg:text-base font-medium font-interFont lg:text-start text-center'>Please enter your email address or mobile number to search for your account.</p>
            <input className='border lg:p-3 p-2 rounded-md w-full' type='email' placeholder='Email Address' />
          </div>
          <span className='border-gray-200 border-t-2 w-full ' />
          <div className='flex flex-row lg:space-x-3 justify-end items-end pr-3 space-x-2'>
            <button className='rounded-md bg-slate-200 lg:p-2 lg:w-24 w-14 sm:text-xs p-1'>Cancel</button>
            <button className='rounded-md bg-buttonColor lg:p-2 lg:w-24 w-14 sm:text-sm p-1 text-white'>Search</button>
          </div>

        </div>
      </div>


    </div>
  )
}

export default ForgotPassword