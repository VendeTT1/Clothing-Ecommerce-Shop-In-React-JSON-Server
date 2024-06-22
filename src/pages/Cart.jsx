// import React from 'react'
// import { CartItemsList, CartTotals, SectionTitle } from '../components'
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';

// const Cart = () => {
  
//   const navigate = useNavigate();
//   const loginState = useSelector((state) => state.auth.isLoggedIn);
//   const { cartItems } = useSelector((state) => state.cart);

//   const isCartEmpty = () => {
//     if(cartItems.length === 0){
//       toast.error("Your cart is empty");
//     }else{
//       navigate("/thank-you");
//     }
//   }

//   return (
//     <>
//     <SectionTitle title="Cart" path="Home | Cart" />
//     <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
//         <div className='lg:col-span-8'>
//           <CartItemsList />
//         </div>
//         <div className='lg:col-span-4 lg:pl-4'>
//           <CartTotals />
//           {loginState ? (
//             <button onClick={isCartEmpty} className='btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8'>
//               order now
//             </button>
//           ) : (
//             <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
//               please login
//             </Link>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Cart
import React, { useState } from "react";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItem } = useSelector((state) => state.cart);
  const [orderTotal, setOrderTotal] = useState(0);

  const ORDER_STATUS = "in progress";

  const isCartEmpty = () => {
    if (cartItem.length === 0) {
      toast.error("Your cart is empty");
    } else {
      handleOrder();
    }
  };

  const handleOrder = async () => {
    const userId = localStorage.getItem("id");
    const orderDetails = {
      userId,
      cartItem: cartItem.map((cartItem) => ({
        productId: Number(cartItem.id),
        title: cartItem.title,
        image: cartItem.image,
        rating: cartItem.rating,
        price: orderTotal,
        brandname: cartItem.brandname,
        amount: cartItem.amount,
        selectedsize: cartItem.selectedsize,
        isinwishlist: false,
      })),
      subtotal: orderTotal,
      orderstatus: ORDER_STATUS,
    };

    try {
      const response = await fetch(`http://localhost:8080/orders/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        navigate("/thank-you");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals setOrderTotal={setOrderTotal} />
          {loginState ? (
            <button
              onClick={isCartEmpty}
              className="btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8"
            >
              order now
            </button>
          ) : (
            <Link
              to="/login"
              className="btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8"
            >
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;