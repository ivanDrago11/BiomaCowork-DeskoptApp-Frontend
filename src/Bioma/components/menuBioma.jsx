
import { FaUsers, FaChalkboardTeacher, FaSearch  } from 'react-icons/fa'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { AiOutlineCloseCircle, AiTwotoneTool } from 'react-icons/ai'
import { MdOutlineQrCodeScanner } from 'react-icons/md'

import '../styles/MenuBioma.css'
import { Link } from 'react-router-dom'
import { useUiStore } from '../../hooks/useUiStore'
import { useLoginStore } from '../../hooks/useLoginStore'
import { useEffect } from 'react'

export const MenuBioma = () => {

  const { changePage, page } = useUiStore();
  const { stopLogin } = useLoginStore();
  const style = { display: "block", width: "100%", background: "none" }

  return (

    <div className="menu">
        <div><Link to="/users"    onClick={() => changePage('users')}  ><FaUsers  style={ style } className='icon' size={35}/>Usuarios</Link></div>
        <div><Link to="/areas"    onClick={() => changePage('areas')}  ><FaChalkboardTeacher style={ style } className='icon'    size={35} /> Áreas         </Link></div>
        <div><Link to="/reservas" onClick={() => changePage('reservas')}  > <BsFillCalendarDateFill style={ style } className='icon' size={35} /> Reservas      </Link></div>
        <div><Link to="/lectorQR" onClick={() => changePage('lectorQR')}  > <MdOutlineQrCodeScanner style={ style } className='icon' size={35} /> Lector QR </Link></div>
        <div><Link to='/login'    onClick={() => stopLogin()}  > <AiOutlineCloseCircle style={ style }   size={40} /> Cerrar Sesión </Link></div>       
    </div>
  )
}
