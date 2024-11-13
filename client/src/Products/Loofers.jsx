import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

import addImg from "../assets/addProduct.svg";
import close from "../assets/close.svg";
import deleteItem from "../assets/deleteItem.svg";
import edit from "../assets/edit.svg";
import moreOptions from "../assets/more.svg";

const Loofers = () => {
  const [allFieldsData, setAllFieldsData] = useState({
    products: [],
    productImage: [],
    isOpenCard: false,
    isAddProductOpen: false,
    color: [],
    size: [],
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const navigate = useNavigate();
  const id = useParams();
  const category = "Loofer";

  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/user/getProductById/${id}?category=${category}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const loofersProducts = result.data.data.filter(
          (product) => product.category === "Loofer"
        );
        setTotalPages(result.data.totalPages);
        console.log("Pages ", result.data.totalPages);
        console.log("Loofer", loofersProducts);
        if (loofersProducts.length === 0) {
          setAllFieldsData((prev) => ({
            ...prev,
            products: [],
            isOpenCard: true,
            isAddProductOpen: false,
          }));
        } else {
          setAllFieldsData((prev) => ({
            ...prev,
            products: loofersProducts,
            isOpenCard: false,
            productImage: `data:image/jpeg;base64,${loofersProducts[0].image}`,
          }));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const addProduct = async () => {
    setAllFieldsData((prev) => ({
      ...prev,
      isAddProductOpen: !prev.isAddProductOpen,
    }));
  };
  const toggleModal = (open) => {
    setAllFieldsData((prevData) => ({ ...prevData, isOpenCard: open }));
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", allFieldsData.name);
    formData.append("price", allFieldsData.price);
    formData.append("productPic", allFieldsData.image);
    allFieldsData.color.forEach((c) => formData.append("color[]", c));
    allFieldsData.size.forEach((s) => formData.append("size[]", s));
    formData.append("description", allFieldsData.description);
    formData.append("category", allFieldsData.category);

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
    setAllFieldsData((prev) => ({
      ...prev,
      color: checked
        ? [...prev.color, value]
        : prev.color.filter((c) => c !== value),
    }));
  };

  const handleSizeChange = async (e) => {
    const { value, checked } = e.target;
    setAllFieldsData((prev) => ({
      ...prev,
      size: checked
        ? [...prev.size, value]
        : prev.size.filter((s) => s !== value),
    }));
  };

  const handleCloseForm = () => {
    setAllFieldsData((prev) => ({ ...prev, isAddProductOpen: false }));
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="flex flex-col w-full h-full items-center bg-black">
      <div className="flex w-full flex-row items-start">
        <h2 className="flex-1 text-white text-2xl mb-5 text-center">Loofers</h2>

        <img
          onClick={addProduct}
          className="flex w-10 lg:w-16 transition-transform hover:scale-105 mr-5 hover:rotate-180 duration-300 cursor-pointer"
          src={addImg}
          alt=""
        />
      </div>

      {allFieldsData.isAddProductOpen && (
        <div
          className={`fixed inset-0  bg-black bg-opacity-40 flex justify-center items-center z-50`}
        >
          <div className="bg-white items-center m-10 justify-center overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent rounded-lg">
            <button
              onClick={handleCloseForm}
              className=" top-2 left-2 px-4 py-1 text-gray-700 font-bold hover:bg-gray-300 transition rounded"
            >
              <img className="w-6" src={close} alt="" />
            </button>
            <form
              className="flex flex-col items-center px-5 justify-center"
              onSubmit={handleAddProducts}
            >
              <div className="flex flex-col  items-center justify-center">
                <h4 className="text-3xl items-center font-interFont font-extrabold text-left">
                  Add Product
                </h4>

                <div className="flex flex-col space-y-3 w-full">
                  <span className="w-full block border-gray-200 border-t-2"></span>
                  <div className="flex flex-row w-full h-10 space-x-2">
                    <input
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Name"
                      value={allFieldsData.name}
                      onChange={(e) =>
                        setAllFieldsData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-row  w-full h-10  space-x-2">
                    <input
                      className="border p-2 rounded-md w-full"
                      type="text"
                      placeholder="Price"
                      value={allFieldsData.price}
                      onChange={(e) =>
                        setAllFieldsData((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                    <select
                      className="border p-2 w-full rounded-md"
                      onChange={(e) =>
                        setAllFieldsData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option>Select Category</option>
                      {["Snicker", "Boot", "Loofer"].map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col w-ful">
                    <p className="text-sm">Color</p>
                    <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4  h-10">
                      {["white", "blue", "black"].map((col) => (
                        <label
                          key={col}
                          className="border p-2 rounded-md w-full flex justify-between items-center"
                        >
                          <span>
                            {col.charAt(0).toUpperCase() + col.slice(1)}
                          </span>
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
                    <div className="flex flex-row space-x-2 lg:space-x-4 md:space-x-4 h-10 ">
                      {["small", "medium", "large"].map((s) => (
                        <label
                          key={s}
                          className="border p-2 rounded-md w-full flex justify-between items-center"
                        >
                          <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                          <input
                            type="checkbox"
                            value={s}
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
                    value={allFieldsData.description}
                    onChange={(e) =>
                      setAllFieldsData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />

                  <div class="flex flex-col items-center justify-center w-full ">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg 
                                  cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 
                                  dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex w-full  flex-col items-center justify-center pt-5 pb-6">
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          image ? SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        name="productPic"
                        class="hidden"
                        onChange={(e) =>
                          setAllFieldsData((prev) => ({
                            ...prev,
                            image: e.target.files[0],
                          }))
                        }
                      />
                    </label>
                    {allFieldsData.image && (
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Uploaded File: {allFieldsData.image.name}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center items-center py-3">
                    <button
                      type="submit"
                      className="border items-center w-44 py-2 text-white hover:bg-green-600 bg-createAcountColor rounded-lg"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {allFieldsData.productImage.length > 0 ? (
        <div className=" flex flex-col w-full justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:w-10/12 items-center justify-center ">
            {allFieldsData.products.map((productData) => (
              <div
                key={productData.id}
                className="flex flex-col items-center justify-center m-2 bg-white rounded-lg gap-3 p-4 relative"
              >
                <div
                  className="absolute top-0 right-0 flex flex-col"
                  onMouseEnter={() => setHoveredProductId(productData._id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <img
                    onClick={handleAddProducts}
                    src={moreOptions}
                    alt="More Options"
                    className={`cursor-pointer w-8 transition-transform duration-300 ${
                      hoveredProductId === productData._id ? "rotate-180" : ""
                    }`}
                  />

                  {hoveredProductId === productData._id && (
                    <div className="transition-all duration-300 ease-out opacity-100 transform translate-y-0">
                      <img
                        className="cursor-pointer  w-8 transition-transform hover:rotate-180 duration-300"
                        src={edit}
                        alt="Edit"
                      />
                      <img
                        className="cursor-pointer w-8 delay-1000"
                        src={deleteItem}
                        alt="Delete"
                      />
                    </div>
                  )}
                </div>
                <Link
                  to={`/productDetails/${productData._id}`}
                  className="flex flex-col items-center"
                >
                  <img
                    className="lg:w-40 lg:h-40 w-24 lg:object-contain items-center justify-center rounded transform transition-transform duration-300 hover:scale-110"
                    src={`data:image/jpeg;base64,${productData.image}`}
                    alt={productData.name}
                  />
                  <div className="flex flex-col  justify-center items-center mt-8">
                    <h2 className="mt-2 text-lg font-bold">
                      {productData.name}
                    </h2>
                    <h2 className="text-gray-600">{productData.price}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center w-full p-4 shadow-md lg:fixed bottom-0 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1  rounded-full transition-transform hover:scale-110 duration-300 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-white text-xl  text-center">
            No product available! <br /> Please Add
          </p>
        </div>
      )}
    </div>
  );
};

export default Loofers;
