import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoadingUsers: true,
        users: [],
        activeUser: {},
        isEditing: false,
        errorMessage: undefined,
    },
    reducers: {
        
        onAddNewUser: ( state, { payload }) => {
            state.users.push(payload);
            state.status = 'loading';
        },

        onUpdateUser: ( state, { payload } ) => {
            state.activeUser = payload;
        },

        onDeleteUser: ( state, {payload} ) => {
            state.users.splice(payload,1);
        },
        onLoadUsers: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            state.users = payload;
            // payload.forEach( event => {
            //     const exists = state.events.some( dbEvent => dbEvent.id === event.id );
            //     if ( !exists ) {
            //         state.events.push( event )
            //     }
            // })
        },
        onIsEditing: (state, { payload }) => {
            state.isEditing = payload;
        },
        onLoadUser: (state, { payload }) => {
            state.activeUser = payload;
        }
        
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewUser,
    onDeleteUser,
    onLoadUsers,
    onUpdateUser,
    onLoadUser,
    onIsEditing
} = userSlice.actions;