import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: true,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    updateUser: (state, action) => {
      console.log(state, action.payload);
      const index = state.data.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      console.log(state, action.payload);
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setError,
  setLoading,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
