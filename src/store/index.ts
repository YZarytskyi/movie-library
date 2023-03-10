import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import moviesReducer from "./movies/moviesSlice";

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favoriteMovies']
}

const rootReducer = combineReducers({
  movies: persistReducer(favoritesPersistConfig, moviesReducer),
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch