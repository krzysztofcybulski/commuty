import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';
import { Point } from '../hooks/useFindRoute.ts';
import { CommutyApiRequest } from '../client/CommutyApiRequest.ts';

export type ViewType =
  | 'WELCOME'
  | 'SELECT_COMMUTING_PREFERENCES'
  | 'WHEN_YOU_ARE_GOING'
  | 'SET_YOUR_NAME'
  | 'CREATE_ACCOUNT'
  | 'HOME_PAGE'
  | 'SIGN_IN'
  | 'CHATS'
  | 'PROFILE';

export enum RidePreference {
  DRIVER = 'DRIVER',
  PASSENGER = 'PASSENGER',
}

type RidePreferencesFields = Record<RidePreference, boolean>;

export type FullDayName = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface AppState {
  view: ViewType;
  ridePreferencesFields: RidePreferencesFields;
  addressFrom?: Point;
  addressTo?: Point;
  username?: string;
  departureTime?: string;
  returnTime?: string;
  chosenDays?: FullDayName[];
  addressFromText?: string;
  addressToText?: string;
  weekDaysChosen?: Record<FullDayName, boolean>;
}

const initialState: AppState = {
  view: 'WELCOME',
  ridePreferencesFields: {
    [RidePreference.DRIVER]: false,
    [RidePreference.PASSENGER]: false,
  },
  addressFrom: undefined,
  addressTo: undefined,
  departureTime: '08:00',
  returnTime: '16:00',
  chosenDays: [],
  addressFromText: '',
  addressToText: '',
  weekDaysChosen: {
    MONDAY: false,
    TUESDAY: false,
    WEDNESDAY: false,
    THURSDAY: false,
    FRIDAY: false,
    SATURDAY: false,
    SUNDAY: false,
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
    updateUserName: (state, action: PayloadAction<string | undefined>) => {
      state.username = action.payload;
    },
    updateDepartureTime: (state, action: PayloadAction<string>) => {
      state.departureTime = action.payload;
    },
    updateReturnTime: (state, action: PayloadAction<string>) => {
      state.returnTime = action.payload;
    },
    updateChosenDays: (state, action: PayloadAction<FullDayName[]>) => {
      state.chosenDays = [...action.payload];
    },
    updateAddressFromText: (state, action: PayloadAction<string>) => {
      state.addressFromText = action.payload;
    },
    updateAddressToText: (state, action: PayloadAction<string>) => {
      state.addressToText = action.payload;
    },
    updateWeeksDayChosen: (state, action: PayloadAction<Record<FullDayName, boolean>>) => {
      state.weekDaysChosen = {
        ...state.weekDaysChosen,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateView,
  updateRidePreferences,
  updateAddressFrom,
  updateAddressTo,
  updateUserName,
  updateReturnTime,
  updateDepartureTime,
  updateChosenDays,
  updateAddressFromText,
  updateAddressToText,
  updateWeeksDayChosen,
} = appReducer.actions;

export const selectView = (state: RootState) => state.appSlice.view;
export const selectRidePreferences = (state: RootState) => state.appSlice.ridePreferencesFields;
export const selectAddressTo = (state: RootState) => state.appSlice.addressTo;
export const selectAddressFrom = (state: RootState) => state.appSlice.addressFrom;
export const selectReturnTime = (state: RootState) => state.appSlice.returnTime;
export const selectDepartureTime = (state: RootState) => state.appSlice.departureTime;
export const selectChosenDays = (state: RootState) => state.appSlice.chosenDays;
export const selectUsername = (state: RootState) => state.appSlice.username;
export const selectAddressFromText = (state: RootState) => state.appSlice.addressFromText;
export const selectAddressToText = (state: RootState) => state.appSlice.addressToText;
export const selectWeeksDayChosen = (state: RootState) => state.appSlice.weekDaysChosen;

export const selectPayload = (state: RootState): CommutyApiRequest => {
  const addressFrom = state.appSlice.addressFrom;
  const addressTo = state.appSlice.addressTo;
  const username = state.appSlice.username;
  const ridePreferences = state.appSlice.ridePreferencesFields;
  const chosenDays = state.appSlice.chosenDays;
  const departureTime = state.appSlice.departureTime;
  const returnTime = state.appSlice.returnTime;

  const ridePreferencesList = [];
  if (ridePreferences.DRIVER) {
    ridePreferencesList.push('DRIVER');
  }

  if (ridePreferences.PASSENGER) {
    ridePreferencesList.push('PASSENGER');
  }

  return {
    user: {
      name: username,
    },
    ridePreferences: ridePreferencesList,
    commutingRoutes: [
      {
        addressFrom: {
          longitude: addressFrom?.lng?.toString(),
          latitude: addressFrom?.lat?.toString(),
          levelOfDetail: 13,
        },
        addressTo: {
          longitude: addressTo?.lng?.toString(),
          latitude: addressTo?.lat?.toString(),
          levelOfDetail: 13,
        },
        timePreferences: (chosenDays as FullDayName[]).map((chosenDay) => {
          return {
            day: chosenDay as FullDayName,
            timeRange: {
              departureTime: departureTime as string,
              returnTime: returnTime as string,
            },
          };
        }),
      },
    ],
  };
};

export default appReducer.reducer;
