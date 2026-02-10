const useRemoteApi = true; // SI ES TRUE ES PRODUCCIÓN, SI ES FALSE ES DESARROLLO

let API_URL = '';

if (useRemoteApi) {
    API_URL = 'https://uteq-connect-server-production.up.railway.app/api';
} else {
    API_URL = 'http://192.168.100.96:3000/api';
}

export { API_URL };
