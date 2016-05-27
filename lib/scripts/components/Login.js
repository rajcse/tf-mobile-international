import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import tfActions from '../actions/tfActions';
import loginStore from '../stores/loginStore.js'

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {email : '', password: ''};
      this.doLogin = this.doLogin.bind(this);
  }

  doLogin() {
    tfActions.login({email: this.state.email, password: this.state.password});
  }

  handleChange(name, event) {
    var change = {};
      change[name] = event.target.value;
      this.setState(change);
  }

	render() {

		return (
			<div>
        <input
          type="text"
          placeholder="Email Address"
          defaultValue={this.state.email}
          style={styles.textInput}
          name="email"
          onChange={this.handleChange.bind(this, 'email')}

        />

        <input
          type="text"
          placeholder="Password"
          defaultValue={this.state.password}
          style={styles.textInput}
          name="password"
          onChange={this.handleChange.bind(this, 'password')}

        />
        <button style={styles.button} onClick={this.doLogin}>
          Login
        </button>			
      </div>
		);
	}
};

var styles = {
};
