import { useDispatch, useSelector } from 'react-redux';
import {onOpenDateModal, 
        onCloseDateModal, 
        onCloseUserModal, 
        onOpenUserModal, 
        onOpenAreaModal, 
        onCloseAreaModal, 
        onOpenReservaModal, 
        onCloseReservaModal, 
        onChangePage, 
        onChangeDataUI,  } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen, isUserModalOpen, isAreaModalOpen, isReservaModalOpen, page, dataUI } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }
    const openUserModal = () => {
        dispatch( onOpenUserModal() )
    }

    const closeUserModal = () => {
        dispatch( onCloseUserModal() )
    }

    const toggleUserModal = () => {
        (isUserModalOpen)
            ? openUserModal()
            : closeUserModal();
    }
    const openAreaModal = () => {
        dispatch( onOpenAreaModal() )
    }

    const closeAreaModal = () => {
        dispatch( onCloseAreaModal() )
    }

    const toggleAreaModal = () => {
        (isUserModalOpen)
            ? openAreaModal()
            : closeAreaModal();
    }
    const openReservaModal = () => {
        dispatch( onOpenReservaModal() )
    }

    const closeReservaModal = () => {
        dispatch( onCloseReservaModal() )
    }

    const toggleReservaModal = () => {
        (isUserModalOpen)
            ? openReservaModal()
            : closeReservaModal();
    }

    const changePage = (newPage) => {
        dispatch( onChangePage(newPage));
        console.log(newPage);
    }

    const changeDataUI = (data) => {
        dispatch( onChangeDataUI(data));
    }




    return {
        //* Propiedades
        isDateModalOpen,
        isUserModalOpen,
        isReservaModalOpen,
        isAreaModalOpen,
        dataUI,
        //* Métodos
        openDateModal,
        closeDateModal,
        closeUserModal,
        openUserModal,
        closeAreaModal,
        openAreaModal,
        closeReservaModal,
        openReservaModal,
        toggleUserModal,
        changePage,
        changeDataUI,
        page
    }

}