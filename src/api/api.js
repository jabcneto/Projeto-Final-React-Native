import axios from 'axios';

const api = axios.create({
  baseURL: 'http://residencia-ecommerce.us-east-1.elasticbeanstalk.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
