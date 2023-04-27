import biomaApi from "../api/biomaApi"
import {useDispatch, useSelector} from 'react-redux'
import { onAddNewUser, onLoadUsers, onUpdateUser, onIsEditing, onLoadUser, onDeleteUser} from "../store/users/userSlice";
import { createArrayUsuarios } from "../helpers/createData";

export const useUserStore = () => {

    let usuarios = [];
    const dispatch = useDispatch(); 
    const  {users, isEditing, activeUser}  = useSelector(state => state.user);

    const startLoadingUser = async () => {
        try {
          const { data } = await biomaApi.get('/users');
          const arrayUsuarios = createArrayUsuarios(data.usuarios);
          dispatch( onLoadUsers(arrayUsuarios));
          return arrayUsuarios; 
        } catch (error) {
            console.log(error.response.data); 
        }
    }

    const startSavingUser = async (user) => {
      if(!isEditing){
        try {
          const result = await biomaApi.post('/users', user);
          dispatch( onAddNewUser(user) );
          console.log(result);
        } catch (error) {
            console.log(error.response.data); 
        }
      }else{
        try{
          const result = await biomaApi.put('/users', user);
        //   dispatch( onUpdateUser(user) );
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }

    const startEditingUser = async (user) => {
        try{
          const result = await biomaApi.put('/users', user);
        //   dispatch( onUpdateUser(user) );
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
    } 

    const startDeletingUser = async (user, index) => {
      console.log(user)
      console.log(index)
        try{
          const result = await biomaApi.delete('/users', { data: { user } });
          dispatch(onDeleteUser(index));
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
    } 

    const loadUser = async (user) => {
        dispatch( onLoadUser(user) );
    }


    const changeIsEditing = (value) => {
        dispatch( onIsEditing(value) );
    }


    return {
        startLoadingUser,
        startSavingUser,
        startEditingUser,
        startDeletingUser,
        changeIsEditing,
        loadUser,
        isEditing,
        users,
        activeUser
    }
}