import db from '../DataBase';

export default class User {
  
  constructor(data) {
    if(!data || !data.email || !data.password)throw new Error('Invalid User');
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
  }
  
  static create(data) {
    return new Promise((resolve, reject) => {
      if(!data.email || !data.password){
        return reject(new Error("Email or password are empty"));
      }
      db.findUserByEmail(data.email).then(existingUser => {
        if(existingUser){
          return reject(new Error("Email already used"));
        }
        db.insertUser(data).then(user => {
          resolve(user);
        });
      });
    });
  }
  
  static load(email) {
    return new Promise((resolve, reject) => {
      console.log(JSON.stringify(db));
      db.findUserByEmail(email).then(user => {
          resolve(user);
      });
    });
  }
  
}