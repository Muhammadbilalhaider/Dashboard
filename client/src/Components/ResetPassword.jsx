import React, { useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const handlePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        return alert("Passwords do not match");
      }

      const result = await axios.post(
        "http://localhost:5000/user/ResetPassword",
        {
          email: email,
          accessToken: token,
          password: newPassword,
        }
      );
      if (result) {
        console.log("UPDATED SUCCESS");
        navigate("/");
      }
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col justify-center w-full max-w-md p-6 shadow-lg shadow-gray-500 rounded-md bg-white">
        <div className="flex justify-center items-center w-full">
          <span className="flex w-44 justify-center items-center">
            <img
              className="md:w-64 sm:w-40"
              src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
              alt="Login Visual"
            />
          </span>
        </div>

        <div className="flex flex-col w-full space-y-3">
          <input
            className="border p-2 rounded-md"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <input
            className="border p-2 rounded-md"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <button
            className="bg-buttonColor p-2 rounded-md text-white"
            onClick={handlePassword}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
