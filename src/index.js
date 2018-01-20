import React, { Component } from 'react';
import osmAuth from 'osm-auth';

let _osmAuthInstance = {};

class App extends Component {

    constructor(props){
        super(props);
        _osmAuthInstance = osmAuth(props);
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
            <div>
                <button onClick={()=>this.state.authenticated ? this.logout() : this.authenticate()}> {this.state.authenticated ? 'Logout' : 'Login'} </button>
            </div>
        );
    }
}

export default App;
