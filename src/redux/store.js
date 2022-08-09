import { configureStore } from '@reduxjs/toolkit';
import reducerSlice from "./reducerSlice";

export const store = configureStore({
  reducer: {
    reducerSlice:reducerSlice
  },
});


export default store;


