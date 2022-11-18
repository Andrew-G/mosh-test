import axios from "axios";

const apiAxios = axios.create({
  baseURL: 'https://moshhero.free.beeceptor.com/my/api',
  timeout: 30000,
});

export default apiAxios;
