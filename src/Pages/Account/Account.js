import React, { Component } from 'react';
import './Account.css';
import Login from '../Login'
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import ProjectForm from '../../Components/ProjectForm';
import { getProjects, insertProject, updateProject, deleteProject } from '../../Services/Connection';
import Error from '../../Components/Error';
import ConfirmDialog from '../../Components/ConfirmDialog';

class Account extends Component {
  
  state = {
    selection: undefined,
    list:[]
  }
  
  componentDidMount() {
    getProjects().then(projects => this.setState({ list : projects }));
  }

  error = () => {}
  dialog = () => {}
  
  render() {
    return (
      <div>
        { Login.requireAuth() }
        <Typography variant="headline" gutterBottom>
          Mes Projets
        </Typography>
        <Grid container spacing={24}>
          <Grid item >
            <List component="nav" >
              {
                this.state.list.map(project => (
                  <ListItem key={project.id} onClick={_ => this.setState({ selection: project })} style={{ backgroundColor : (project === this.state.selection) ? "#E0E0E0" : undefined }} button>
                    <ListItemText primary={project.name} />
                  </ListItem>
                ))
              }
              <ListItem onClick={_ => this.setState({ selection: null })} style={{ backgroundColor : (this.state.selection === null) ? "#E0E0E0" : undefined }} button>
                <ListItemText primary="Nouveau Projet" />
              </ListItem>
            </List>
          </Grid>
          <Grid item >
            <ProjectForm
              onDelete={(id) => {
                this.dialog("",`Supprimer le projet "${this.state.selection.name}" ?`).then(ok => {
                  if(!ok)return;
                  deleteProject(id).then((project) => {
                    const list = [...this.state.list];
                    list.splice(list.indexOf(list.filter(e => e.id === project.id)[0]), 1);
                    this.setState({ list, selection : null });
                  }).catch(err => this.error(err));
                });
              }}
              onSubmit={(project) => {
                project.id ?
                  updateProject(project).then(proj => {
                    const list = [...this.state.list];
                    list[list.indexOf(list.filter(e => e.id === proj.id)[0])] = proj;
                    this.setState({ list, selection : proj })
                  }).catch(err => this.error(err))
                :
                  insertProject(project).then(proj => {
                    this.setState({list : [...this.state.list, proj], selection : proj })
                  }).catch(err => this.error(err))
              }}
              project={this.state.selection}
            />
          </Grid>
        </Grid>
        <Error onRef={display => this.error=display}/>
        <ConfirmDialog onRef={dialog => this.dialog=dialog}/>
      </div>
    );
  }
}

export default Account;