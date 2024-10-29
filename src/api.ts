import axios, { AxiosHeaders } from "axios";
const url='http://localhost:3000/api';
export const apifetch=axios.create({
    baseURL:url,
   
   
});