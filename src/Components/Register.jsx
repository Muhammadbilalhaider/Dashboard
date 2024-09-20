import React, { useState } from 'react';
import loginimg from '../assets/loginimg.svg';

const Register = () => {
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className='flex justify-center items-center h-screen w-full bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-4 items-center w-maxWidthPage justify-center'>
        <form className='font-bold text-sm md:text-base lg:text-lg order-2 md:order-1 justify-center'>
          <h2 className='text-sm md:text-base lg:text-lg items-center'>Register</h2>
          <h1 className='text-sm md:text-base lg:text-lg font-normal'>
            Please fill your details to access your account
          </h1>
          <div className='flex flex-col py-4 font-interFont'>
            <label className='text-sm md:text-base lg:text-lg py-2'>First Name</label>
            <input className='border p-2 rounded-xl' type="text" />
            <label className='text-sm md:text-base lg:text-lg py-2 mt-3'>Last Name</label>
            <input className='border p-2 rounded-xl' type="text" />
            <label className='text-sm md:text-base lg:text-lg py-2 mt-3'>Email</label>
            <input className='border p-2 rounded-xl' type="email" />
            <label className='text-sm md:text-base lg:text-lg py-2 mt-3'>Password</label>
            <input className='border p-2 rounded-xl' type="password" />
            <label className='text-sm md:text-base lg:text-lg pt-4 pb-1 mt-3'>Gender</label>
            <select className='border p-2 max-w-48' name="gender" onChange={handleGenderChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {gender === "other" && (
              <div className='flex flex-col pt-4'>
                <label className='text-sm md:text-base lg:text-lg'>Please Specify</label>
                <input
                  className='border p-2 rounded-xl'
                  type='text'
                  placeholder='Enter Gender'
                  value={otherGender}
                  onChange={(e) => setOtherGender(e.target.value)}
                />
              </div>
            )}
            <button className='border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor rounded-lg'>
              Register
            </button>
          </div>
        </form>

        <div className='flex order-1 md:order-2 w-imgWidth h-imgHeight'>
          <img className='object-contain w-imgWidth h-imgHeight' src={loginimg} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Register;
