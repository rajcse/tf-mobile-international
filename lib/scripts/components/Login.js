import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email : '', password: ''};
        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    doLogin() {
        viewActions.login(this.state);
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {

        return (
            <div>
                <input
                    type="email"
                    placeholder="Email Address"
                    defaultValue={this.state.email}
                    style={styles.textInput}
                    name="email"
                    onChange={this.handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    defaultValue={this.state.password}
                    style={styles.textInput}
                    name="password"
                    onChange={this.handleChange}
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
