import React from "react";
import loginimg from "../assets/loginimg.svg";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-white">
      <div className="max-w-[1000px] w-full mx-auto bg-white p-4 grid grid-cols-1 sm:grid-cols-2  gap-4 items-center">
        <form className="order-2 sm:order-1 max-w-[400px] ">
          <h2 className="text-2xl font-bold py-1 font-interFont">Login</h2>
          <h1 className="text-0.5xl font-normal font-interFont ">
            Please fill your detail to access your account
          </h1>
          text-sm text-md text-lg
          <div className="flex flex-col py-4 font-interFont">
            <label>Email</label>
            <input className="border p-2" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input className="border p-2" type="password" />
          </div>
          <div className="flex justify-between items-center">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember me
            </p>
            <a
              href="/ApplicationLogin"
              className="font-medium text-fuchsia-800"
            >
              {" "}
              Forgot Password?
            </a>
          </div>
          <button className="bg-[#280559] border w-full my-5 py-1 text-white hover:bg-slate-800 ">
            SignIn
          </button>
          <div className="flex flex-col items-center mt-2">
            <a
              href="/ApplicationLogin"
              className="text-blue-700 font-semibold justify-center items-center"
              style={{ borderBottom: "2px solid blue", paddingBottom: "0px" }}
            >
              Application Form
            </a>
          </div>
        </form>

        <div className="order-1 sm:order-2 w-full h-full flex justify-end ">
          <img
            className="object-contain w-full h-full max-h-[100%]"
            src={loginimg}
            alt="Login Visual"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

// use the font-weight in all over the application according to figma
// Consider other breakpoints also to make it more flexible on different screens.
// add the custom fonts family in the tailwind.config.js file and use from that
// Avoid using inline style , if necessay make a seperate file and use that.
