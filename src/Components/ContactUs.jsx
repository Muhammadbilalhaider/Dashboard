import React from 'react';

const ContactUs = () => {
  return (
    <div className='flex justify-center items-center h-screen w-full bg-white'>
      <form className='flex flex-col justify-center items-center w-full max-w-lg md:max-w-md p-4'>
        <div className="flex justify-center items-center">
          <h2 className="mb-4 text-4xl font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
        </div>
        <p className='text-sm md:text-base lg:text-lg font-normal text-center max-w-2xl'>
          Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
        </p>
        <div className='flex flex-col py-4 font-interFont w-full max-w-sm'>
          <label className='text-sm md:text-base lg:text-lg mt-6'>Your email</label>
          <input className='border p-2 rounded-xl text-sm placeholder:text-sm w-full' type="email" placeholder='name@gmail.com' />
          <label className='text-sm md:text-base lg:text-lg mt-6'>Subject</label>
          <input className='border p-2 rounded-xl text-sm placeholder:text-sm w-full' placeholder='Let us know how we can help you' />
          <label className='text-sm md:text-base lg:text-lg mt-6'>Your message</label>
          <textarea className='border p-2 rounded-xl text-sm placeholder:text-sm h-36 w-full border-gray-300' placeholder='Leave a comment...'></textarea>
          <button className='border w-full md:w-48 rounded-xl my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
