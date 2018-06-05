import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Login.css';
import { TextField, Typography, Button, CircularProgress, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon, Error as ErrorIcon } from '@material-ui/icons';
import { login, isAuth } from '../../Services/Connection';

class Login extends Component {
  
  state = {
    email: '',
    password: '',
    isLoading : false,
    error: undefined
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit = () => {
    this.setState({isLoading: true});
    login(this.state.email, this.state.password)
      .catch(err => { this.setState({ isLoading: false, error : err.response.data.error })})
  };

  static requireAuth() {
    return !isAuth() ? (<Redirect to="/login" />) : undefined;
  }

  render() {
    if (isAuth()) return (<Redirect to="/account" />);
    return (
      <div>
        <center>
          <form>
            <Typography variant="headline" gutterBottom>
              Connexion
            </Typography>
            <TextField
              label="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <br />
            <TextField
              label="Mot de passe"
              value={this.state.password}
              onChange={this.handleChange('password')}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
            <br />
            <div style={{ marginTop: 20 }} >
              {
                this.state.isLoading ?
                  <CircularProgress />
                :
                  <Button onClick={this.submit}  variant="raised" >
                    Connexion
                  </Button>
              }
            </div>
          </form>
        </center>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.error ? true : false}
          autoHideDuration={6000}
          onClose={() => this.setState({ error: null})}
        >
          <SnackbarContent
            style={{ backgroundColor: 'rgb(211, 47, 47)'}}
            message={
              <span id="client-snackbar" style={{display: 'flex', alignItems: 'center' }}>
                <ErrorIcon style={{ fontSize: 20, marginRight: 10 }} />
                {this.state.error}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => this.setState({ error: null})}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

export default Login;
