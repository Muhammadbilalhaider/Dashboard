import React, { useState } from "react";

import loginimg from "../assets/loginimg.svg";

const Register = () => {
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-white mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1000px] w-full mx-auto bg-white p-4  gap-4 items-center">
        <form className="order-2 md:order-1 flex flex-col justify-center items-center md:items-start md:mx-0">
          <div className="flex flex-col py-4 w-full max-w-md">
            <h2 className="text-sm md:text-base lg:text-lg font-interFont font-extrabold text-center lg:text-left">
              Register
            </h2>

            <h1 className="text-sm md:text-base lg:text-lg font-normal text-start ">
              Please fill your details to access your account
            </h1>
            <label className="text-sm md:text-base lg:text-lg py-1">
              First Name
            </label>
            <input
              className="border p-2 rounded-xl"
              type="text"
              placeholder="Enter First Name"
            />
            <label className="text-sm md:text-base lg:text-lg py-1 mt-2">
              Last Name
            </label>
            <input
              className="border p-2 rounded-xl"
              type="text"
              placeholder="Enter Last Name"
            />
            <label className="text-sm md:text-base lg:text-lg py-1 mt-2">
              Email
            </label>
            <input
              className="border p-2 rounded-xl"
              type="email"
              placeholder="name@gmail.com"
            />
            <label className="text-sm md:text-base lg:text-lg py-1 mt-2">
              Password
            </label>
            <input
              className="border p-2 rounded-xl"
              type="password"
              placeholder="Enter Password"
            />
            <label className="text-sm md:text-base lg:text-lg pt-4 pb-1 mt-3">
              Gender
            </label>
            <select
              className="border p-2 rounded-xl w-40"
              name="gender"
              onChange={handleGenderChange}
            >
              <option className="w-24" value="">
                Select Gender
              </option>
              <option className="w-24" value="male">
                Male
              </option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {gender === "other" && (
              <div className="flex flex-col  mt-3">
                <label className="text-sm md:text-base lg:text-lg">
                  Please Specify
                </label>
                <input
                  className="border p-2 rounded-xl "
                  type="text"
                  placeholder="Enter Gender"
                  value={otherGender}
                  onChange={(e) => setOtherGender(e.target.value)}
                />
              </div>
            )}
            <button className="border w-full my-5 py-1 text-white hover:bg-slate-800 bg-buttonColor rounded-lg">
              Register
            </button>
          </div>
        </form>

        <div className="order-1 md:order-2 w-full h-full flex justify-center md:justify-end items-center md:items-center m-5 md:m-20">
          <img className="w-ful min-h-full" src={loginimg} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Register;
