import { StyledTextField } from './StyledTextField';
import { AddUserModal } from './AddUserModal';
import '../styles/TableButtons.css'

export const TableButtons = () => {

  return (
      <div className="tableButtons">            
          <StyledTextField/>
          <AddUserModal/>
      </div>
  )
}


