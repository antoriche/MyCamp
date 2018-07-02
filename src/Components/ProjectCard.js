import React, { Component } from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import randomMC from 'random-material-color';

type Props = {
  project?: {
    id: number,
    name: string,
    url: string,
    git: string,
    env: string,
    keywords: Array<string>,
    user: { email: string }
  }
}

class ProjectCard extends Component<Props> {
  
  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }
  
  render() {
    return (
      <Card style={{ backgroundColor: randomMC.getColor({ shades: ['200', '300'], text: this.props.project.name })}} >
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.project.name}
          </Typography>
          <Typography component="p">
            {this.props.project.url}<br/>
            {this.props.project.user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="raised" onClick={_ => this.openInNewTab(this.props.project.url)} >
            Visiter
          </Button>
          <Button style={{display : this.props.project.git === "none" ? "none" : undefined}} size="small" onClick={_ => this.openInNewTab(this.props.project.git)} >
            Contribuer
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default ProjectCard;
