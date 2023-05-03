
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
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import '../styles/AddUserModal.css'
import MaterialSelect from './MaterialSelect';
import ImageUploader from './UploaderInput';
import {boxStyle, ModalTextField} from '../styles/AddUserModalStyles';

import { useAreaStore } from '../../hooks/useAreaStore';
import { useUiStore } from '../../hooks/useUiStore';


export function AddAreaModal() {
  const {areas,startSavingArea,startLoadingAreas, changeIsEditing, isEditing, activeArea} = useAreaStore();
  const { isAreaModalOpen, closeAreaModal, openAreaModal } = useUiStore();
  const onCloseModal = () => {
    closeAreaModal();
  }
  const onOpenModal = () => {
    setFormValues({
      name: '',
      description: '',
      amenities: [],
      pricePerHour: '',
      capacity: '',
      image: ''
    });
    changeIsEditing(false);
    openAreaModal();
  }

  const [formValues, setFormValues] = useState({
      name: '',
      description: '',
      amenities: [],
      pricePerHour: '',
      capacity: '',
      image: ''
  });

  const onSubmit = async( event ) => {
    event.preventDefault();
    // setFormSubmitted(true);
    const editArea =  formValues;
    const areaId = activeArea.id;
    const area = {...editArea,id: areaId};
    console.log(area) 
    await startSavingArea( area );
    await startLoadingAreas();
    onCloseModal();
    // closeDateModal();
    // setFormSubmitted(false);
}

useEffect(() => {
  if ( areas !== null ) {
      setFormValues({ ...areas });
  }    
  if(isEditing){
      setFormValues({
        name: activeArea.name,
        description: activeArea.description,
        amenities: activeArea.amenities,
        pricePerHour: activeArea.pricePerHour,
        capacity: activeArea.capacity,
        image: activeArea.image,
      });
  }
  // console.log("Se renderizo")
},[activeArea, isEditing])

const onInputChanged = ({ target }) => {
  setFormValues({
      ...formValues,
      [target.name]: target.value
  });

}

  return (
    <>
      <Button onClick={onOpenModal} variant='outlined' className='addUser'>AÑADIR AREA</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isAreaModalOpen}
        onClose={onCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isAreaModalOpen}>
          <Box sx={boxStyle}>
              <Typography sx={{background: 'white', color: 'green', p: "2px 50px", borderRadius: 1, border: "green solid 3px" }} id="transition-modal-title" variant="h6" component="h2">
                   {isEditing 
                      ? 'Editar Area'
                      : 'Registrar Area'
                   }
              </Typography>
            <form onSubmit={onSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <HomeWorkIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField id="input-with-sx" label="Nombre del Area" value={formValues.name || ''} 
                  variant="standard" onChange={ onInputChanged } name='name' required />
                  
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                  <DescriptionIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField
                      id="outlined-multiline-static"
                      label="Descripción"
                      multiline
                      rows={2}
                      defaultValue=""
                      value={formValues.description}
                      name='description'
                      onChange={ onInputChanged }
                      required
          
                  />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <CoffeeIcon sx={{ color: 'green', mr: 0, my: 0.5 }} />
                  {/* <ModalTextField id="input-with-sx" label="Amenidades" variant="standard" value={formValues.telefono || ''} onChange={ onInputChanged } name='telefono'/> */}
                   <MaterialSelect label='Amenidades' values={formValues.amenities || []} form={{formValues,setFormValues}} required/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 0 }}>
                  <AttachMoneyIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField required id="input-with-sx" label="Precio por hora" type='number' variant="standard" value={formValues.pricePerHour || ''} onChange={ onInputChanged } name='pricePerHour'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2 }}>
                  <PeopleIcon sx={{ color: 'green', mr: 1, my: 0.5 }} />
                  <ModalTextField required id="input-with-sx" label="Capacidad" variant="standard" type='number' value={formValues.capacity || ''} onChange={ onInputChanged } name='capacity'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 4 }}>

                  <ImageUploader form={{formValues,setFormValues}}/>
              
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