import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD

// Helper function to load user from localStorage on initial load
const loadUserFromLocalStorage = () => {
    try {
        // Get the serialized user data from localStorage
        const serializedState = localStorage.getItem('user');
        // If no user data is found, return a default state with null user
=======
const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
>>>>>>> admin-dashboard-and-more
        if(serializedState == null) return {user: null};
        return {user: JSON.parse(serializedState)}
    } catch (error) {
        return {user: null}
    }
}

<<<<<<< HEAD
// Initial state is loaded from localStorage or default to null user
const initialState = loadUserFromLocalStorage();

// Create a slice of the state to manage authentication-related data
const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState, // Initial state for the slice
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload.user;
             // Save user data in localStorage to persist across page reloads
            localStorage.setItem('user', JSON.stringify( state.user))
        },
         // Action to log out the user, clear the state, and remove from localStorage
        logout : (state) => {
            state.user = null;
            localStorage.removeItem('user'); // Remove the user data from localStorage
=======
const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify( state.user))
        },
        logout : (state) => {
            state.user = null;
            localStorage.removeItem('user');
>>>>>>> admin-dashboard-and-more
        }
    }
})

<<<<<<< HEAD
// Export the actions to be used in components
export const {setUser, logout} = authSlice.actions;
// Export the reducer to be used in the store configuration
=======
export const {setUser, logout} = authSlice.actions;
>>>>>>> admin-dashboard-and-more
export default authSlice.reducer;