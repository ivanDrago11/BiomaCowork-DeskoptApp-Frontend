import '../styles/Estructura.css'
import { BiomaLogo, MenuBioma, CalendarPage } from '..' 
import { TableButtonsReservas } from '../components/TableButtonsReservas';

export const Reservas = () => {

  return (
      <div className="container">
          <BiomaLogo/>
          <MenuBioma/>
          <TableButtonsReservas/>
          <CalendarPage/>
          

      </div>
  );
};
