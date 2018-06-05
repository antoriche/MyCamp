import User from '../Models/User';
const users = [{id: 1, email: 'a', password:'$2a$08$7xs2TSaM2eoLZdFRpmPYT.m.WfYck.zQ8QgmWVHj1Z6GKrSZQE2rC'}];

export const findUserByEmail = email => (
  new Promise((resolve, reject) => {
    resolve(new User(users.filter(u => u.email === email)[0]));
  })
);

export const insertUser = user => (
  new Promise((resolve, reject) => {
    const userData = {
      email: user.email,
      password: user.password
    }
    userData.id = Math.max(...users.map(u => u.id))+1;
    users.push(userData);
    resolve(new User(userData));
  })
);