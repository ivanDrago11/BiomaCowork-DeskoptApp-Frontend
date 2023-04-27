import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


export const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '3px solid green',
    "border-radius": "10px", 
    boxShadow: 24,
    p: 4,
    display:"flex",
    "flex-direction": 'column', 
    "justifyContent":"center",
    "alignItems":"center"
  };


  export const ModalTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '&:hover .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'green',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
    width: 450
  });  

 