import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

export default function withAuth(WrappedComponent) {
  const Auth = new AuthService('http://localhost:3000');

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      }
    }

    componentDidMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      }
      else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          })
        }
        catch(err){
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }
    
    render() {
      if (this.state.user) {
        return (
          <WrappedComponent {...this.props} {...this.state.user} />
        )
      }
      else {
        return null;
      }
    }
  }
}