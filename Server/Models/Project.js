import db from '../DataBase';

export default class Project {
  
  constructor(data) {
    if(!data || !data.name || !data.user_id || !data.url || !data.git || !data.env || !data.keywords)throw new Error('Invalid Project');
    this.id = data.id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.url = data.url;
    this.git = data.git;
    this.env = data.env;
    this.keywords = data.keywords;
  }
  
  update(){
    return db.updateProject(this);
  }
  
  delete(){
    return db.deleteProject(this.id);
  }
  
  static create(data) {
    return db.insertProject(data)
  }
  
  static load(id) {
    return db.findProjectById(id)
  }
  
}