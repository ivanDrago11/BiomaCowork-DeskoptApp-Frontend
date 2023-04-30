import biomaApi from "../api/biomaApi"
import {useDispatch, useSelector} from 'react-redux'
import { onAddNewArea, onLoadAreas, onUpdateArea, onIsEditing, onLoadArea, onDeleteArea} from "../store/areas/areaSlice";
import { createArrayAreas } from "../helpers/createData";

export const useAreaStore = () => {

    let areasArray = [];
    const dispatch = useDispatch(); 
    const  {areas, isEditing, activeArea}  = useSelector(state => state.area);

    const startLoadingAreas = async () => {
        try {
          const { data } = await biomaApi.get('/areas');
          const arrayAreas = createArrayAreas(data.areas);
          dispatch( onLoadAreas(arrayAreas));
          return arrayAreas; 
        } catch (error) {
            console.log(error.response.data); 
        }
    }

    const startSavingArea = async (area) => {
      if(!isEditing){
        try {
          const result = await biomaApi.post('/areas', area);
          dispatch( onAddNewArea(area) );
          console.log(result);
        } catch (error) {
            console.log(error.response.data); 
        }
      }else{
        try{
          const result = await biomaApi.put('/areas', area);
        //   dispatch( onUpdateUser(user) );
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    }

    const startEditingArea = async (area) => {
        try{
          const result = await biomaApi.put('/areas', area);
        //   dispatch( onUpdateUser(user) );
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
    } 

    const startDeletingArea = async (area, index) => {
      console.log(area)
      console.log(index)
        try{
          const result = await biomaApi.delete('/areas', { data: { area } });
          dispatch(onDeleteArea(index));
          console.log(result);
        } catch (error) {
          console.log(error.response.data);
        }
    } 

    const loadArea = async (area) => {
        dispatch( onLoadArea(area) );
    }


    const changeIsEditing = (value) => {
        dispatch( onIsEditing(value) );
    }


    return {
        startLoadingAreas,
        startSavingArea,
        startEditingArea,
        startDeletingArea,
        changeIsEditing,
        loadArea,
        isEditing,
        areas,
        activeArea
    }
}