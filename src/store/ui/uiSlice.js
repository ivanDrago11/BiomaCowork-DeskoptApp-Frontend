
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isUserModalOpen: false,
        isAreaModalOpen: false,
        isReservaModalOpen: false,
        page: 'users',
        dataUI: []
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },
        onOpenUserModal: ( state ) => {
            state.isUserModalOpen = true;
        },
        onCloseUserModal: ( state ) => {
            state.isUserModalOpen = false;
        },
        onOpenAreaModal: ( state ) => {
            state.isAreaModalOpen = true;
        },
        onCloseAreaModal: ( state ) => {
            state.isAreaModalOpen = false;
        },
        onOpenReservaModal: ( state ) => {
            state.isReservaModalOpen = true;
        },
        onCloseReservaModal: ( state ) => {
            state.isReservaModalOpen = false;
        },
        onChangePage: (state, {payload}) =>{
            state.page = payload;
        },
        onChangeDataUI: (state, {payload}) =>{
            state.dataUI = payload;
        },
        
    }
});


// Action creators are generated for each case reducer function
export const { 
    onOpenDateModal,
    onCloseDateModal,
    onOpenAreaModal, 
    onCloseAreaModal, 
    onOpenUserModal, 
    onCloseUserModal, 
    onOpenReservaModal, 
    onCloseReservaModal, 
    onChangePage, 
    onChangeDataUI } = uiSlice.actions;

