import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Sneakers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get('http://localhost:5000/user/GetProducts?category=Snickers');
        setProducts(result.data.data);
        console.log("result", result.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    console.log("image", products.image)
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-black">

      <h2>Sneakers</h2>

      <div className="flex flex-wrap justify-center w-full">
        {products.map((productData) => (
         <div key={productData._id} className="flex flex-col items-center p-2">
            <div className="flex flex-col w-64 items-center rounded-2xl bg-white p-4">
            <Link to={`/productDetails/${productData._id}`} className="flex flex-col items-center rounded-2xl ">
                <img
                  className="w-full h-auto"
                  src={productData.image}
                  alt={productData.name}
                />
                <h2>{productData.name}</h2>
                <h2>{productData.price}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default Sneakers;
