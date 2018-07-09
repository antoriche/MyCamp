import jwt from 'jsonwebtoken';
import config from '../config.json';


export const generateToken = (data) => (
  jwt.sign(data, config.secret, {
    expiresIn: 86400 * 10 // expires in 10 days
  })
);

export const getTokenData = (token) => (
  jwt.verify(token, config.secret) 
);