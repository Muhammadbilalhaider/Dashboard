import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

const Loofers = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/user/GetProducts?category=Loofers"
        );
        setProducts(result.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async () => {
    navigate('/addProduct');
  }

  return (
    <div className="flex flex-col w-full justify-center items-center bg-black py-5">
      <div className="flex w-full flex-row justify-between  items-center">
        <h2 className="flex-1 text-white text-2xl mb-5 text-center">Loofers</h2>
        <button onClick={addProduct} className="text-white mb-5 mr-5">Add Product</button>
      </div>

   
      <div className="grid w-80 md:w-11/12 lg:w-11/12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((productData) => (
          <div
            key={productData._id}
            className="bg-white rounded-lg p-4 flex flex-col items-center"
          >
            <Link
              to={`Products/productDetails/${productData._id}`}
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

export default Loofers;
