import User from '../Models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Services/Authentification'

export default (app) => {
  
  app.get('/login', (req, res) => {
    const { email, password } = req.query || {};
    if(!email || !password){
      return res.status(400).send({ auth: false, error: "Champs invalides" }).end();
    }
    User.loadByEmail(email).then(user => {
      if(user != null && bcrypt.compareSync(password, user.password)){
        console.log('auth succeed');
        const token = generateToken({ user: user.id });
        res.status(200).send({ auth: true, token: token }).end();
      }else{
        console.log('auth fail');
        res.status(401).send({ auth: false, error: "Echec de l'authentification" }).end();
      }
    }).catch(err => {
      res.status(500).send({ auth: false, error: err.message }).end();
    });
  });
  
  app.post('/register', (req, res) => {
    /* const { email, password } = req.query || {};
    const hashedPassword = bcrypt.hashSync(password, 8);
  
    User.create({
      email,
      password : hashedPassword
    }).then((user) => {
        const token = generateToken({ id: user.id });
        res.status(200).send({ auth: true, token: token });
    }).catch(err => {
      res.status(500).send(err.message)
    });*/   
  });
  
}