import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useSelector } from "react-redux";
const OrderContext = React.createContext();

export function useOrder() {
  return useContext(OrderContext);
}
export function OrderProvider({ children }) {
  const [orderInfo, setOrderInfo] = useState([]);
  const { currentUser } = useAuth();
  const [updateCart, setUpdateCart] = useState(false);

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken(false).then((idToken) => {
      fetch(`/api/orders/${currentUser.uid}/${idToken}`)
        .then((res) => res.json(res))
        .then((data) => {
          setOrderInfo(data);
        })
        .catch((err) => console.log(err));
        
      })
    }
  }, [currentUser, updateCart]);

  function updateCartAfterFetch() {
    setUpdateCart((prev) => !prev);
  }

  function updateOrderInfoAfterLogout() {
    setOrderInfo("");
  }

  const products = useSelector((state) => state.products.products);

  const orderedItemsId = orderInfo && orderInfo.map(item => item.productId )
 
 
  
   
 function orderedItems(){
   const orderedProducts = []
   for (let i = 0; orderedItemsId.length > i; i++){
     for (let m = 0; products.length > m; m++){
       if(products[m]._id === orderedItemsId[i] ){
         
         orderedProducts.push(products[m])
       }
       
     }
   }
   
   return orderedProducts
 }


  function getOrdersTotalPrice() {
    return (orderedItems()
      .map((item) => item.price)
      .reduce((prev, cur) => prev + cur, 0)
      .toFixed(2))
  }

  const value = {
    updateCartAfterFetch,
    updateCart,
    updateOrderInfoAfterLogout,
    getOrdersTotalPrice,
    orderedItems
  };
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
