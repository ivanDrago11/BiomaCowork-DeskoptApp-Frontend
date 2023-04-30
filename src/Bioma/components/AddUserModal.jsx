
import * as React from 'react';
import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HttpsIcon from '@mui/icons-material/Https';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../styles/AddUserModal.css'
import {boxStyle, ModalTextField} from '../styles/AddUserModalStyles';

import { useUserStore } from '../../hooks/useUserStore';
import { useUiStore } from '../../hooks/useUiStore';

export function AddUserModal(props) {
  const {buttonLabel} = props;
  const {users,startSavingUser,startLoadingUser, changeIsEditing, isEditing, activeUser} = useUserStore();
  const { isUserModalOpen, closeUserModal, openUserModal } = useUiStore();


  const onCloseModal = () => {
    closeUserModal();
  }
  const onOpenModal = () => {
    setFormValues({
      name: '',
      email: '',
      password: '',
      telefono: '',
      direccion: ''
    });
    changeIsEditing(false);
    openUserModal();
  }

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    telefono: '',
    direccion:''
  });

  const onSubmit = async( event ) => {
    event.preventDefault();
    // setFormSubmitted(true);
    const editUser =  formValues;
    const userId = activeUser.id;
    const usuario = {...editUser,id: userId};
    console.log(usuario) 
    await startSavingUser( usuario );
    await startLoadingUser();
    onCloseModal();
    // closeDateModal();
    // setFormSubmitted(false);
}

useEffect(() => {
  if ( users !== null ) {
      setFormValues({ ...users });
  }    
  if(isEditing){
      setFormValues({
        name: activeUser.name,
        email: activeUser.email,
        password: activeUser.password,
        telefono: activeUser.telefono,
        direccion: activeUser.direccion
      });
  }
  console.log("Se renderizo")
},[activeUser, isEditing])

const onInputChanged = ({ target }) => {
  setFormValues({
      ...formValues,
      [target.name]: target.value
  })
}

  return (
    <>
      <Button onClick={onOpenModal} variant='outlined' className='addUser'>AÑADIR USUARIO</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isUserModalOpen}
        onClose={onCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isUserModalOpen}>
          <Box sx={boxStyle}>
              <Typography sx={{background: 'white', color: 'green', p: "2px 50px", borderRadius: 1, border: "green solid 3px" }} id="transition-modal-title" variant="h6" component="h2">
                   {isEditing 
                      ? 'Editar Usuario'
                      : 'Registrar Usuario'
                   }
              </Typography>
            <form onSubmit={onSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <AccountCircle sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Nombre Completo" value={formValues.name || ''} 
                  variant="standard" onChange={ onInputChanged } name='name'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <HomeIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Dirección" variant="standard" value={formValues.direccion || ''} onChange={ onInputChanged } name='direccion'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <PhoneIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Telefono" variant="standard" value={formValues.telefono || ''} onChange={ onInputChanged } name='telefono'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <AlternateEmailIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Correo Electronico" variant="standard" value={formValues.email || ''} onChange={ onInputChanged } name='email'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <HttpsIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Contraseña" variant="standard" value={formValues.password || ''} onChange={ onInputChanged } name='password'/>
              </Box>
              <Box sx={{mt: 4, width: 450}}>
              <FormControl>
                <Box sx={{display: "flex", alignItems: "center"}}>
                  <SupervisedUserCircleIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <FormLabel sx={{fontSize: 17, mt:.5}} color='success' id="demo-row-radio-buttons-group-label">Tipo de Usuario</FormLabel>
                  </Box>
              <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="Administrador" control={<Radio color='success' />} label="Administrador" />
                  <FormControlLabel value="Cliente" control={<Radio color='success' />} label="Cliente" />
                  
                </RadioGroup>
                </FormControl>
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