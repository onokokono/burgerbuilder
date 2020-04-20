import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-8b7ca.firebaseio.com/'
});

export default instance;