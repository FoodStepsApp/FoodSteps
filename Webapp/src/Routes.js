import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';

import './App.css';
// pages
import Login from './pages/login';
import Home from './pages/home';
import Overview from './pages/overview';
import Profile from './pages/profile';
import Products from './pages/products';
import Shipping from './pages/shipping';
import Inventory from './pages/inventory';
import ShippingToTracking from './pages/shipping-to-tracking';
import InventoryToTracking from './pages/inventory-to-tracking';
import EntryDetails from './pages/entryDetails';
import Certificate from './pages/certificate';
import requireAuth from "./components/hocs/requireAuth";


class Routes extends Component {

  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route exact path="/" component={requireAuth(Overview)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={requireAuth(Profile)} />
            <Route exact path="/products" component={requireAuth(Products)} />
            <Route exact path="/overview" component={requireAuth(Overview)} />
            <Route exact path="/shipping" component={requireAuth(Shipping)} />
            <Route exact path="/inventory" component={requireAuth(Inventory)} />
            <Route exact path="/entrydetails" component={requireAuth(EntryDetails)} />
            <Route
              exact
              path="/shipping-to-tracking:id"
              component={ShippingToTracking}
            />
            <Route
              exact
              path="/inventory-to-tracking:id"
              component={InventoryToTracking}
            />
            <Route exact path="/certificate" component={Certificate} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Routes;
