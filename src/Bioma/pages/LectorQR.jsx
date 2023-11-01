import '../styles/Estructura.css'
import { BiomaLogo, MenuBioma, CalendarPage } from '..' 
import { TableButtonsReservas } from '../components/TableButtonsReservas';
import { QrReader } from '../components/QrReader';

export const LectorQR = () => {

  return (
      <div className="container">
          <BiomaLogo/>
          <MenuBioma/>
          <div></div>
          {/* <CalendarPage/> */}
          <QrReader/>
      </div>
  );
};
