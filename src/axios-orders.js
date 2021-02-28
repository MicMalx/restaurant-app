import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://restaurant-app-70e75-default-rtdb.firebaseio.com/'
});

export default instance;