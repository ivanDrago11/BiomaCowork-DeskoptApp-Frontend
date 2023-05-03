
import * as React from 'react';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../styles/AddUserModal.css'
import {boxStyle, ModalTextField} from '../styles/AddUserModalStyles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';
import { useAreaStore } from '../../hooks/useAreaStore';
import { useUserStore } from '../../hooks';

export function AddResModal() {
  const {reservas,startSavingReserva,startLoadingReservas, startDeletingReserva, changeIsEditing, isEditing, activeRes} = useCalendarStore();
  const { isResModalOpen, closeResModal, openResModal } = useUiStore();
  const { areas } = useAreaStore();
  const { users } = useUserStore();
  const onCloseModal = () => {
    closeResModal();
  }
  const onOpenModal = () => {
    setFormValues({
      name: '',
      usuario: '',
      start: '',
      end: '',
      price: '',
    });
    changeIsEditing(false);
    openResModal();
  }

  const [formValues, setFormValues] = useState({
    area: '',
    usuario: '',
    start: '',
    end: '',
    price: '',
  });

  const onSubmit = async( event ) => {
    event.preventDefault();
    // setFormSubmitted(true);
    const reserva =  formValues;
    // const reservaId = activeRes.id;
    // const reserva = {...editReserva,id: reservaId};
    // console.log(reserva) 
    await startSavingReserva( reserva );
    await startLoadingReservas();
    onCloseModal();
    // closeDateModal();
    // setFormSubmitted(false);
}

const onDeleteButton = async () => {
  const reserva = reservas.find((element) => element.id === activeRes.id);
  const reservaIndex = reservas.findIndex((element) => element.id === activeRes.id);
  const reservaDelete = {...reserva}
  await startDeletingReserva(reservaDelete,reservaIndex); 
  onCloseModal();
}

useEffect(() => {
  if ( reservas !== null ) {
      setFormValues({ ...reservas });
  }    
  if(isEditing){
      setFormValues({
        area: activeRes.area,
        usuario: activeRes.usuario,
        start: activeRes.start,
        end: activeRes.end,
        price: activeRes.price,
        id: activeRes.id
      });
  }
  // console.log("Se renderizo")
},[activeRes, isEditing])

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

const [age, setAge] = React.useState('');

const handleChange = (event) => {
  setAge(event.target.value);
};

  return (
    <>
      <Button onClick={onOpenModal} variant='outlined' className='addUser'>AÑADIR RESERVA</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isResModalOpen}
        onClose={onCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isResModalOpen}>
          <Box sx={boxStyle}>
              <Typography sx={{background: 'white', color: 'green', p: "2px 50px", borderRadius: 1, border: "green solid 3px" }} id="transition-modal-title" variant="h6" component="h2">
                   {isEditing 
                      ? 'Editar Reserva'
                      : 'Registrar Reserva'
                   }
              </Typography>
            <form onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  {/* <ModalTextField id="input-with-sx" label="Nombre del Area" variant="standard" value={formValues.area || ''} onChange={ onInputChanged } name='area'/> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formValues.area || ''}
                      label="Area"
                      onChange={onInputChanged}
                      name='area'
                    >
                      {areas.map((value) => 
                         <MenuItem key={value.name} value={value.name}>{value.name}</MenuItem>
                      )}
                      {/* <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
              </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  {/* <ModalTextField id="input-with-sx" label="Nombre del Area" variant="standard" value={formValues.area || ''} onChange={ onInputChanged } name='area'/> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formValues.usuario || ''}
                      label="Usuario"
                      onChange={onInputChanged}
                      name='usuario'
                    >
                      {users.map((value) => 
                         <MenuItem key={value.name} value={value.name}>{value.name}</MenuItem>
                      )}
                      {/* <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                  </FormControl>
              </Box>
            
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
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
              </Box>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                  <EventIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')}  />
              </Box>
              </LocalizationProvider> */}
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
              <Box sx={{display: "flex", flexDirection: 'row', justifyContent: "space-evenly", mt: 4}} className='saveUser'>
              <Button  type='submit' variant='outlined' >Guardar</Button>
              {isEditing 
               ? <Button  variant="outlined" type='button' className='deleteUser' onClick={onDeleteButton}>Eliminar</Button>
               : null
              }
              </Box>
              

            </form>
          </Box>
        </Fade>
      </Modal>
      </>
  );
}