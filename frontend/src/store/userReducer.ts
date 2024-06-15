import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface User {
    name: string;
    email: string;
}

export interface UserState {
    user?: User
}

export const initialState: UserState = {}

export const userReducer = createSlice({
    name: 'userReducer',
    initialState: initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userReducer.actions
