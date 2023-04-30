
import * as React from 'react';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PeopleIcon from '@mui/icons-material/People';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../styles/AddUserModal.css'
import MaterialSelect from './MaterialSelect';
import ImageUploader from './UploaderInput';
import {boxStyle, ModalTextField} from '../styles/AddUserModalStyles';

import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';


export function AddResModal() {
  const {reservas,startSavingReserva,startLoadingReservas, changeIsEditing, isEditing, activeReserva} = useCalendarStore();
  const { isReservaModalOpen, closeReservaModal, openReservaModal } = useUiStore();

  const onCloseModal = () => {
    closeReservaModal();
  }
  const onOpenModal = () => {
    setFormValues({
      name: '',
      usuario: '',
      start: '',
      end: '',
      price: '',
    });
    // changeIsEditing(false);
    openReservaModal();
  }

  const [formValues, setFormValues] = useState({
    name: '',
    usuario: '',
    start: '',
    end: '',
    price: '',
  });

  const onSubmit = async( event ) => {
    event.preventDefault();
    // setFormSubmitted(true);
    const reserva =  formValues;
    // const reservaId = activeReserva.id;
    // const reserva = {...editReserva,id: reservaId};
    console.log(reserva) 
    await startSavingReserva( reserva );
    await startLoadingReservas();
    onCloseModal();
    // closeDateModal();
    // setFormSubmitted(false);
}

useEffect(() => {
  if ( reservas !== null ) {
      setFormValues({ ...reservas });
  }    
  if(isEditing){
      setFormValues({
        area: activeReserva.area,
        usuario: activeReserva.usuario,
        start: activeReserva.start,
        end: activeReserva.end,
        price: activeReserva.price,
      });
  }
  console.log("Se renderizo")
},[activeReserva, isEditing])

const onInputChanged = ({ target }) => {
  setFormValues({
      ...formValues,
      [target.name]: target.value
  })
}

const onDateChanged = ( event, changing ) => {
    setFormValues({
        ...formValues,
        [changing]: event
    })
}

  return (
    <>
      <Button onClick={onOpenModal} variant='outlined' className='addUser'>AÑADIR RESERVA</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isReservaModalOpen}
        onClose={onCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isReservaModalOpen}>
          <Box sx={boxStyle}>
              <Typography sx={{background: 'white', color: 'green', p: "2px 50px", borderRadius: 1, border: "green solid 3px" }} id="transition-modal-title" variant="h6" component="h2">
                   {isEditing 
                      ? 'Editar Reserva'
                      : 'Registrar Reserva'
                   }
              </Typography>
            <form onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 0 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Nombre del Area" variant="standard" value={formValues.area || ''} onChange={ onInputChanged } name='area'/>
              </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 0 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Nombre del Usuario" variant="standard" value={formValues.usuario || ''} onChange={ onInputChanged } name='usuario'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 0 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Precio" variant="standard" value={formValues.price || ''} onChange={ onInputChanged } name='price'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 4 }}>
                   <Typography variant='h6'>Fecha y Hora INICIO</Typography>
                </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                  <EventIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <DatePicker 
                    selected={ formValues.start }
                    onChange={ (event) => onDateChanged(event, 'start') }
                    id='datePicker'
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                   />
                  {/* <ModalTextField id="input-with-sx" label="Fecha y Hora Inicio" value={formValues.name || ''} 
                  variant="standard" onChange={ onInputChanged } onClick={() => document.querySelector('#datePicker').click()} name='name' /> */}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 4 }}>
                   <Typography variant='h6'>Fecha y Hora FIN</Typography>
                </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                  <EventIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <DatePicker 
                    minDate={ formValues.start }
                    selected={ formValues.end }
                    onChange={ (event) => onDateChanged(event, 'end') }
                    dateFormat="Pp"
                    showTimeSelect
                    locale="es"
                    timeCaption="Hora"
                />
                  {/* <ModalTextField id="input-with-sx" label="Fecha y Hora Inicio" value={formValues.name || ''} 
                  variant="standard" onChange={ onInputChanged } onClick={() => document.querySelector('#datePicker').click()} name='name' /> */}
              </Box>
                  
                  
            
             
           
             

              <Box sx={{display: "flex", justifyContent: "center"}} className='saveUser'>
              <Button sx={{mt: 4, marginInline: 10}} type='submit' variant='outlined' >Guardar</Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
      </>
  );
}