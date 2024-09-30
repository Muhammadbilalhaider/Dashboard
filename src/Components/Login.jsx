import React, { useState } from 'react';

const Login = () => {

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignUpCick = (e) => {
    e.preventDefault();
    setIsSignUpVisible(true)
  }
  const handleCloseModal = () => {
    setIsSignUpVisible(false);
  };

  const SignUp = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-3 rounded-lg relative m-5 lg:w-1/4 max-w-lg">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
          &#x2715;
        </button>
        <form className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-full justify-center">

            <h1 className="text-3xl font-interFont font-extrabold text-left">Sign Up</h1>
            <p className="text-md font-normal text-start ">It's quick and easy.</p>


            <div className="flex flex-col space-y-3 py-4 w-full">
              <span className="w-full block border-gray-200 border-t-2"></span>
              <div className="flex flex-row w-full space-x-2">
                <input className="border p-2 rounded-md w-full" type="text" placeholder="Enter First Name" />
                <input className="border p-2 rounded-md w-full" type="text" placeholder="Enter Last Name" />
              </div>
              <div className="flex flex-col w-full space-x-2 lg:space-x-4 md:space-x-4">
                <p className="text-sm">Date of birth?</p>
                <div className="flex">
                  <select className="border p-2 rounded-md w-full">
                    {[...Array(31)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <select className="border p-2 rounded-md w-full">
                    {["January", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select className="border p-2 rounded-md w-full">
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
              <div className="flex flex-col w-full">
                <p className="text-sm">Gender?</p>
                <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4">
                  <label className="border p-2 rounded-md w-full flex justify-between items-center">
                    <span>Male</span>
                    <input type="radio" name="gender" value="male" />
                  </label>
                  <label className="border p-2 rounded-md w-full flex justify-between items-center">
                    <span>Female</span>
                    <input type="radio" name="gender" value="female" />
                  </label>
                  <label className="border p-2 rounded-md w-full flex justify-between items-center">
                    <span>Custom</span>
                    <input type="radio" name="gender" value="custom" />
                  </label>
                </div>
              </div>
              <input className="border p-2 rounded-md w-full" type="email" placeholder="Email address" />
              <input className="border p-2 rounded-md w-full" type="password" placeholder="Password" />

              <div className='flex justify-center items-center'>
                <button className="border items-center w-44 ite my-5 py-1 text-white hover:bg-green-600 bg-createAcountColor rounded-lg">
                  SignUp
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );


  return (

    <div className='flex justify-center items-center h-screen w-full bg-slate-100'>

      <div className='flex flex-row max-w-[1000px] justify-between space-x-2 lg:space-x-6 px-4 lg:w-full items-center'>

        <div className='flex flex-col lg:w-3/4 md:w-80 sm:w-48 justify-start items-start me-9'>
          <div className='flex items-start flex-col'>
            <img className='lg:w-96 md:w-64 sm:w-40' src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Login Visual" />
          </div>
          <p className='flex lg:text-left lg:px-7 w-full pl-4 sm:text-xs lg:text-2xl'>Facebook helps you connect and share with the people in your life.</p>
        </div>

        <form className='lg:w-2/4 w-40 order-1 justify-center shadow-lg rounded-lg bg-white px-2'>

          <div className='flex flex-col py-5 font-interFont lg:px-3 lg:space-y-5 space-y-1'>
            <input className='border lg:p-3 p-1 rounded-md' type="text" placeholder='Email' />
            <input className='border lg:p-3 p-1 rounded-md ' type="password" placeholder='Password' />
            <button className='border lg:p-3 p-1 text-white hover:bg-blue-700 bg-buttonColor rounded-lg'>
              SignIn
            </button>
            <span className='flex flex-col justify-center items-center px-3 font-interFont'>
              <a href='/ApplicationLogin' className='lg:font-medium text-fuchsia-800 text-xs'> Forgoten Password?</a>
            </span>


            <span className='w-full block border-gray-200 border-t-2'> </span>

            <div className='flex justify-center'>
              <button
                className='py-2 sm:w-20 lg:w-44 text-white hover:bg-green-600 bg-createAcountColor rounded-md'
                onClick={handleSignUpCick} >
                <p className='items-center text-xs px-2'> Create new Account</p>

              </button>
            </div>
          </div>

        </form>


      </div>
      {isSignUpVisible && <SignUp />}
    </div>
  );
};

export default Login;
