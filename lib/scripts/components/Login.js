import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import Transition from './Transition';
import viewActions from '../actions/viewActions';
import Loader from './Loader';
import Svg from './Svg';

export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email : '',
            password: ''
        };
        
        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    doLogin() {                
        viewActions.login({
            email: this.state.email,
            password: this.state.password
        });
    }
    
    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    render() {
        
        return (
            <div id="login">
                
                <Svg svg="tfLogoWhite" />
                
                <input
                    type="email"
                    placeholder="Email Address"
                    defaultValue={this.state.email}
                    name="email"
                    disabled={this.props.loggingIn}
                    onChange={this.handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    defaultValue={this.state.password}
                    name="password"
                    disabled={this.props.loggingIn}
                    onChange={this.handleChange}
                />

                {!this.props.loggingIn ?
                    <button onClick={this.doLogin}>
                        Login
                    </button>
                : <Loader />}
                
                <Transition transitionName="login-error" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {this.props.loginErrors ? <p className="error-message">{this.props.loginErrors}</p> : null}
                </Transition>
            </div>
        );
    }
};