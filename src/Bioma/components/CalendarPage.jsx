import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/CalendarPage.css'
import { motion } from 'framer-motion';

import {  CalendarEvent, CalendarModal, FabAddNew, FabDelete} from '..';
// Navbar
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore,  } from '../../hooks';
// useAuthStore


export const CalendarPage = () => {

  // const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { reservas, setActiveEvent, startLoadingReservas } = useCalendarStore();

  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week' );

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    // const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      // backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = ( event ) => {
    console.log('click');
    openDateModal();
  }

  const onSelect = ( event ) => {
    // console.log({ click: event });
    setActiveEvent( event );
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event );
    setLastView( event )
  }


  useEffect(() => {
    startLoadingReservas();
    console.log(reservas);
  }, [])
  

  return (
    <motion.div
    className='calendar'
    initial={{y: 500}}
    animate={{y: 0}}
    exit={{y: 5, transition: {duration: 0.1}}}
    >
      {/* <Navbar /> */}

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ reservas }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        // style={{ height: 'calc( 100vh - 80px )' }}
        // style={{ height: '80%' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />


      {/* <CalendarModal /> */}
      
      <FabAddNew />
      <FabDelete />


    </motion.div>
  )
}
