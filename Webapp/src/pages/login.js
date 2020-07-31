import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import { loginUser, fetchCurrentUser } from '../actions';

import '../style/vendor/fontawesome-free/css/all.min.css';
import '../style/scss/sb-admin-2.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: false,
  };

  componentWillMount() {
    cookie.remove('userId', { path: '/' });
  }
  onUsernameChange = e => {
    this.setState({ username: e.target.value });
  };
  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.history.push('/');
    }
  }

  submit = async () => {
    this.props.loginUser(this.state, this.props.history);
  };

  handleLogin = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const result = this.props.loginUser(
      { username, password },
      this.props.history,
    );
  };

  render() {
    const { error, username, password } = this.state;
    return (
      <div>
        <div className="row">
          <div
            className="col-lg-6 d-none d-lg-block text-center"
            style={{ background: '#444444', padding: '25%' }}
          >
            <img src={require('./img/statwig_logo.png')} alt="statwig logo" />
          </div>
          <div className="col-lg-6">
            <div className="p-5 mt-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
              </div>
              <form className="user">
                <div className="form-group">
                  <input
                    type="text"
                    onChange={this.onUsernameChange}
                    className="form-control form-control-user"
                    id="exampleInputEmail"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                    value={username}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.onPasswordChange}
                    className="form-control form-control-user"
                    id="exampleInputPassword"
                    placeholder="Password"
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox small">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck"
                    />
                    <label className="custom-control-label" for="customCheck">
                      Remember Me
                    </label>
                  </div>
                </div>
                <button
                  onClick={this.handleLogin}
                  className="btn btn-primary btn-user btn-block"
                >
                  Login
                </button>
              </form>
              <hr />
              {error && <span>Username/password doesnt match</span>}
              <div className="text-center">
                <Link to="/login" className="small">
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center">
                <Link to="/login" className="small">
                  Create an Account!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { loginUser, fetchCurrentUser })(Login);
