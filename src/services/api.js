import axios from 'axios';

const baseApi = axios.create({
  baseURL: "https://exp.host/--/api/v2/push/",
  headers: {
    "host": "exp.host",
    "accept": "application/json",
    "accept-encoding": "gzip, deflate",
    "content-type": "application/json"
  }
});

export default baseApi;