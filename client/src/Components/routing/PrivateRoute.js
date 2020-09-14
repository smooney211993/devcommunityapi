import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Returning a route with a component that is passed(dashboard) as a render prop if it is loading and authenticated
// it will has the component passed in and all of the other props
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mappedStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mappedStateToProps)(PrivateRoute);
