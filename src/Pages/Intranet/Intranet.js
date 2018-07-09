import React, { Component } from 'react';
import './Intranet.css';
import { ping } from '../../Services/Connection'
import { Grid, Typography, TextField } from '@material-ui/core';
import { getProjects } from '../../Services/Connection';
import ProjectCard from '../../Components/ProjectCard';


class Intranet extends Component {
  
  state = { projects: [], search: '' }

  constructor(props){
    super(props);
    this.filter = this.filter.bind(this);
  }
  
  componentDidMount() {
    getProjects().then(projects => this.setState({ projects }));
  }

  filter(project){
    if(!this.state.search) return true;
    const name_words = project.name.toLowerCase().split(' ');
    const search_words = this.state.search.toLowerCase().split(' ');
    let display = false;
    name_words.forEach(name_word => {
      search_words.forEach(search_word => {
        if(name_word.includes(search_word)){
          display = true;
        }
      });
    });
    return display;
  }
  
  render() {
    return (
      <div>
        <Typography variant="headline" gutterBottom>
          Intranet
        </Typography>
        <TextField
          fullWidth
          onChange={event => this.setState({search: event.target.value})}
          placeholder="Recherche"
          value={this.state.search}
          style={{ marginBottom: 20 }}
        />
        <Grid container spacing={24} >
          {
            this.state.projects.filter(this.filter).map(project => (
              <Grid item key={project.id} xs={12} md={6} lg={4} >
                <ProjectCard project={project} />
              </Grid>
            ))
          }
        </Grid>
      </div>
    );
  }
}

export default Intranet;
