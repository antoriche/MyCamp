import config from '../config.json';
import User from '../Models/User';
import Project from '../Models/Project';
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

export const findProjectsByUserId = userId => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM projects WHERE user_id=${userId};`, (err, result) => {
        if (err) return reject(err);
        resolve( result.map( proj => new Project(proj) ) );
      });
    })
  )
);

export const findProjectById = id => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM projects WHERE id=${id};`, (err, result) => {
        if (err) return reject(err);
        if(!result[0]) resolve(null);
        else resolve( new Project(result[0]) );
      });
    })
  )
);

export const insertProject = project => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`INSERT INTO projects (user_id, name, description, url, git, env) VALUES (${project.user_id}, "${project.name}", "${project.description}", "${project.url}", "${project.git}", "${project.env}" );`, (err, result) => {
        if (err) return reject(err);
        resolve( new Project(Object.assign({}, project, { id: result.insertId }) ));
      });
    })
  )
);

export const updateProject = project => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`UPDATE projects SET user_id=${project.user_id}, name="${project.name}", description="${project.description}", url="${project.url}", git="${project.git}", env="${project.env}" WHERE id=${project.id};`, (err, result) => {
        if (err) return reject(err);
        resolve( new Project(project) );
      });
    })
  )
);

export const deleteProject = id => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      findProjectById(id).then(project => {
        db.query(`DELETE FROM projects WHERE id=${id};`, (err, result) => {
          if (err) return reject(err);
          resolve( project );
        });
      }).catch(err => reject(err));
    })
  )
);

export const getAllProjects = _ => (
  waitToBeConnected.then( _ =>
    new Promise((resolve, reject) => {
      db.query(`SELECT * FROM projects;`, (err, result) => {
        if (err) return reject(err);
        resolve( result.map( project => new Project(project) ));
      });
    })
  )
);
