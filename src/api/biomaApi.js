import axios from 'axios';
// import axi from './.env'
// import { getEnvVariables } from '../helpers/getEnvVariables';
// require('dotenv').config()

// const { BIOMA_API_URL } = getEnvVariables();
// console.log('Hola ' + BIOMA_API_URL);



const biomaApi = axios.create({
    baseURL: 'http://localhost:4000/api'
});

// Todo: configurar interceptores
biomaApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default biomaApi;


