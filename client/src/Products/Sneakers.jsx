import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddProduct from "./AddProduct";
const Sneakers = () => {
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isAddProductOpen, setIsAddproductOpen] = useState(false);

  const navigate = useNavigate();
  const id = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/user/getProduct/${id}`
        );

        const snickersProducts = result.data.data.filter(
          (product) => product.category === "Snicker"
        );
        console.log("Snickers", snickersProducts);
        if (snickersProducts.length === 0) {
          setProducts([]);
          setIsOpenCard(true);
        } else {
          setProducts(snickersProducts);
          const base64Image = `data:image/jpeg;base64,${productImage}`;

          setProductImage(base64Image);

          console.log("Profile Picture: ", base64Image);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (isAddProductOpen) {
      setIsOpenCard(false);
    } else {
      setIsAddproductOpen(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center bg-black">
      <div className="flex w-full flex-row  items-start">
        <h2 className="flex-1 text-white text-2xl mb-5 text-center">
          Snickers
        </h2>
        <button onClick={addProduct} className="text-white mb-5 mr-5">
          Add Product
        </button>
      </div>
      // Open Add Product Form
      {isAddProductOpen && <AddProduct />}
      {productImage.length > 0 ? (
        <div className="grid w-52 md:w-11/12 lg:w-11/12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((productData) => (
            <div
              key={productData.id}
              className="bg-white rounded-lg p-4 flex flex-col items-center"
            >
              <Link
                to={`/productDetails/${productData._id}`}
                className="flex flex-col items-center"
              >
                <img
                  className="w-60 h-60 object-cover rounded transform transition-transform duration-300 hover:scale-110"
                  src={`data:image/jpeg;base64,${productData.image}`}
                  alt={productData.name}
                />
                <div className="flex flex-col pb-10">
                  <h2 className="mt-2 text-lg font-bold">{productData.name}</h2>
                  <h2 className="text-gray-600">{productData.price}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 ${
            isOpenCard ? "block" : "hidden"
          }`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              No Products Available
            </h3>

            <p className="text-gray-600 mb-6">
              Add new products to display in this category.
            </p>

            <button
              onClick={() => {
                setIsOpenCard(false);
                addProduct();
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Add Product
            </button>
            <button
              onClick={() => setIsOpenCard(false)}
              className="text-gray-500 mt-4 hover:text-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sneakers;
