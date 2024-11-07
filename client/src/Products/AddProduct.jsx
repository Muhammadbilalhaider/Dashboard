import axios from "axios";
import React, { useState } from "react";

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
    <div className="flex flex-col justify-center items-center w-full h-full bg-slate-100">
      <div className="w-full bg-white p-3 justify-center items-center rounded-lg relative m-5 lg:w-1/4 max-w-lg">
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
              <div className="flex flex-col">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
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
