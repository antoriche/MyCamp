import config from '../config.json';
import User from '../Models/User';
import mysql from 'mysql';

const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name
});

const waitToBeConnected = new Promise((resolve, reject) => {
  db.connect((err) => {
    if (err) reject(err);
    console.log("Connected to MySQL!");
    resolve();
  });
}); 

export const findUserByEmail = email => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}';`, (err, result) => {
        if (err) reject(err);
        console.log(JSON.stringify(result));
        if(!result[0]) resolve(null);
        else resolve( new User(result[0]) );
      });
    })
  )
);

export const findUserById = id => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id};`, (err, result) => {
        if (err) reject(err);
        if(!result[0]) resolve(null);
        else resolve( new User(result[0]) );
      });
    })
  )
);

export const insertUser = user => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}");`, (err, result) => {
        if (err) reject(err);
        resolve( new User({ 
          id: result.insertId,
          email: user.email,
          password: user.password
        }) );
      });
    })
  )
);