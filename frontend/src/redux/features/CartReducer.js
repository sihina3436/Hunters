import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    discount: 0,
    discountRate: 0.05,
    grandTotal: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.products.find((product) => product._id === action.payload._id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
            }
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discount = setDiscount(state);
            state.grandTotal = setGrandTotal(state);
        },
        updateQuantity: (state, action) => {
            state.products = state.products.map((product) => {
                if (product._id === action.payload.id) {
                    if (action.payload.type === "inc") {
                        product.quantity += 1;
                    } else if (action.payload.type === "dec" && product.quantity > 1) {
                        product.quantity -= 1;
                    }
                }
                return product;
            });
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discount = setDiscount(state);
            state.grandTotal = setGrandTotal(state);
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload.id);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.discount = setDiscount(state);
            state.grandTotal = setGrandTotal(state);
        },
        clearCart: (state) => {
            state.products = [];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.discount = 0;
            state.grandTotal = 0;
        },
    },
});

// Functions
export const setSelectedItems = (state) => 
    state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) => 
    state.products.reduce((total, product) => total + product.quantity * product.price, 0);

export const setDiscount = (state) => setTotalPrice(state) * state.discountRate;

export const setGrandTotal = (state) => setTotalPrice(state) - setDiscount(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
