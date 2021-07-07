import React, { useEffect, useState, useRef } from "react";
import "../Style/ownpage.css";
import cartblack from "../Media/cartblack.png";
import { useAuth } from "./contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useOrder } from "./contexts/OrderContext";

function ProductOwnPage() {
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [triggerModal, setTriggerModal] = useState(false);
  const { currentUser } = useAuth();
  const { updateCartAfterFetch } = useOrder();
  const { id } = useParams();
  const refTimeout = useRef();
  const isMounted = useRef(false);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetail(data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const { type, url, description, title, price } = productDetail;

  useEffect(() => {
    const modalDisplay = () => {
      setShowModal(true);
      refTimeout.current = setTimeout(() => setShowModal(false), 3000);
    };
    if (isMounted.current) {
      modalDisplay();
    } else {
      isMounted.current = true;
    }

    return () => {
      clearTimeout(refTimeout.current);
    };
  }, [triggerModal]);

  const addToCart = () => {
    if (currentUser) {
      currentUser.getIdToken(false).then((idToken) => {
        fetch(`/api/orders`, {
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            productId: id,
            userId: currentUser.uid,
            idToken: idToken,
          }),
        }).then(() => {
          updateCartAfterFetch();
          setTriggerModal((prev) => !prev);
        });
      });
    } else {
      return history.push("/signin");
    }
  };
  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="own-page">
          <div
            className="modal-container"
            style={showModal ? { display: "flex" } : { display: "none" }}
          >
            <p>Added to cart</p>
            <img src={cartblack} alt="cart" />
          </div>
          <div className="image-container">
            <img src={url} alt={type} />
          </div>
          <div className="info-container">
            <h3>{title}</h3>
            {description &&
              description.map((item, num) => {
                return (
                  <ul key={num * 2}>
                    <li key={num}>{item}</li>
                  </ul>
                );
              })}
            <div className="purchase-container">
              <p>
                Price: <span className="price-span">{price}$</span>
              </p>
              <button onClick={addToCart}>
                <img src={cartblack} alt="cart" />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductOwnPage;
