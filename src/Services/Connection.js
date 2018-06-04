import axios from 'axios';

const port = 8080;

const request = axios.create({
  baseURL: 'http://'+window.location.hostname+':'+port
});

export const ping = () => (
  request.get('/ping', {})
);