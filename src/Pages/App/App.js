import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Documentation from '../Documentation';
import Intranet from '../Intranet';
import './App.css';
import { AppBar, SwipeableDrawer as Drawer, Toolbar, IconButton, Typography, MenuItem, Divider } from '@material-ui/core';
import Image from 'material-ui-image';
import { Menu } from '@material-ui/icons';
import imageHeader from './header2.jpg';

/*
  Root Component
  Manage Routes
*/

class App extends Component {
  
  state = { open: false };

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
              <Typography variant="title" color="inherit" noWrap>
                MyCamp
              </Typography>
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
              <div style={{ position: 'absolute', top: 0, width: 'calc( 100% - 10px )', padding: 5, fontSize: 18 }} >
                {"{{"} Citation du jour {"}}"}
              </div>
            </div>
            <Link to='/login' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Connexion</MenuItem></Link>
            <Divider />
            <Link to='/' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Intranet</MenuItem></Link>
            <Link to='/docs' style={{ textDecoration: 'none' }}><MenuItem onClick={this.handleDrawerClose}>Documentation</MenuItem></Link>
          </Drawer>
          <div className="content">
              <Route exact path='/docs' component={Documentation}/>
              <Route exact path='/' component={Intranet}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
