import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://my-burger-b1965.firebaseio.com/'
})

export default instance;