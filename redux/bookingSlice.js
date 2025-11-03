import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    removeBooking: (state, action) => {
      // action.payload should be the booking _id
      state.bookings = state.bookings.filter(b => b._id !== action.payload && b.id !== action.payload);
    },
    clearBookings: (state) => {
      state.bookings = [];
    },
  },
});

export const { addBooking, removeBooking, clearBookings } = bookingSlice.actions;
export default bookingSlice.reducer;
