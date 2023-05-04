import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { uiSlice } from './ui/uiSlice';
import { areaSlice } from './areas/areaSlice';
import { calendarSlice } from './calendar/calendarSlice';
import { loginSlice } from './auth/loginSlice';


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ui:   uiSlice.reducer,
        area: areaSlice.reducer,
        calendar: calendarSlice.reducer,
        login: loginSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
