import Project from '../Models/Project';
import User from '../Models/User';
import config from '../config.json';
import { getTokenData } from '../Services/Authentification';

export default (app) => {
  
  app.post('/project', (req, res) => {
    const { project, token } = req.query || {};
    try{
      const tokenData = getTokenData(token);
      if( !tokenData || !tokenData.user ){
        return res.status(401).end();
      }
      if(!project){
        return res.status(400).end();
      }
      Project.create(Object.assign({}, JSON.parse(project), { user_id : tokenData.user })).then(newProject => {
        res.status(200).send({ project: newProject }).end();
      }).catch(err => {
        res.status(500).send({ error: err.message }).end();
      });
    } catch(err) {
      console.log(err.message);
      return res.status(500).send({ error: err.message }).end();
    }
  });
  
  app.put('/project/:id', (req, res) => {
    const { id } = req.params;
    const { project, token } = req.query || {};
    try{
      const tokenData = getTokenData(token);
      if( !tokenData || !tokenData.user ){
        return res.status(401).end();
      }
      if(!id || !project){
        return res.status(400).end();
      }
      new Project(Object.assign({}, JSON.parse(project), { id : parseInt(id), user_id : tokenData.user })).update().then(newProject => {
        res.status(200).send({ project: newProject }).end();
      }).catch(err => {
        console.error(err);
        res.status(500).send({ error: err.message }).end();
      });
    } catch(err) {
      console.log(err.message);
      return res.status(500).send({ error: err.message }).end();
    }
  });
  
  app.delete('/project/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.query || {};
    try{
      const tokenData = getTokenData(token);
      if( !tokenData || !tokenData.user ){
        return res.status(401).end();
      }
      if(!id){
        return res.status(400).end();
      }
      const project = await (await Project.load(parseInt(id))).delete();
      res.status(200).send({ project }).end();
    } catch(err) {
      console.log(err.message);
      return res.status(500).send({ error: err.message }).end();
    }
  });
  
  app.get('/project/my', (req, res) => {
    console.log("get my projects : ");
    try{
      const { token } = req.query;
      const tokenData = getTokenData(token);
      console.log(tokenData);
      if( !tokenData || !tokenData.user){
        return res.status(401).end();
      }
      console.log("user data ok");
      User.loadById(tokenData.user).then(user => {
        user.getProjects().then(projects => {
          res.status(200).send({ projects }).end()
        }).catch(err => {
          res.status(500).send({ error: err.message }).end();
        });
      });
    } catch(err) {
      console.log(err.message);
      return res.status(500).send({ error: err.message }).end();
    }
  });
  
  app.get('/project', (req, res) => {
    console.log("get projects : ");
    try{
      Project.getAllProjects().then(projects => {
        res.status(200).send({ projects }).end()
      }).catch(err => {
        res.status(500).send({ error: err.message }).end();
      });
    } catch(err) {
      console.log(err.message);
      return res.status(500).send({ error: err.message }).end();
    }
  });
  
}