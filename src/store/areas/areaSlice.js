import { createSlice } from '@reduxjs/toolkit';

export const areaSlice = createSlice({
    name: 'area',
    initialState: {
        areas: [],
        activeArea: {},
        isEditing: false,
        errorMessage: undefined,
    },
    reducers: {
        
        onAddNewArea: ( state, { payload }) => {
            state.areas.push(payload);
            state.status = 'loading';
        },

        onUpdateArea: ( state, { payload } ) => {
            state.activeArea = payload;
        },

        onDeleteArea: ( state, {payload} ) => {
            state.areas.splice(payload,1);
        },
        onLoadAreas: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            state.areas = payload;
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
        onLoadArea: (state, { payload }) => {
            state.activeArea = payload;
        },
        
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewArea,
    onDeleteArea,
    onLoadAreas,
    onUpdateArea,
    onLoadArea,
    onIsEditing,
} = areaSlice.actions;