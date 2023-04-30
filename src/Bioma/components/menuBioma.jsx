
import { FaUsers, FaChalkboardTeacher, FaSearch  } from 'react-icons/fa'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { AiOutlineCloseCircle, AiTwotoneTool } from 'react-icons/ai'
import '../styles/MenuBioma.css'
import { Link } from 'react-router-dom'
import { useUiStore } from '../../hooks/useUiStore'
import { useEffect } from 'react'

export const MenuBioma = () => {

  const { changePage, page } = useUiStore();
  const style = { display: "block", width: "100%", background: "none" }

  return (

    <div className="menu">
        <div><Link to="/users" onClick={() => changePage('users')}  ><FaUsers  style={ style } className='icon' size={35}/>Usuarios</Link></div>
        <div><Link to="/areas" onClick={() => changePage('areas')}  ><FaChalkboardTeacher style={ style } className='icon'    size={35} /> Áreas         </Link></div>
        <div><Link to="/reservas" onClick={() => changePage('reservas')}  > <BsFillCalendarDateFill style={ style } className='icon' size={35} /> Reservas      </Link></div>
        <div><Link to="/pruebas"  > <AiTwotoneTool style={ style }          size={35} /> Configuración </Link></div>
        <div><a href="#"  > <AiOutlineCloseCircle style={ style }   size={40} /> Cerrar Sesión </a></div>       
    </div>
  )
}
