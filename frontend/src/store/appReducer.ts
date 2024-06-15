import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './store.ts';
import {Point} from '../hooks/useFindRoute.ts';
import {CommutyApiRequest} from "../client/CommutyApiRequest.ts";

export type ViewType =
    'WELCOME'
    | 'SELECT_COMMUTING_PREFERENCES'
    | 'WHEN_YOU_ARE_GOING'
    | 'SET_YOUR_NAME'
    | 'CREATE_ACCOUNT'
    | 'HOME_PAGE';

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
    username?: string;
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
        updateUserName: (state, action: PayloadAction<string | undefined>) => {
            state.username = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    updateView,
    updateRidePreferences,
    updateAddressFrom,
    updateAddressTo,
    updateUserName
} = appReducer.actions;

export const selectView = (state: RootState) => state.appSlice.view;

export const selectPayload = (state: RootState) : CommutyApiRequest => {
    const addressFrom = state.appSlice.addressFrom
    const addressTo = state.appSlice.addressTo
    const username = state.appSlice.username
    const ridePreferences = state.appSlice.ridePreferencesFields

    const ridePreferencesList = []
    if (ridePreferences.DRIVER) {
        ridePreferencesList.push('DRIVER')
    }

    if (ridePreferences.PASSENGER) {
        ridePreferencesList.push('PASSENGER')
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
                timePreferences: [
                    {
                        day: 'MONDAY',
                        timeRange: {
                            departureTime: '08:00',
                            returnTime: '13:00',
                        },
                    },
                ],
            },
        ],
    }
}

export default appReducer.reducer;
