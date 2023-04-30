

export const changeInformation = (page, setInformationTable,data) => {


    switch (page) {
      case 'users':
        setInformationTable({
          name: 'Usuarios',
          inputLabel: 'Nombre del Usuario',
          buttonLabel: 'AÑADIR USUARIO',
        });
        break;
      case 'areas':
        setInformationTable({
          name: 'Areas',
          inputLabel: 'Nombre del Area',
          buttonLabel: 'AÑADIR AREA'
        });
        break;
      case 'reservas':
        setInformationTable({
            name: 'Reservas',
            inputLabel: 'Id de la reserva',
            buttonLabel: 'AÑADIR RESERVA'
  
          });
        break;
    
      default:
        break;
    }
  }