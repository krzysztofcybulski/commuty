import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

type ViewType = 'WELCOME' | 'SELECT_COMMUTING_PREFERENCES';

export enum RidePreference {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

type Payload = {
  ridePreferences: RidePreference[];
};

type RidePreferencesFields = Record<RidePreference, boolean>;

export interface AppState {
  view: ViewType;
  payload: Payload;
  ridePreferencesFields: RidePreferencesFields;
}

const initialState: AppState = {
  view: 'WELCOME',
  payload: {
    ridePreferences: [],
  },
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
    updatePayload: (state, action: PayloadAction<RidePreference[]>) => {
      state.payload = {
        ...state.payload,
        ...action.payload,
      };
    },
    updateRidePreferences: (state, action: PayloadAction<any>) => {
      state.ridePreferencesFields = {
        ...state.ridePreferencesFields,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateView, updatePayload, updateRidePreferences } = appReducer.actions;

export const selectView = (state: RootState) => state.appSlice.view;

export default appReducer.reducer;
