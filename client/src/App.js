import React, { Component } from 'react';

import Dashboard from './Components/Dashboard';
import AuthService from './services/AuthService';
import withAuth from './Components/HOC/WithAuth';

import './index.module.scss';

const Auth = new AuthService();
class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.getTestData()
      .then(data => this.setState({ data: data }))
      .catch(err => console.log(err));
  }

  getTestData = async () => {
    const response = await fetch('/api/getTestData', { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  handleLogout = () => {
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (
      <React.Fragment>
        {/* { 
          this.state.data &&
          <Dashboard data={this.state.data}/>
        } */}
        <div className="App">
          <div className="App-header">
            <h2>Welcome { this.state.user && this.state.user.email}</h2>
          </div>
          <p className="App-intro">
            <button type="button" className="form-submit" onClick={this.handleLogout}>Logout</button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default withAuth(App);
