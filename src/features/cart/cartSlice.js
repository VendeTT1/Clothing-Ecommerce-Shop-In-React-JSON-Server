import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
    cartItem: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItem = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItem = state.cartItem.filter((cartItem) => cartItem.id !== itemId)
            cartSlice.caseReducers.calculateTotals(state);
            toast.error('Product removed from the cart!');
        },
        updateCartAmount: (state, action) => {
            const cartItem = state.cartItem.find(cartItem => cartItem.id === action.payload.id);
            cartItem.amount = Number(action.payload.amount);
            cartSlice.caseReducers.calculateTotals(state);
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItem.forEach(cartItem => {
                amount += cartItem.amount;
                total += cartItem.amount * cartItem.price;
            });
            state.amount = amount;
            state.total = total;
        },
        addToCart: (state, action) => {
            const cartItem = state.cartItem.find(cartItem => cartItem.id === action.payload.id);
            if(!cartItem){
                state.cartItem.push(action.payload);
            }else{
                cartItem.amount += action.payload.amount;
            }
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Product added to the cart!');

        }
    }
})

// console.log(cartSlice);
export const { clearCart, removeItem, updateCartAmount, decrease, calculateTotals, addToCart } = cartSlice.actions;

export default cartSlice.reducer;