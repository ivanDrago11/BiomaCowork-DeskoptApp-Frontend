
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledTextField = (props) => {
    const {label} = props;
    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: 'green',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
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
      });  

  return (

    <CssTextField label={label} id="custom-css-outlined-input" className='inputSearch' />
  
    )

}
