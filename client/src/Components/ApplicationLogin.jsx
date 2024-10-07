import React from 'react';

import sideImg from '../assets/loginimg.svg';

const ApplicationLogin = () => {
    return (
        <div className='flex justify-center items-center h-screen w-full bg-white'>
            <div className='max-w-[1000px] w-full mx-auto bg-white p-4 grid sm:grid-cols-2 grid-cols-1  gap-4 items-center'>
                <form className='order-2 sm:order-1 max-w-formWidth '>
                    <h2 style={{ color: '#280559' }} className='font-bold text-2xl '>Application Login</h2>
                    <p style={{ fontSize: '12px' }}>Please fill your detail to access your account</p>
                    <div className='flex flex-col py-4' style={{ fontFamily: 'Inter, sans-serif' }}>
                        <label>Email</label>
                        <input className='border p-2' type='email' />
                    </div>
                    <div className='flex flex-col' style={{ fontFamily: 'Inter, sans-serif' }}>
                        <label>Password</label>
                        <input className='border p-2' type='password' />
                    </div>
                    <div className='flex justify-between items-center mt-6'>
                        <p className='flex items-center'>
                            <input className='mr-2' type="checkbox" /> Remember me
                        </p>
                        <a href='/ApplicationLogin' className='font-medium text-fuchsia-800'> Forgot Password?</a>
                    </div>
                    <button
                        className='border w-full my-5 py-1 text-white hover:bg-slate-800'
                        style={{ backgroundColor: '#280559' }}>
                        SignIn
                    </button>
                    <div className='flex flex-col items-center mt-2'>
                        <a href='/Login' className='text-blue-700 font-semibold justify-center items-center' style={{ borderBottom: '2px solid blue', paddingBottom: '0px' }} >
                            Main Login
                        </a>
                    </div>
                </form>
                <div className='order-1 sm:order-2 w-full h-full flex justify-end '>
                    <img src={sideImg} alt='' />
                </div>
            </div>
        </div>
    )
}

export default ApplicationLogin
