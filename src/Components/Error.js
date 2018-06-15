import React, { Component } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon, Error as ErrorIcon } from '@material-ui/icons';


type Props = {
  onRef: (Function)=>void
}

class Error_ extends Component<Props> {
  
  state = {
    error: null
  }

  display = (error) => {
    if(!(error instanceof Error))error = new Error(error);
    console.error(error);
    this.setState({error});
  }

  componentDidMount(){
    this.props.onRef(this.display);
  }
  
  render() {
    return (
      <div>
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
                {(this.state.error || {}).message}
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

export default Error_;
