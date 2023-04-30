import { StyledTextField } from './StyledTextField';
import { AddResModal } from './AddResModal';
import '../styles/TableButtons.css'
import { motion } from 'framer-motion';
import { useUiStore } from '../../hooks/useUiStore';
import { useEffect, useState } from 'react';
import { changeInformation } from '../../helpers/changeInformation';


export const TableButtonsReservas = () => {

  const {page} = useUiStore();
  const [information, setInformation] = useState({});
  
  useEffect(() => {
    changeInformation(page, setInformation);
  },[]);


  return (
      <motion.div 
          className="tableButtons"
          initial={{y: 500}}
          animate={{y: 0}}
          exit={{y: 5, transition: {duration: 0.1}}}
      >            
          <StyledTextField label={information.inputLabel}/>
          <AddResModal/>
      </motion.div>
  )
}


