import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Login } from './components/Login';
import { ExchangeRates } from './components/ExchangeRates'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route path='/Login' component={Login} />
                <Route exact path='/Home' component={Home} />
                <Route path='/fetch-data' component={FetchData} />
                <Route path='/exchange-rates' component={ExchangeRates} />
            </Layout>
        );
    }
}


