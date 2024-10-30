import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
  const [userId, setUserId] = useState("");

  const handleCustomGender = (event) => {
    const genderValue = event.target.value;
    setSelectedGender(genderValue);
    setShowCustomGenderInput(genderValue === "Custom");
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    const userData = async () => {
      try {
        let result = await axios.post(
          "http://localhost:5000/user/UserDetails",
          {
            email,
          }
        );
        console.log("firstName ", result.data.data.firstName);

        const userData = result.data.data;
        setUserId(userData._id);
        setEmail(userData.email);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setDateOfBirth(userData.dateOfBirth);

        setSelectedGender(userData.gender);

        setShowCustomGenderInput(
          userData.gender !== "Male" && userData.gender !== "Female"
        );
        if (userData.gender !== "Male" && userData.gender !== "Female") {
          setCustomGender(userData.gender);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    userData();
  }, []);

  const updateUserProfile = async () => {
    try {
      const gender =
        selectedGender === "Custom" ? customGender : selectedGender;
      let result = await axios.put(
        `http://localhost:5000/user/Update/${userId}`,
        {
          FirstName,
          LastName,
          email,
          password,
          dateOfBirth,
          gender,
        }
      );
      console.log(result.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center  bg-slate-100 p-5 rounded-lg">
        <form className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-full justify-center">
            <h1 className="text-3xl justify-center items-center font-interFont font-extrabold text-center">
              Profile
            </h1>

            <div className="flex flex-col space-y-3 py-4 w-full">
              <span className="w-full block border-gray-200 border-t-2"></span>
              <div className="flex flex-row w-full space-x-2">
                <input
                  className="border p-2 rounded-md w-full"
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
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
                      checked={
                        selectedGender !== "Male" && selectedGender !== "Female"
                      }
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

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="border items-center w-44 ite my-5 py-1 text-white hover:bg-green-600 bg-createAcountColor rounded-lg"
                  onClick={updateUserProfile}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
