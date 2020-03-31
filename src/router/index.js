import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'

// import PrivateRouter from './private-router'
import { SITE_URL, MENU } from '../config'

import Home from '../pages/home'

ReactGA.initialize('G-R07JYHBM1M')
ReactGA.pageview(SITE_URL)

const AppRoute = (
  <Router>
    <div>
      <Switch>
        {/* <Route exact path={ MENU.REGISTER } component={ Register } />
        <Route exact path={ MENU.LOGIN } component={ Login } />
        <PrivateRouter exact path={ MENU.APP } component={ Home } /> */}
        <Route exact path={ MENU.APP } component={ Home } />
        <Route exact path={ SITE_URL } component={ Home } />
        {/* <Route component={ Page404 } />         */}
      </Switch>
    </div>
  </Router>
)

export default AppRoute