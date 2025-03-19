import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:4000/create-checkout-session";

// Async Thunk to create checkout session
export const createCheckoutSession = createAsyncThunk(
  "checkout/createSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return data.id; // Return session ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    sessionId: null,
    status: "idle",
    error: null,
  },
  reducers: {}, // No extra reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.sessionId = action.payload;
        state.status = "succeeded";
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default checkoutSlice.reducer;
