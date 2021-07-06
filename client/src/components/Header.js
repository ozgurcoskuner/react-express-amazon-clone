import React from "react";
import "../Style/header.css";
import logo from "./../Media/amazonlogo.png";
import cart from "./../Media/cart.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useOrder } from "./contexts/OrderContext";

function Header() {
  const { currentUser, logout } = useAuth();
  const { orderedItems, updateOrderInfoAfterLogout } = useOrder();
  
  const handleLogout = () => {
    logout()
    .then(() => updateOrderInfoAfterLogout())
    
  } 
  
  return (
    <>
      <header>
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="amazon-logo" />
          </Link>
        </div>

        <SearchBar />
        <div className="header-user">
          {currentUser ? (
            <div>
              Welcome, {currentUser.displayName}
              <div className="logout-hover">
              <button onClick={handleLogout} >
                Logout
              </button>
              </div>
              </div>
          ) : (
            <Link to={"/signin"}>
              <span>
                Welcome Guest <br /> <b>Sign in!</b>
              </span>
            </Link>
          )}
        </div>
        <div className="header-cart">
          <Link to="/cart">
            <img src={cart} alt="cart" />
            <div className="header-cart-info">
              <span>{!(currentUser && orderedItems()) ? '0': orderedItems().length}</span>
              <p>Your cart</p>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
