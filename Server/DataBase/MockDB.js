import User from '../Models/User';
import Project from '../Models/Project';
import bcrypt from 'bcryptjs';


const users = [{id: 1, email: 'a', password: bcrypt.hashSync('password', 8) }];
const projects = [{ id: 1, user_id: 1, name:'Projet 1', url:'projet1.jsb', git:'gitlab.jsb/projet1', env: 'PHP', keywords: ['A'] }];

export const findUserByEmail = email => (
  new Promise((resolve, reject) => {
    resolve(new User(users.filter(u => u.email === email)[0]));
  })
);

export const findUserById = id => (
  new Promise((resolve, reject) => {
    resolve(new User(users.filter(u => u.id === id)[0]));
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

export const findProjectsByUserId = userId => (
  new Promise((resolve, reject) => {
    resolve(projects.filter(project => project.user_id === userId).map(project => (
      new Project(project)
    )));
  })
)

export const findProjectById = id => (
  new Promise((resolve, reject) => {
    resolve(new Project(projects.filter(project => project.id === id)[0]));
  })
)

export const insertProject = project => (
  new Promise((resolve, reject) => {
    const projectData = {
      name:project.name,
      user_id: project.user_id,
      url:project.url,
      git:project.git,
      env: project.env,
      keywords: project.keywords
    }
    projectData.id = Math.max(...projects.map(p => p.id))+1;
    projects.push(projectData);
    resolve(new Project(projectData));
  })
);

export const updateProject = project => (
  new Promise((resolve, reject) => {
    const projectData = {
      id: project.id,
      name: project.name,
      user_id: project.user_id,
      url:project.url,
      git:project.git,
      env: project.env,
      keywords: project.keywords
    }
    projects[projects.indexOf(projects.filter(e => e.id === projectData.id)[0])] = projectData;
    resolve(new Project(projectData));
  })
);

export const deleteProject = id => (
  new Promise((resolve, reject) => {
    const project = projects.filter(p => p.id === id)[0];
    projects.splice(projects.indexOf(project), 1);
    resolve(new Project(project));
  })
);

export const getAllProjects = _ => (
  new Promise((resolve, reject) => {
    resolve(projects.map(proj => new Project(proj)));
  })
);