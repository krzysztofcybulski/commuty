import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { userReducer } from './userReducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers( {
  userSlice: userReducer.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const persistor = persistStore(store)
