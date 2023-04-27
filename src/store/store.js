import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './users/userSlice';
import { uiSlice } from './ui/uiSlice';


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ui:   uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
