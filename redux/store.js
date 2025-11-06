// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookingReducer from './bookingSlice';
import userReducer from './userSlice';
import movieReducer from './movieSlice';
import searchReducer from './searchSlice'
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  bookings: bookingReducer,
  user: userReducer,
  movie: movieReducer,
  searchMovie: searchReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
