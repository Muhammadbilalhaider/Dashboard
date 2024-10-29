import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import facebookImg from '../assets/facebook.svg';
import githubImg from '../assets/github.svg';
import googleImg from '../assets/google.svg';

const Login = () => {
  
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSignIn, setEmailSgnIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [customGender, setCustomGender] = useState("");
  const [showCustomGender, setShowCustomGenderInput] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const showSignUpClick = (e) => {
    e.preventDefault();
    setIsSignUpVisible(true);
  };

  const handleCloseModal = () => {
    setIsSignUpVisible(false);
    setIsSignUpSuccessful(false);
  };

  const handleCustomGender = (event) => {
    setSelectedGender(event.target.value);
    setShowCustomGenderInput(event.target.value === "Custom");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Store the token in localStorage
      localStorage.setItem("authToken", token);

      // Decode the token to extract the name
      const decodedToken = jwtDecode(token);
      const userName = decodedToken.name || "Anonymous User";
      localStorage.setItem("name", userName);

      // Navigate to the home/dashboard page
      navigate("/");
    } else {
      const storedToken = localStorage.getItem("authToken");
      const name = localStorage.getItem("name");
      console.log("Name isss", name); // Check if name is retrieved correctly
      const currentPath = window.location.pathname;

      // Redirect to login if not authenticated
      if (
        !storedToken &&
        !currentPath.startsWith("/forgot-password") &&
        !currentPath.startsWith("/resetpassword")
      ) {
        navigate("/login");
      } else if (storedToken && currentPath.startsWith("/login")) {
        navigate("/"); // Redirect to home if already logged in
      }
    }
  }, [navigate]);

  const handleGoogleSignin = async () => {
    try {
      window.location.href = "http://localhost:5000/user/auth/google";
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };
  const handleFacebookSign = async () => {
    window.location.href = "http://localhost:5000/user/auth/facebook";
  };

  const handleGithubSign = async () => {
    window.location.href = "http://localhost:5000/user/auth/github";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/user/SignUp", {
        firstName: FirstName,
        lastName: LastName,
        dateOfBirth: dateOfBirth,
        gender: selectedGender === "Custom" ? customGender : selectedGender,
        email: email,
        password: password,
      });
      console.log("Signup successful:", resp.data);
      if (resp.data.success) {
        setIsSignUpSuccessful(true);
        setFirstName("");
        setLastName("");
        setDateOfBirth({ day: "", month: "", year: "" });
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("http://localhost:5000/user/SignIn", {
        email: emailSignIn,
        password: passwordSignIn,
      });
      const token = resp.data.accessToken;

      console.log("Success", resp.data.firstName);
      if (token) {
        console.log("Success", token);
        const firstName = resp.data.data.firstName;
        localStorage.setItem("name", firstName);
        localStorage.setItem("lastName", LastName);
        localStorage.setItem("authToken", token);

        navigate("/");
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1000px] items-center space-x-5">

        <form
          className="order-1 md:order-2 lg:w-96 w-80 p-6 sm:m-3 flex flex-col justify-center items-center md:items-start bg-white"
          onSubmit={handleSignIn}
        >
          <div className="flex flex-col py-4 justify-center items-center w-full max-w-md space-y-4">
            <input
              className="border lg:p-3 w-full p-1 rounded-md"
              type="text"
              placeholder="Email"
              value={emailSignIn}
              onChange={(e) => setEmailSgnIn(e.target.value)}
            />
            <input
              className="border lg:p-3 w-full p-1 rounded-md"
              type="password"
              placeholder="Password"
              value={passwordSignIn}
              onChange={(e) => setPasswordSignIn(e.target.value)}
            />
            <button
              className="border lg:p-3 w-full p-1 text-white hover:bg-blue-700 bg-buttonColor rounded-lg"
              type="submit"
            >
              SignIn
            </button>
            <span className="flex flex-col justify-center items-center px-3 font-interFont">
              <Link
                to="/forgot-password"
                className="lg:font-medium text-fuchsia-800 text-xs"
              >
                Forgotten Password?
              </Link>
            </span>
            <span className="w-full block border-gray-200 border-t-2"></span>

            <div className="flex w-full justify-center items-center">
              <div className="flex flex-row w-4 lg:w-8 items-center justify-center space-x-1 lg:space-x-3">
                <img
                  className="cursor-pointer"
                  src={googleImg}
                  alt="Google"
                  onClick={handleGoogleSignin}
                />
                <img
                  className="cursor-pointer"
                  src={facebookImg}
                  alt=""
                  onClick={handleFacebookSign}
                />
                <img
                  className="cursor-pointer hover:Hello"
                  src={githubImg}
                  alt=""
                  onClick={handleGithubSign}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="py-2 sm:w-20 lg:w-44 text-white hover:bg-green-600 bg-createAcountColor rounded-md"
                onClick={showSignUpClick}
              >
                <p className="items-center text-xs px-2">Create new Account</p>
              </button>
            </div>
          </div>
        </form>
        <div className="order-2 md:order-1 lg:w-96 w-72 h-full flex justify-center items-center lg:m-5 md:m-20">
          <div className="flex flex-col lg:w-96 sm:justify-center sm:items-center">
            <span className="justify-center items-center">
              <img
                className="md:w-64 sm:w-40"
                src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
                alt="Login Visual"
              />
              <p className="flex lg:text-left sm:text-center lg:px-7 w-full pl-4 sm:text-xs lg:text-2xl">
                This Platform helps you connect and share with the people in
                your life.
              </p>
            </span>
          </div>
        </div>
      </div>

      {!isSignUpSuccessful && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 ${
            isSignUpVisible ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-3 rounded-lg relative m-5 lg:w-1/4 max-w-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              &#x2715;
            </button>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSignUp}
            >
              <div className="flex flex-col w-full justify-center">
                <h1 className="text-3xl font-interFont font-extrabold text-left">
                  Sign Up
                </h1>
                <p className="text-md font-normal text-start ">
                  It's quick and easy.
                </p>
                <div className="flex flex-col space-y-3 py-4 w-full">
                  <span className="w-full block border-gray-200 border-t-2"></span>
                  <div className="flex flex-row w-full space-x-2">
                    <input
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Enter First Name"
                      value={FirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Enter Last Name"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4">
                    <select
                      className="border p-2 rounded-md w-full"
                      onChange={(e) =>
                        setDateOfBirth((prev) => ({
                          ...prev,
                          day: e.target.value,
                        }))
                      }
                      value={dateOfBirth.day}
                    >
                      <option value="">Day</option>

                      {[...Array(31)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      className="border p-2 rounded-md w-full"
                      onChange={(e) =>
                        setDateOfBirth((prev) => ({
                          ...prev,
                          month: e.target.value,
                        }))
                      }
                      value={dateOfBirth.month}
                    >
                      <option value="">Month</option>
                      {[
                        "January",
                        "Feb",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ].map((month, index) => (
                        <option key={index} value={index + 1}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      className="border p-2 rounded-md w-full"
                      onChange={(e) =>
                        setDateOfBirth((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                      value={dateOfBirth.year}
                    >
                      <option value="">Year</option>
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
                  <div className="flex flex-col w-full">
                    <p className="text-sm">Gender?</p>
                    <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4">
                      <label className="border p-2 rounded-md w-full flex justify-between items-center">
                        <span>Male</span>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={selectedGender === "Male"}
                          onChange={handleCustomGender}
                        />
                      </label>
                      <label className="border p-2 rounded-md w-full flex justify-between items-center">
                        <span>Female</span>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={selectedGender === "Female"}
                          onChange={handleCustomGender}
                        />
                      </label>
                      <label className="border p-2 rounded-md w-full flex justify-between items-center">
                        <span>Custom</span>
                        <input
                          type="radio"
                          name="gender"
                          value="Custom"
                          checked={selectedGender === "Custom"}
                          onChange={handleCustomGender}
                        />
                      </label>
                    </div>
                    {showCustomGender && (
                      <input
                        className="border p-2 rounded-md w-full mt-2"
                        type="text"
                        placeholder="Enter Custom Gender"
                        value={customGender}
                        onChange={(e) => setCustomGender(e.target.value)}
                      />
                    )}
                  </div>
                  <div className="flex flex-row w-full space-x-2">
                    <input
                      className="border p-2 rounded-md w-full"
                      type="email"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <input
                      className="border p-2 rounded-md w-full"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="border items-center w-44 ite my-5 py-1 text-white hover:bg-green-600 bg-createAcountColor rounded-lg"
                    >
                      SignUp
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
