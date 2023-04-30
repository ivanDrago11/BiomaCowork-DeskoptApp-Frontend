import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import  biomaApi  from '../api/biomaApi';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { reservas, activeEvent } = useSelector( state => state.calendar );
    // const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingReserva = async( reserva ) => {
        
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
        }

       
        
    }

    const startDeletingEvent = async() => {
        // Todo: Llegar al backend
        try {
            await biomaApi.delete(`/reservas/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }


    const startLoadingReservas = async() => {
        try {
            
            const { data } = await biomaApi.get('/reservas');
            const events = convertEventsToDateEvents( data.eventos );
            dispatch( onLoadEvents( events ) );


        } catch (error) {
          console.log('Error cargando eventos');
          console.log(error)
        }
    }
    


    return {
        //* Propiedades
        activeEvent,
        reservas,
        hasEventSelected: !!activeEvent,

        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingReservas,
        startSavingReserva,
    }
}
