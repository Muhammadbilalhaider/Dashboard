import axios from "axios";
import React, { useState } from "react";
import close from "../assets/close.svg";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProducts = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("productPic", image);
    color.forEach((c) => formData.append("color[]", c));
    size.forEach((s) => formData.append("size[]", s));
    formData.append("description", description);
    formData.append("category", category);

    try {
      let result = await axios.post(
        "http://localhost:5000/user/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Result", result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleColorChange = async (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setColor((prev) => [...prev, value]);
    }
  };

  const handleSizeChange = async (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSize((prev) => [...prev, value]);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="w-full bg-white p-3 justify-center items-center rounded-lg relative m-5 lg:w-1/4 max-w-lg">
        <div className="flex w-10 items-end ">
          <img src={close} alt="" />
        </div>
        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={handleAddProducts}
        >
          <div className="flex flex-col  items-center w-full justify-center">
            <h1 className="text-3xl items-center font-interFont font-extrabold text-left">
              Add Product
            </h1>

            <div className="flex flex-col space-y-3 py-4 w-full">
              <span className="w-full block border-gray-200 border-t-2"></span>
              <div className="flex flex-row w-full space-x-2">
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-row w-full space-x-2">
                <input
                  className="border p-2 rounded-md w-full"
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <select
                  className="border p-2 w-full rounded-md"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select Category</option>
                  {["Snicker", "Boot", "Loofer"].map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-sm">Color</p>
                <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4">
                  {["white", "blue", "black"].map((col) => (
                    <label
                      key={col}
                      className="border p-2 rounded-md w-full flex justify-between items-center"
                    >
                      <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                      <input
                        type="checkbox"
                        value={col}
                        onChange={handleColorChange}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col w-full">
                <p className="text-sm">Size</p>
                <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4">
                  {["small", "medium", "large"].map((sz) => (
                    <label
                      key={sz}
                      className="border p-2 rounded-md w-full flex justify-between items-center"
                    >
                      <span>{sz.charAt(0).toUpperCase() + sz.slice(1)}</span>
                      <input
                        type="checkbox"
                        value={sz}
                        onChange={handleSizeChange}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                className="flex min-h-12 border p-2 rounded-md w-full"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div class="flex flex-col items-center justify-center w-full ">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg 
                  cursor-pointer bg-gray-50
                   hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex w-full  flex-col items-center justify-center pt-5 pb-6">
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      image ? SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                {image && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Uploaded File: {image.name}
                  </p>
                )}
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="border items-center w-44 ite my-5 py-1 text-white hover:bg-green-600 bg-createAcountColor rounded-lg"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
