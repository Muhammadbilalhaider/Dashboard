import React from 'react';

const ResetPassword = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">``
    
    <div className="flex flex-col items-center justify-center w-full max-w-md p-6 shadow-lg shadow-gray-500 rounded-md bg-white">
       
    <div className="flex justify-center items-center w-full mb-6">
          <span className='flex w-44 justify-center items-center'>
            <img className='md:w-64 sm:w-40' src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Login Visual" />
          </span>
        </div>

        <div className="flex flex-col w-full space-y-3">
          <input className='border p-2 rounded-md' type='password' placeholder='New Password' />
          <input className='border p-2 rounded-md' type='password' placeholder='Confirm Password' />
          <button className='bg-buttonColor p-2 rounded-md text-white'>Done</button>
         
        </div>

      </div>
    
    </div>
  )
}

export default ResetPassword
