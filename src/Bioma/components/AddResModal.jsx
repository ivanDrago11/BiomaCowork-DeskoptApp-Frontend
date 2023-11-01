
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
import QRCode from "react-qr-code";
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
  const [QRModal, setQRModal] = useState(false);
  const [areaObject, setAreaObject] = useState({});

  const onCloseQRModal = () => {
    setQRModal(false);
  }
  const onOpenQRModal = () => {
    setQRModal(true);
  }
  const onCloseModal = () => {
    closeResModal();
  }
  const onOpenModal = () => {
    setFormValues({
      area: null,
      usuario: '',
      start: dayjs(),
      end: dayjs().add(1,'hour'),
      price: '',
      codigoQR: ''
    });
    changeIsEditing(false);
    openResModal();
  }

  const [formValues, setFormValues] = useState({
    area: null,
    usuario: '',
    start: '',
    end: '',
    price: '',
    codigoQR: ''
  });




  const onSubmit = async( event ) => {
    event.preventDefault();
    const area = areas.find(element => element.name == formValues.area);
    const reserva =  {...formValues, price: area.pricePerHour};
    await startSavingReserva( reserva );
    await startLoadingReservas();
    onCloseModal();
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
        codigoQR: activeRes.codigoQR,
        id: activeRes.id,
      });
  }
  if(activeRes != null){
    const area = areas.find(element => element.name == activeRes.area);
    setAreaObject(area);
  }
},[activeRes, isEditing])

const onInputChanged = ({ target }) => {
  setFormValues({
      ...formValues,
      [target.name]: target.value
  });
}

const onDateChanged = ( event, changing ) => {
  // const {price, codigoQR} = reservaProcess();
    setFormValues({
        ...formValues,
        [changing]: event
        // ,price,codigoQR
        
    });
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
                  <FormControl sx={{width: '500px'}}>
                    <InputLabel id="demo-simple-select-label">Area</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formValues.area || ''}
                      label="Area"
                      onChange={onInputChanged}
                      name='area'
                      required
                    >
                      {areas.map((value) => 
                         <MenuItem key={value.name} value={value.name}>{value.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
              </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 5 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Usuario</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formValues.usuario || ''}
                      label="Usuario"
                      onChange={onInputChanged}
                      name='usuario'
                      required
                    >
                      {users.map((value) => 
                         <MenuItem key={value.name} value={value.name}>{value.name}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
              </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 4 }}>
                     <Typography variant='h6'>Fecha y Hora INICIO</Typography>
                  </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <EventIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <MobileDateTimePicker 
                    value={dayjs(formValues.start)} 
                    minutesStep={15} 
                    onChange={ (event) => onDateChanged(event, 'start') } 
                    minDate={dayjs()}
                    maxDate={dayjs().add(1,'month')}
                    minTime={dayjs().hour(8)}
                    maxTime={dayjs().hour(20)}
                    
                    
                    />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, ml: 4 }}>
                   <Typography variant='h6'>Hora FIN</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <EventIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <MobileDateTimePicker 
                    openTo="hours" 
                    value={dayjs(formValues.end)} 
                    minutesStep={15} 
                    onChange={ (event) => onDateChanged(event, 'end')}  
                    minTime={dayjs(formValues.start)}
                    maxTime={dayjs().hour(21)}
                    minDate={dayjs(formValues.start)}
                    maxDate={dayjs(formValues.start)}
                    
                  
           
                    />
                </Box>
              </LocalizationProvider>
              {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
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
              </Box> */}
              <Box sx={{display: "flex", flexDirection: 'row', justifyContent: "space-evenly", mt: 4}} className='saveUser'>
              <Button  type='submit' variant='outlined' >Guardar</Button>
              {isEditing 
               ? <>
                   <Button  variant="outlined" type='button' className='deleteUser' onClick={onDeleteButton}>Eliminar</Button> 
                   <Button  variant="outlined" type='button' className='reservaUser' onClick={onOpenQRModal}>Reserva</Button>
                 </>               
               : null
              }
              </Box>

            </form>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={QRModal}
        onClose={onCloseQRModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={QRModal}>
          <Box sx={boxStyle}>
              <Typography sx={{background: 'white', color: 'green', p: "2px 50px", borderRadius: 1, border: "green solid 3px", mb: 3 }} id="transition-modal-title" variant="h6" component="h2">
                   Reservación
              </Typography>
              {areaObject != null && activeRes != null 
              ? <>
                  <img src={areaObject.image} alt="areaImage" style={{width: 300, height: 300, borderRadius: 20}} />
                  <Typography variant='h6' fontSize={30}>
                    Precio: ${formValues.price}
                  </Typography>
                  <Typography variant='h6' fontSize={25}>
                    Fecha: {dayjs(formValues.start).format('DD/MM/YYYY').toString()}
                  </Typography>
                  <Typography variant='h6' fontSize={25}>
                    De: {dayjs(formValues.start).format('HH:mm').toString()} a {dayjs(formValues.end).format('HH:mm').toString()}
                  </Typography>
                
                  
                  <QRCode value="hey" size={200}/> 
                </>
              : ''
              }
           
          </Box>
        </Fade>
      </Modal>
      </>
  );
}