
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isUserModalOpen: false,
        isAreaModalOpen: false,
        isResModalOpen: false,
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
        onOpenResModal: ( state ) => {
            state.isResModalOpen = true;
        },
        onCloseResModal: ( state ) => {
            state.isResModalOpen = false;
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
    onOpenResModal, 
    onCloseResModal, 
    onChangePage, 
    onChangeDataUI } = uiSlice.actions;

