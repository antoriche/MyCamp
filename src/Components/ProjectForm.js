import React, { Component } from 'react';
import { TextField, MenuItem, Button } from '@material-ui/core';

const ENVS = ['PHP', 'NODE', 'HTML'];

type Props = {
  project?: {
    id: number,
    name: string,
    url: string,
    git: string,
    env: string,
    keywords: Array<string>
  },
  onSumbit: ()=>void,
  onDelete: ()=>void
}

class ProjectForm extends Component<Props> {
  
  state = {
    name: '',
    url: '',
    git: '',
    env: '',
    keywords: ''
  }

  componentWillReceiveProps(props) {
    this.props = props;
    const { name, url, git, env, keywords } = props.project
    || {
      name: '',
      url: '',
      git: '',
      env: '',
      keywords: []
    };
    this.setState({
      name, url, git, env,
      keywords: keywords.join(', ')
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  project = () => {
    const keywords = this.state.keywords.replace(/\s/g,',').split(',').filter(s => s?true:false).filter((item, pos, array) => array.indexOf(item) == pos);
    return Object.assign({}, this.props.project, {
      name: this.state.name,
      url: this.state.url,
      git: this.state.git,
      env: this.state.env,
      keywords
    });
  }

  submit = () => {
    const { onSubmit } = this.props;
    onSubmit(this.project());
  }
  
  onDelete = () => {
    const { onDelete } = this.props;
    onDelete(this.project().id);
  }
  
  render() {
    return (
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
        <div style={{ marginTop: 20 }} >
          <Button onClick={() => this.submit()}  variant="raised" >
            Publier
          </Button>
          <Button style={{ display : this.project().id ? undefined : 'none'}} onClick={() => this.onDelete()} color="secondary" >
            Supprimer
          </Button>
        </div>
      </form>
    );
  }
}

export default ProjectForm;
