import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./store.ts";

type ViewType = 'WELCOME' | 'SELECT_COMMUTING_PREFERENCES'

export interface AppState {
    view: ViewType;
}

const initialState: AppState = {
    view: 'SELECT_COMMUTING_PREFERENCES',
}

export const appReducer = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        updateView: (state, action: PayloadAction<ViewType>) => {
            state.view = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {updateView} = appReducer.actions

export const selectView = (state: RootState) => state.appSlice.view

export default appReducer.reducer

