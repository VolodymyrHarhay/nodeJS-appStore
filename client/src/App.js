import React, { Component } from 'react';
import Dashboard from './Components/Dashboard';


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

  render() {
    return (
      <div>
        { this.state.data &&
          <Dashboard data={this.state.data}/>
        }
      </div>
    );
  }
}

export default App;
