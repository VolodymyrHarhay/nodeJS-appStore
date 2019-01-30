import React, { Component } from 'react';
import TestComponent from './Components/TestComponent';


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
      <React.Fragment>
        { this.state.data &&
          <TestComponent data={this.state.data}/>
        }
      </React.Fragment>
    );
  }
}

export default App;
