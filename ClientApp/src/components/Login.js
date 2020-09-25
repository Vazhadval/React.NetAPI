import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            isLogin: true,
            username: "",
            password: "",
        }

    }

    render() {
        return (
            <div className="d-flex justify-content-around">
                <div className="col-md-5">
                    <div className="row justify-content-between">
                        <h2 className="text-center pl-3">{this.state.isLogin ? 'Log in' : 'Sign up'}</h2>
                        <div>
                            <button className="btn btn-secondary btn-sm pr-3" onClick={() => this.handleSwitchLogin()}>{this.state.isLogin ? 'Sign up' : 'Log in'}</button>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            required="required"
                            value={this.state.username}
                            onChange={(e) => this.handleUsernameOnChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required="required"
                            value={this.state.password}
                            onChange={(e) => this.handlePasswordOnChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => this.handleLogin()}
                        >
                            {this.state.isLogin ? 'Log in' : 'Sign up'}
                        </button>
                    </div>
                </div>
            </div>
        );

    }

    handleSwitchLogin() {
        this.setState({ isLogin: !this.state.isLogin });
    }

    handleUsernameOnChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordOnChange(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin() {
        if (!this.state.isLogin) {
            var req = {
                username: this.state.username,
                password: this.state.password
            };
            fetch('https://localhost:44329/api/users/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req)
            }).then(res => {
                console.log(res);
            });
        } else {
            var req = {
                username: this.state.username,
                password: this.state.password
            };
            fetch('https://localhost:44329/api/users/login', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req)
            }).then(res => res.json())
                .then(data => console.log(data.token));
        }

    }
}

