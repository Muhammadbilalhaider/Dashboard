import React, { useState } from 'react';

const Login = () => {

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

const handleSignUpCick = (e)=>
  {
    e.preventDefault();
    setIsSignUpVisible(true)
}
const handleCloseModal = () => {
  setIsSignUpVisible(false);
};

const SignUp = () => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg relative w-full max-w-lg">
    <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
          &#x2715;
        </button>
        <form className="flex flex-col items-center">
      <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-3xl font-interFont font-extrabold text-center">Sign Up</h1>
        <p className="text-sm font-normal text-center mt-2">It's quick and easy</p>
        <div className="flex flex-col space-y-4 py-4 w-full">
          <span className="w-full block border-gray-200 border-t-2"></span>
          <div className="flex flex-row w-full space-x-2">
            <input className="border p-2 rounded-xl w-full" type="text" placeholder="Enter First Name" />
            <input className="border p-2 rounded-xl w-full" type="text" placeholder="Enter Last Name" />
          </div>
          <input className="border p-2 rounded-xl w-full" type="email" placeholder="Email address" />
          <input className="border p-2 rounded-xl w-full" type="password" placeholder="Password" />
          <div className="flex flex-col w-full">
            <p className="text-sm">Date of birth?</p>
            <div className="flex md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
            <div className="flex flex-row space-y-4 md:space-y-0 md:space-x-4">
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
          <button className="border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor rounded-lg">
            Register
          </button>
        </div>
      </div>
    </form>
    </div>
  </div>
);


  return (
 
    <div className='flex justify-center items-center h-screen w-full bg-slate-100'>

      <div className='max-w-[1000px] justify-between space-x-6 w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        <form className='w-80 order-1 md:order-2 justify-center shadow-lg rounded-lg  bg-white'>

          <div className='flex flex-col py-4 font-interFont px-3 space-y-2'>

            <input className='border p-2 rounded-md' type="text" placeholder='Email' />
            <input className='border p-2 rounded-md ' type="password" placeholder='Password' />
            <button className='border p-2 text-white hover:bg-blue-700 bg-buttonColor rounded-lg'>
            SignIn
          </button>
          </div>

      
          <div className='flex flex-col justify-center items-center px-3 font-interFont'>
          
          
          <a href='/ApplicationLogin' className='font-medium text-fuchsia-800 text-sm'> Forgoten Password?</a>
          </div>
          <div className='hidden md:flex flex-col items-center mt-2 px-3'>
            <span className='w-full block border-gray-200 border-t-2'> </span>
            <button className='font-bold text-sm p-2 border w-40 my-5 text-white hover:bg-green-600 bg-createAcountColor rounded-lg' onClick={handleSignUpCick}>
              Create new Account
            </button>
          </div>
         
        </form>

        <div className='order-2 md:order-1 flex flex-col justify-start items-start md:justify-end md:items-start'>
          <div className='flex items-start flex-col'>
            <img className='w-72' src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Login Visual" />
            <p className='flex text-xl text-left px-7'>Facebook helps you connect and share with the people in your life.</p>
          </div>
        </div>
      </div>
      {isSignUpVisible && <SignUp />}
    </div>
  );
};

export default Login;
