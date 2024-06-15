import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { Point } from '../hooks/useFindRoute.ts';

export type ViewType = 'WELCOME' | 'SELECT_COMMUTING_PREFERENCES';

export enum RidePreference {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

type RidePreferencesFields = Record<RidePreference, boolean>;

export interface AppState {
  view: ViewType;
  ridePreferencesFields: RidePreferencesFields;
  addressFrom?: Point;
  addressTo?: Point;
}

const initialState: AppState = {
  view: 'WELCOME',
  ridePreferencesFields: {
    [RidePreference.DRIVER]: false,
    [RidePreference.PASSENGER]: false,
  },
};

export const appReducer = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    updateView: (state, action: PayloadAction<ViewType>) => {
      state.view = action.payload;
    },
    updateRidePreferences: (state, action: PayloadAction<any>) => {
      state.ridePreferencesFields = {
        ...state.ridePreferencesFields,
        ...action.payload,
      };
    },
    updateAddressFrom: (state, action: PayloadAction<Point | undefined>) => {
      state.addressFrom = action.payload;
    },
    updateAddressTo: (state, action: PayloadAction<Point | undefined>) => {
      state.addressTo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateView, updateRidePreferences, updateAddressFrom, updateAddressTo } = appReducer.actions;

export const selectView = (state: RootState) => state.appSlice.view;

export default appReducer.reducer;
