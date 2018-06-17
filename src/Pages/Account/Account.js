import React, { Component } from 'react';
import './Account.css';
import Login from '../Login'
import { TextField, MenuItem, Grid, Typography, List, ListItem, ListItemText, Button, Paper } from '@material-ui/core';

const ENVS = ['PHP', 'NODE', 'HTML'];

class Account extends Component {
  
  state = {
    name: '',
    url: '',
    git: '',
    env: '',
    keywords:''
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
          <Grid item >
            <List component="nav" >
              <ListItem style={{ backgroundColor : "#E0E0E0" }} button>
                <ListItemText primary="Projet 1" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Projet 2" />
              </ListItem>
            </List>
          </Grid>
          <Grid item >
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
                margin="normal"
                style={{ width: 200 }}
              >
                {ENVS.map(env => (
                  <MenuItem key={env} value={env}>
                    {env}
                  </MenuItem>
                ))}
              </TextField> <br />
              <TextField
                multiline
                label="Mots clés"
                value={this.state.keywords}
                onChange={this.handleChange('keywords')}
                margin="normal"
                style={{ width: 200 }}
                helperText="Les mots clés doivent être séparés par des virgules"
              /> <br />
              <Button style={{ marginTop: 20 }} onClick={() => {}}  variant="raised" >
                Publier
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Account;
