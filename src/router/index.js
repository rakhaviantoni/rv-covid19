import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRouter from './private-router'
import { SITE_URL, MENU } from '../config'

import Register from '../pages/register';
import Login from '../pages/login';
import Home from '../pages/home';

const AppRoute = (
  <Router>
    <div>
      <Switch>
        <Route exact path={ MENU.REGISTER } component={ Register } />
        <Route exact path={ MENU.LOGIN } component={ Login } />
        <PrivateRouter exact path={ MENU.APP } component={ Home } />
        <Route exact path={ SITE_URL } component={ Login } />
        {/* <Route component={ Page404 } />         */}
      </Switch>
    </div>
  </Router>
)

export default AppRoute