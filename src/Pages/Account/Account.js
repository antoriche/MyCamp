import React, { Component } from 'react';
import './Account.css';
import Login from '../Login'
import { TextField, MenuItem, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const ENVS = ['PHP', 'NODE', 'HTML'];

class Account extends Component {
  
  state = {
    name: '',
    url: '',
    git: '',
    env: ''
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  render() {
    return (
      <div>
        { Login.requireAuth() }
        <Typography variant="headline" gutterBottom>
          Mes Projets
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={4} >
            <List component="nav" >
              <ListItem style={{ backgroundColor : "#E0E0E0" }} button>
                <ListItemText primary="Projet 1" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Projet 2" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={8} >
            <form noValidate>
              <TextField
                label="Nom"
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              /> <br />
              <TextField
                label="URL"
                value={this.state.url}
                onChange={this.handleChange('url')}
                margin="normal"
              /> <br />
              <TextField
                label="Adresse Git"
                value={this.state.git}
                onChange={this.handleChange('git')}
                margin="normal"
              /> <br />
              <TextField
                select
                label="Environnement"
                value={this.state.env}
                onChange={this.handleChange('env')}
                helperText="Environnement du serveur"
                margin="normal"
              >
                {ENVS.map(env => (
                  <MenuItem key={env} value={env}>
                    {env}
                  </MenuItem>
                ))}
              </TextField> <br />
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
