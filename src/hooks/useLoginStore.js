import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import  biomaApi  from '../api/biomaApi';
import { onActiveLogin, onAuthLogin } from '../store/auth/loginSlice';


export const useLoginStore = () => {
  
    const dispatch = useDispatch();
    const { isAuth } = useSelector( state => state.login );
    // const { user } = useSelector( state => state.auth );

    const setActiveLogin = ( login ) => {
        dispatch( onActiveLogin( login ) )
    }

    const startLogin = async( login ) => {
        try {
          
            const { data } = await biomaApi.post('/login', login );
            console.log(data.user);
            dispatch(onAuthLogin(true));
            dispatch(onActiveLogin(data.user));
            return data.user;
        } catch (error) {
            console.log(error.response.data);
            Swal.fire('Error al iniciar sesión', error.response.data.msg, 'error');
        }
    }

    const stopLogin = () => {
        dispatch(onActiveLogin({}));
        dispatch(onAuthLogin(false));
    }

       
        
    

    // const startDeletingReserva = async (reserva, index) => {
    //     console.log(reserva)
    //     console.log(index)
    //       try{
    //         const result = await biomaApi.delete('/reservas', { data: { reserva } });
    //         dispatch(onDeleteRes(index));
    //         console.log(result);
    //       } catch (error) {
    //         console.log(error.response.data);
    //       }
    //   } 


    // const startLoadingReservas = async() => {
    //     try {
            
    //         const { data } = await biomaApi.get('/reservas');
    //         console.log(data)
    //         const reservas = convertEventsToDateEvents( data.reservas );
    //         console.log(reservas)
    //         dispatch( onLoadEvents( reservas ) );


    //     } catch (error) {
    //       console.log('Error cargando eventos');
    //       console.log(error)
    //     }
    // }

    // const changeIsEditing = (value) => {
    //     dispatch( onIsEditing(value) );
    // }



    return {
        //* Propiedades
        isAuth,

        //* Métodos
        startLogin,
        stopLogin
    }

}