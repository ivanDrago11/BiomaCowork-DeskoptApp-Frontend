import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import  biomaApi  from '../api/biomaApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteRes, onLoadEvents, onSetActiveRes, onIsEditing } from '../store/calendar/calendarSlice';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { reservas, activeRes, isEditing } = useSelector( state => state.calendar );
    // const { user } = useSelector( state => state.auth );

    const setActiveRes = ( calendarEvent ) => {
        dispatch( onSetActiveRes( calendarEvent ) )
    }

    const startSavingReserva = async( reserva ) => {
        if(!isEditing){
        try {
            // if( calendarEvent.id ) {
            //     // Actualizando
            //     await biomaApi.put(`/reservas/${ calendarEvent.id }`, calendarEvent );
            //     // dispatch( onUpdateEvent({ ...calendarEvent, user }) );
            //     return;
            // } 
    
            // Creando
            const { data } = await biomaApi.post('/reservas', reserva );
            // dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }}else{
            console.log('editando')
            try{
              const result = await biomaApi.put('/reservas', reserva);
            //   dispatch( onUpdateUser(user) );
              console.log(result);
            } catch (error) {
              console.log(error.response.data);
            }
          }

       
        
    }

    const startDeletingReserva = async (reserva, index) => {
        console.log(reserva)
        console.log(index)
          try{
            const result = await biomaApi.delete('/reservas', { data: { reserva } });
            dispatch(onDeleteRes(index));
            console.log(result);
          } catch (error) {
            console.log(error.response.data);
          }
      } 


    const startLoadingReservas = async() => {
        try {
            
            const { data } = await biomaApi.get('/reservas');
            console.log(data)
            const reservas = convertEventsToDateEvents( data.reservas );
            console.log(reservas)
            dispatch( onLoadEvents( reservas ) );


        } catch (error) {
          console.log('Error cargando eventos');
          console.log(error)
        }
    }

    const changeIsEditing = (value) => {
        dispatch( onIsEditing(value) );
    }
    


    return {
        //* Propiedades
        activeRes,
        reservas,
        isEditing,
        hasEventSelected: !!activeRes,

        //* Métodos
        setActiveRes,
        startDeletingReserva,
        startLoadingReservas,
        startSavingReserva,
        changeIsEditing
    }
}
