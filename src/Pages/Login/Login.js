import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './Login.css';
import { TextField, Typography, Button, CircularProgress } from '@material-ui/core';
import { login, isAuth } from '../../Services/Connection';
import ErrorMessage from '../../Components/Error';

class Login extends Component {
  
  state = {
    email: '',
    password: '',
    isLoading : false,
  };

  error = () => {}
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit = () => {
    this.setState({isLoading: true});
    login(this.state.email, this.state.password)
      .catch(err => {
        this.setState({ isLoading: false })
        this.error(new Error(err.response.data.error));
      })
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
        <ErrorMessage onRef={display => this.error=display}/>
      </div>
    );
  }
}

export default Login;
