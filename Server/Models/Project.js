import db from '../DataBase';

export default class Project {
  
  constructor(data) {
    if(!data || !data.name || !data.user_id || !data.url || !data.git || !data.env )throw new Error('Invalid Project');
    this.id = data.id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.url = data.url;
    this.git = data.git;
    this.env = data.env;
    this.keywords = data.keywords || [];
  }
  
  update(){
    return db.updateProject(this);
  }
  
  delete(){
    return db.deleteProject(this.id);
  }
  
  static create(data) {
    return db.insertProject(new Project(data));
  }
  
  static load(id) {
    return db.findProjectById(id);
  }
  
  static getAllProjects(){
    return db.getAllProjects().then(projects => (
      new Promise((resolve, reject) => {
        const promises = [];
        projects.forEach( (project) => {
          promises.push(db.findUserById(project.user_id).then(user => Object.assign(project, {user: Object.assign(user, { password: null })})));
        });
        Promise.all(promises).then(resolve).catch(reject);
      })
    ));
  }
  
}