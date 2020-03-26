import axios from 'axios';

// Default config options
const defaultOptions = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://my-socialy.herokuapp.com'
      : 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' }
};

// Create instance
let http = axios.create(defaultOptions);

// Set the AUTH token for any request
http.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  config.headers['x-auth-token'] = token ? token : '';

  return config;
});

export default http;
