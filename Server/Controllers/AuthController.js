import User from '../Models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config.json';

const generateToken = (data) => (
  jwt.sign(data, config.secret, {
    expiresIn: 86400 * 10 // expires in 10 days
  })
);

export default (app) => {
  
  app.get('/login', (req, res) => {
    const { email, password } = req.query || {};
    if(!email || !password){
      return res.status(400).send({ auth: false, error: "Champs invalides" });
    }
    User.load(email).then(user => {
      if(bcrypt.compareSync(password, user.password)){
        console.log('auth succeed');
        const token = generateToken({ id: user.id });
        res.status(200).send({ auth: true, token: token });
      }else{
        console.log('auth fail');
        res.status(401).send({ auth: false, error: "Echec de l'authentification" });
      }
    }).catch(err => {
      res.status(500).send({ auth: false, error: err.message })
    });
  });
  
  app.post('/register', (req, res) => {
    const { email, password } = req.query || {};
    const hashedPassword = bcrypt.hashSync(password, 8);
  
    User.create({
      email,
      password : hashedPassword
    }).then((user) => {
        const token = generateToken({ id: user.id });
        res.status(200).send({ auth: true, token: token });
    }).catch(err => {
      res.status(500).send(err.message)
    });   
  });
  
}