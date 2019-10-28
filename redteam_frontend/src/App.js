import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      
          <div className="App">
            <NavBar />
          </div>
     
    );
  }
}
export default withRouter(App);
