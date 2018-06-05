import React, { Component } from 'react';
import './Account.css';
import Login from '../Login'

class Account extends Component {
  render() {
    return (
      <div>
        { Login.requireAuth() }
        <p>Account page</p>
      </div>
    );
  }
}

export default Account;
