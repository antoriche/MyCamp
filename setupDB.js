import mysql from 'mysql';
import fs from 'fs';
import config from './Server/config';
import bcrypt from 'bcryptjs';

const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  multipleStatements: true
});

new Promise((resolve, reject) => {
  db.connect((err) => {
    if (err) reject(err);
    console.log("Connected to MySQL!");
    resolve();
  });
})
.then( _ => {
  const sql = fs.readFileSync('./db_struct.sql','utf8');
  // console.log(sql);
  return db.query(sql, (err, result) => {
    if(err) throw err;
    console.log("db initialized");
    // console.log(result);
  })
})
.then( _ => {
  const csv = fs.readFileSync('./users.csv','utf8').split('\n').map(line => line.split(','));
  // console.log(csv);
  const promises = [];
  csv.forEach(user => {
    promises.push(db.query(`INSERT INTO users (email, password) VALUES ("${user[0]}", "${bcrypt.hashSync(user[1], 8)}")`, (err, result) => {
      if(err) throw err;
      console.log("user "+user[0]+" added");
    }));
  });
  return Promise.all(promises);
})
.then(_ => {
  db.end();
})
.catch(err => {
  console.error(err);
  process.exit(-1);
});