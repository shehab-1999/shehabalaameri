import axios from "axios";

const VITE_API_URL="http://localhost:1337/api"
const VITE_API_TOKEN=" 2f2e7c717721e4feee00d9f3940febb1ec73955e775e07c2ff51a55dafc9c0d8eae62c8febcc05a5e5edace59457ec7a8a55644e9831d471e0dffd9e168e40cb43461149f3b62a1ae435c4213edd731534ce7b075323582189966252d321fe76c554020f5a0ccff32329911dbf5f4fe9ae034a60bf78ce5e92037806de3a4250"
export const fetchApi=axios.create({
    baseURL:VITE_API_URL,
    headers:{
        Authorization:`Bearer ${VITE_API_TOKEN}` }
})