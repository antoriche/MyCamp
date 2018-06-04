import React, { Component } from 'react';
import './Intranet.css';
import { Button } from '@material-ui/core';
import { ping } from '../../Services/Connection'

class Intranet extends Component {
  render() {
    return (
      <div>
        <p>
          Intranet
        </p>
        <Button
          onClick={() => {ping().then((resp) => console.log(resp.data)) }}
          variant="raised"
        >
            Ping Server
        </Button>
      </div>
    );
  }
}

export default Intranet;
