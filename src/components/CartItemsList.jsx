import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const CartItemsList = () => {
    
    const { cartItem } = useSelector(state => state.cart);

  return (
    <>
      {cartItem.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
    </>
  )
}

export default CartItemsList