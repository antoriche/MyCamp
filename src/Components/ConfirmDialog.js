import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';


type Props = {
  onRef: (Function)=>void
}

class ConfirmDialog extends Component<Props> {
  
  state = {}

  display = (title,text) => (
    new Promise((resolve, reject) => {
      this.setState({ title, text });
      this.listener = (ok) => {
        this.setState({ title : null, text: null});
        resolve(ok);
      };
    })
  )

  componentDidMount(){
    this.props.onRef(this.display);
  }

  handleClose(ok){
    this.listener(ok);
  }

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }
  
  render() {
    return (
      <Dialog
          open={this.state.text?true:false}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={() => this.handleClose(false)}
        >
          <DialogTitle>
            {this.state.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
             {this.state.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(true)} color="primary">
              Oui
            </Button>
            <Button onClick={() => this.handleClose(false)} color="primary">
              Non
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default ConfirmDialog;
