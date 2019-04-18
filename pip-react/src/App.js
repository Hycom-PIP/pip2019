
import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloString: "Hello World [loading...]"
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => 
          fetch('http://localhost:8080/hello-service/hello')
          .then(response => { return response.text()
          }).then(data => {  this.setState({ helloString : data})
          }),1000); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      this.state.helloString
    );
  }

}

export default App;