import React, { useState } from "react";
import "../Style/cart.css";
import { useOrder } from "./contexts/OrderContext";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import uuid from 'react-uuid'

function Cart() {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const { orderedItems, updateCartAfterFetch, getOrdersTotalPrice } =
    useOrder();
  const [address, setAddress] = useState("");
  const [fullname, setFullname] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const { currentUser } = useAuth();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements || !fullname || !address) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    removeAllOrdersWithPay()
    history.push('/successful-payment')
  };
  const removeOrder = (event) => {
    if (currentUser) {
      currentUser.getIdToken(false).then((idToken) => {
        fetch(
          `/api/orders/${event.target.id}/${currentUser.uid}/${idToken}`,
          {
            method: "delete",
          }
        );
      });
      
      updateCartAfterFetch();
      
    }
  };

  const removeAllOrdersWithPay = () => {
    //this function runs after user clicks pay button. It is just a replica of succesfull payment.
    if (currentUser) {
      currentUser.getIdToken(false).then((idToken) => {
        fetch(
          `/api/orders/${currentUser.uid}/${idToken}`,
          {
            method: "delete",
          }
        );
      });

      updateCartAfterFetch();
    }
  }

  return (
    <div className="cart-container">
      {orderedItems().length === 0 ? (
        <div className="no-item-container">
          <h1>There is no item in the cart.</h1>
          <span>
            <Link className='linkToMainMenu' to="/">Go back shopping!</Link>
          </span>
        </div>
      ) : (
        <>
          <div className="left-column">
            {orderedItems().map((item) => (
              <div className={"item-container"} key={uuid()}>
                <button id={item._id} onClick={removeOrder}>
                  x
                </button>
                <img src={item.url} alt="product" />
                <p className="item-type">{item.type}</p>
                <p className="item-title">{item.title}</p>
                <p className="item-price">{item.price}$</p>
              </div>
            ))}
            <span className="total-price">{getOrdersTotalPrice()} $</span>
          </div>

          <div className="right-column">
            <div className="orders-total">
              <p>({orderedItems().length}) items </p>
              <p>
                Total: <b>{getOrdersTotalPrice()} $</b>{" "}
              </p>
              <button onClick={() => setShowCheckout((prev) => !prev)}>
                Proceed to Checkout
              </button>
            </div>
            <div
              className="checkout-container"
              style={showCheckout ? { display: "block" } : { display: "none" }}
            >
              <form onSubmit={handleSubmit}>
                <p className="checkout-info">
                  NOTICE: this form is an illustration of react-stripe
                  elements usage and it just sends delete request to orders
                  route.
                </p>
                <label>
                  Address
                  <br />
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <label>
                  Fullname
                  <br />
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </label>
                <div className="card-element">
                  <CardElement
                    options={{
                      iconStyle: "solid",
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
                <br />
                <input
                  value={"Pay " + getOrdersTotalPrice() + "$"}
                  type="submit"
                  disabled={!stripe}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
