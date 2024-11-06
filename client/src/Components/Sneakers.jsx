import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sneakers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/user/GetProducts?category=Snickers"
        );
        setProducts(result.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center bg-black py-5">
      <h2 className="text-white text-2xl mb-5">Snickers</h2>

      {/* Adjusted Grid Layout */}
      <div className="grid w-80 md:w-11/12 lg:w-11/12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((productData) => (
          <div
            key={productData._id}
            className="bg-white rounded-lg p-4 flex flex-col items-center"
          >
            <Link
              to={`/productDetails/${productData._id}`}
              className="flex flex-col items-center"
            >
              <img
                className="w-full h-auto rounded"
                src={productData.image}
                alt={productData.name}
              />
              <h2 className="mt-2 text-lg font-bold">{productData.name}</h2>
              <h2 className="text-gray-600">{productData.price}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sneakers;
