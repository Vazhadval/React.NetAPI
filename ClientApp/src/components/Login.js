import React, { Component } from 'react';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: "",
            password: "",
        }

    }

    render() {
        return (
            <div className="d-flex justify-content-around">
                <form className="col-md-5">
                    <div className="row justify-content-between">
                        <h2 className="text-center">Log in</h2>
                        <div>
                            <button className="btn btn-secondary btn-sm">Sign up</button>
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
                        <button type="submit" className="btn btn-primary btn-block">Log in</button>
                    </div>
                </form>
            </div>
        );

    }

    handleUsernameOnChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordOnChange(e) {
        this.setState({ password: e.target.value });
    }
}

