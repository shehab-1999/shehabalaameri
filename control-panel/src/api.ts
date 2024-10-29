import axios from "axios";
const url='http://localhost:8081/api';
export const apifetch=axios.create({
    baseURL:url
});