import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { moviesSlice } from "./movies/moviesSlice";

const rootReducer = combineReducers({
  [moviesSlice.name]: moviesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch