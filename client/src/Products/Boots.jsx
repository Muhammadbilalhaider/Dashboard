import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Boots = () => {
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const navigate = useNavigate();
  const id = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/user/getProduct/${id}`
        );

        const bootsProducts = result.data.data.filter(
          (product) => product.category === "Boot"
        );

        if (bootsProducts.length === 0) {
          setProducts([]);
        } else {
          setProducts(bootsProducts);

          const base64Image = productImage.startsWith("h")
            ? productImage
            : `data:image/jpeg;base64,${productImage}`;

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
    navigate("/addProduct");
  };

  return (
    <div className="flex flex-col w-full h-full items-center bg-black py-5">
      <div className="flex w-full flex-row justify-between  items-center">
        <h2 className="flex-1 text-white text-2xl mb-5 text-center">Boots</h2>
        <button onClick={addProduct} className="text-white mb-5 mr-5">
          Add Product
        </button>
      </div>
      {products.length > 0 ? (
        <div className="grid w-52 md:w-11/12 lg:w-11/12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  className="w-60 h-60 object-cover rounded mb-4"
                  src={`data:image/jpeg;base64,${productData.image}`}
                  alt={productData.name}
                />
                <div className="flex flex-col mt-5 ">
                  <h2 className="mt-2 text-lg font-bold">{productData.name}</h2>
                  <h2 className="text-gray-600">{productData.price}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="flex justify-center items-center text-white">
          No Product
        </h3>
      )}
    </div>
  );
};

export default Boots;
