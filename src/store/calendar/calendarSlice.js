import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';
// const tempEvent =   {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños del Jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Fernando'
//     }
// };


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        reservas: [
            // tempEvent
        ],
        activeRes: null,
        isEditing: false
    },
    reducers: {
        onSetActiveRes: ( state, { payload }) => {
            state.activeRes = payload;
        },
        onAddNewEvent: ( state, { payload }) => {
            state.reservas.push( payload );
            state.activeRes = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.reservas = state.reservas.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
        },

        onDeleteRes: ( state, {payload} ) => {
            state.reservas.splice(payload,1);
        },
        
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.reservas = payload;
            state.reservas = payload;
        },

        onIsEditing: (state, { payload }) => {
            state.isEditing = payload;
        },
        // onLogoutCalendar: ( state ) => {
        //     // state.isLoadingEvents = true,
        //     state.reservas      = []
        //     state.activeRes = null
        // }
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteRes,
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveRes,
    onUpdateEvent,
    onIsEditing
} = calendarSlice.actions;