import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MENU, SITE_COOKIES } from '../../config';
import { getCookie } from '../../utils/cookies';

const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      getCookie(SITE_COOKIES.TOKEN) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: MENU.LOGIN,
            state: { from: props.location },
          }}
        />
      ))
    }
  />
)

PrivateRouter.defaultProps = {
  location: null,
}

PrivateRouter.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
}

export default PrivateRouter
