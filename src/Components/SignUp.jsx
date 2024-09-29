import React from 'react';

const SignUp = () => {
    return (
        <div className="flex justify-center items-center bg-white mt-10 px-4 w-full">
            <form className="flex flex-col items-center max-w-lg">
                <div className='flex flex-col w-full items-center justify-center'>
                    <h1 className="text-3xl font-interFont font-extrabold text-center">
                        Sign Up
                    </h1>
                    <p className="text-sm font-normal text-center mt-2">
                        It's quick and easy
                    </p>

                    <div className="flex flex-col space-y-4 py-4 w-full">
                        <span className='w-full block border-gray-200 border-t-2'> </span>

                        <div className='flex flex-row w-full space-x-2'>
                            <input className="border p-2 rounded-xl w-full" type="text" placeholder="Enter First Name" />
                            <input className="border p-2 rounded-xl w-full" type="text" placeholder="Enter First Name" />
                           
                        </div>

                        <input className="border p-2 rounded-xl w-full" type="email" placeholder="Email address" />
                        <input className="border p-2 rounded-xl w-full" type="password" placeholder="Password" />

                        <div className='flex flex-col w-full'>
                            <p className='text-sm'>Date of birth?</p>
                            <div className='flex  md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                                <select className='border p-2 rounded-md w-full'>
                                    {[...Array(31)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                                <select className='border p-2 rounded-md w-full'>
                                    {[
                                        "January", "Feb", "March", "April", "May", "June", 
                                        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
                                    ].map((month, index) => (
                                        <option key={index} value={index + 1}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <select className='border p-2 rounded-md w-full'>
                                    {[...Array(2024 - 1975 + 1)].map((_, index) => {
                                        const year = 1975 + index;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col w-full'>
                            <p className='text-sm'>Gender?</p>
                            <div className='flex flex-row space-y-4 md:space-y-0 md:space-x-4'>
                                <label className='border p-2 rounded-md w-full flex justify-between items-center'>
                                    <span>Male</span>
                                    <input type='radio' name='gender' value='male' />
                                </label>
                                <label className='border p-2 rounded-md w-full flex justify-between items-center'>
                                    <span>Female</span>
                                    <input type='radio' name='gender' value='female' />
                                </label>
                                <label className='border p-2 rounded-md w-full flex justify-between items-center'>
                                    <span>Custom</span>
                                    <input type='radio' name='gender' value='custom' />
                                </label>
                            </div>
                        </div>

                        <button className="border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor rounded-lg">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
