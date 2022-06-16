import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://portfolio-email-e7c9e.firebaseio.com/'
});

export default instance;