import React, { Component } from 'react';
import osmAuth from 'osm-auth';

import './App.css';

let _osmAuthInstance = {};

class App extends Component {

  constructor(props){
    super(props);
    _osmAuthInstance = osmAuth({
          url : 'https://master.apis.dev.openstreetmap.org',
          oauth_consumer_key: 'jidyjmlqfYaVXJzhSdEsbc6k5yGsbsWAZCfbz4Rs',
          oauth_secret: '9Q1GAeFNz5FysQhyAr3p076j3RXlQa4S3VpjY11w',
          auto: true,
    });
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
        authenticated : _osmAuthInstance.authenticated()
    };
  }

  authenticate(){
      _osmAuthInstance.xhr({
          method: 'GET',
          path: '/api/0.6/user/details'
      },(err,details)=>{
          if(!err) this.setState({
              authenticated : true
          });
      })
  }

  logout(){
    _osmAuthInstance.logout();
    this.setState({
       authenticated : false
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
          {
              this.state.authenticated &&
              <button onClick={this.logout}>Logout</button>

          }
          {
              !this.state.authenticated &&
              <button onClick={this.authenticate}>Login</button>

          }

      </div>
    );
  }
}

export default App;
