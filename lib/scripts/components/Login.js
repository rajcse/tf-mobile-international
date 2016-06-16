import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';
import userStore from '../stores/userStore';
import Loader from './Loader';
import Svg from './Svg';

export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email : '',
            password: '',
            loggingIn: false,
            errors: null
        };
        
        this.doLogin = this.doLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
    }
    
    componentWillMount() {
        userStore.addChangeListener(this.onUserChange);
    }
    
    componentWillUnmount() {
        userStore.removeChangeListener(this.onUserChange);
    }
    
    doLogin() {
        this.setState({loggingIn: true});
        
        viewActions.login({
            email: this.state.email,
            password: this.state.password
        });
    }
    
    // Listen for errors coming back from the API
    onUserChange() {
        this.setState({
            errors: userStore.getLoginErrors(),
            loggingIn: !userStore.isLoggedIn() && !userStore.getLoginErrors()
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
                    disabled={this.state.loggingIn}
                    onChange={this.handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    defaultValue={this.state.password}
                    name="password"
                    disabled={this.state.loggingIn}
                    onChange={this.handleChange}
                />

                {!this.state.loggingIn ?
                    <button onClick={this.doLogin}>
                        Login
                    </button>
                : <Loader />}
                
                {this.state.errors ? <p className="error-message">Incorrect email and/or password</p> : null}
            </div>
        );
    }
};