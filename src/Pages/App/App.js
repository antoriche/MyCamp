import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Documentation from '../Documentation';
import Intranet from '../Intranet';
import Login from '../Login';
import Account from '../Account';
import './App.css';
import { AppBar, SwipeableDrawer as Drawer, Tooltip, Toolbar, IconButton, Typography, MenuItem, Divider } from '@material-ui/core';
import Image from 'material-ui-image';
import { Menu, ExitToApp } from '@material-ui/icons';
import imageHeader from './header2.jpg';
import { onAuth, isAuth, logout } from '../../Services/Connection';

/*
  Root Component
  Manage Routes
*/

class App extends Component {
  
  state = { open: false };

  componentDidMount(){
    this.onAuth = onAuth(() => this.forceUpdate());
  }
  componentWillUnmount(){
    this.onAuth();
  }

  handleDrawerOpen = () => (
    this.setState({ open: true })
  );

  handleDrawerClose = () => (
    this.setState({ open: false })
  );
    
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
              >
                <Menu />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap style={{ flex: 1}} >
                MyCamp
              </Typography>
              <Tooltip title="Déconnexion" placement="bottom">
                <IconButton
                  style={{ display: !isAuth() ? 'none' : undefined }}
                  onClick={()=>{
                    logout().then(() => {
                      console.log("logout");
                      this.forceUpdate();
                    });
                  }}
                  color="inherit"
                >
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            open={this.state.open}
            onClose={this.handleDrawerClose}
            onOpen={this.handleDrawerOpen}
          >
            <div style={{ position: 'relative' }}>
              <Image
                disableTransition
                style={{ width: 250, height: 'auto' }}
                imageStyle={{ width: 'inherit', height: 'inherit' }	}
                src={imageHeader}
              />
            </div>
            {
              isAuth() ?
                <Link to='/account' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Projets</MenuItem></Link>
              :
                <Link to='/login' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Connexion</MenuItem></Link>
            }
            <Divider />
            <Link to='/' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Intranet</MenuItem></Link>
            <Link to='/docs' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Documentation</MenuItem></Link>
          </Drawer>
          <div className="content">
            <Route exact path='/account' component={Account}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/docs' component={Documentation}/>
            <Route exact path='/' component={Intranet}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
