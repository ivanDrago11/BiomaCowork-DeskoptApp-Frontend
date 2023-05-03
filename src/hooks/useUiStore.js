import { useDispatch, useSelector } from 'react-redux';
import {onOpenDateModal, 
        onCloseDateModal, 
        onCloseUserModal, 
        onOpenUserModal, 
        onOpenAreaModal, 
        onCloseAreaModal, 
        onOpenResModal, 
        onCloseResModal, 
        onChangePage, 
        onChangeDataUI,  } from '../store/ui/uiSlice';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {isDateModalOpen, isUserModalOpen, isAreaModalOpen, isResModalOpen, page, dataUI } = useSelector( state => state.ui );

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
    const openResModal = () => {
        dispatch( onOpenResModal() )
    }

    const closeResModal = () => {
        dispatch( onCloseResModal() )
    }

    const toggleReservaModal = () => {
        (isUserModalOpen)
            ? openResModal()
            : closeResModal();
    }

    const changePage = (newPage) => {
        dispatch( onChangePage(newPage));
        // console.log(newPage);
    }

    const changeDataUI = (data) => {
        dispatch( onChangeDataUI(data));
    }




    return {
        //* Propiedades
        isDateModalOpen,
        isUserModalOpen,
        isResModalOpen,
        isAreaModalOpen,
        dataUI,
        //* Métodos
        openDateModal,
        closeDateModal,
        closeUserModal,
        openUserModal,
        closeAreaModal,
        openAreaModal,
        closeResModal,
        openResModal,
        toggleUserModal,
        changePage,
        changeDataUI,
        page
    }

}