import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./store.ts";

type ViewType = 'WELCOME'

export interface AppState {
    view: ViewType;
}

const initialState: AppState = {
    view: 'WELCOME',
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

