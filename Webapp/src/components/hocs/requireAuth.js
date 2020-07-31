import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookie from 'react-cookies'


export default ComposedComponent => {
  class RequireAuth extends Component {

    constructor(props) {
      super(props);
      this.state =  { userId: cookie.load('userId') }
    }

    render() {
      const { userId } = this.state;
      if(userId) {
        return (
          <ComposedComponent {...this.props} />
        );
      }else {
        return <Redirect to="/login" />;
      }

    }
  }

  const mapStateToProps = ({ user }) => ({
    isAuthenticated: user.isAuthenticated,
    user: user.user
  });

  return connect(mapStateToProps)(RequireAuth);
};
