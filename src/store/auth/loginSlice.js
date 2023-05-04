import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        isAuth: false,
        activeLogin: {},
        errorMessage: undefined,
    },
    reducers: {
        
        onActiveLogin: ( state, { payload } ) => {
            state.activeLogin = payload;
        },
        onAuthLogin: ( state, { payload } ) => {
            state.isAuth = payload;
        },



        // onDeleteArea: ( state, {payload} ) => {
        //     state.areas.splice(payload,1);
        // },
        // onLoadAreas: (state, { payload = [] }) => {
        //     state.isLoadingEvents = false;
        //     state.areas = payload;
        //     // payload.forEach( event => {
        //     //     const exists = state.events.some( dbEvent => dbEvent.id === event.id );
        //     //     if ( !exists ) {
        //     //         state.events.push( event )
        //     //     }
        //     // })
        // },
        // onIsEditing: (state, { payload }) => {
        //     state.isEditing = payload;
        // },
        // onLoadArea: (state, { payload }) => {
        //     state.activeArea = payload;
        // }
        
    }
});


// Action creators are generated for each case reducer function
export const {
    onActiveLogin,
    onAuthLogin
} = loginSlice.actions;