import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Aire Acondicionado',
  'Cafe',
  'Snacks',
  'Proyector',
  'Pizarron',
  'Impresora',
  'Bocinas',
];

export default function MaterialSelect(props) {
  const {label, values, form} = props;
  const {formValues, setFormValues} = form;
  const [personName, setPersonName] = React.useState([]);
  
  React.useEffect(() => {
    setPersonName(values);
  },[values]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setFormValues({
      ...formValues,
      amenities: typeof value === 'string' ? value.split(',') : value,
    });
    console.log(personName)
    }
  return (
    <div>
      <FormControl sx={{ m: 1, width: 450 }}>
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
       
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}