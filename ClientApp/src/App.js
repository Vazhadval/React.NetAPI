import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Login } from './components/Login';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route path='/Login' component={Login} />
                <PrivateRoute exact path='/Home' component={Home} />
                <PrivateRoute path='/fetch-data' component={FetchData} />
            </Layout>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            true ? <Component {...props} />
                : <Redirect to='/Login' />
        } />
    );
}


