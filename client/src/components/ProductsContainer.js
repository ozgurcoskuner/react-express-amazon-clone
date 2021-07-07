import React, {useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import "../Style/products.css";
import { Link } from "react-router-dom";
import fetchProducts from "../redux/products/productsActions";
function ProductsContainer() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
 
  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : error ? (
        <h2>{error.message}</h2>
      ) : (
        <div className="products-container">
          {products &&
            products.map((product, num) => {
              return (
                
                  <div className="products" key={num}>
                    <Link to={`/${product.type}/${product._id}`}>
                      <div className="image-container">
                        <img src={product.url} alt={product.type} />
                      </div>
                      <div className="information-container">
                        <p>{product.title}</p>
                        <p style={{ fontSize: "1.2rem" }}>
                          <b>{product.price}$</b>
                        </p>
                      </div>
                    </Link>
                  </div>
               
              );
            })}
        </div>
      )}
    </>
  );
}

export default ProductsContainer;
