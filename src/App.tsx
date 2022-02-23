import { Component, useEffect, useState } from 'react';
import './index.css';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import { Navbar } from 'reactstrap';
import Sitebar from './components/Navbar';
import APIURL from './helpers/DB';

export interface Flytoken {
    clearToken: () => void;
    sessionToken: string | null;
    setSessionToken: (token: string | null) => void;
    updateToken: (newToken: string) => void;
}

type tokens = {
    token: string | null;
    // role: string;
};

class App extends Component<{}, tokens, Flytoken> {
    constructor(props: {}) {
        super(props);
        this.state = {
            token: ''
        };
    }

    componentDidMount() {
        if (localStorage.getItem('sessionToken')) {
            this.setState({
                token: localStorage.getItem('sessionToken')!
            });
        }
    }

    updateToken = (newToken: string): void => {
        localStorage.setItem('sessionToken', newToken);
        this.setState({
            token: newToken
        });
    };

    clearToken = (): void => {
        localStorage.clear();
        this.setState({
            token: String('')
        });
    };

    confirmToken = async (): Promise<void> => {
        if (localStorage.getItem('Authorization') !== undefined && this.state.token === null) {
          await fetch(`${APIURL}/user/confirmToken`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
            }),
          })
            .then(result => {
              if (result.status === 200)
                this.setState({ token: localStorage.getItem('Authorization') })
              else this.setState({ token: null })
              return result.json()
            })
         
        }
      }

    render() {
        return (
            
            <div className="App">
         
                <h1 className="Font">Welcome!</h1>
                    {/* <Sitebar token={this.state.token}/> */}
                <Routes>
                    {/* <Route path="/users/login" element={<Login token={this.state.sessionToken} updateToken={this.updateToken}  />} /> */}

                    <Route path="/register" element={<Register updateToken={this.updateToken} token={this.state.token} />} />
                    <Route path="login" element={<Login updateToken={this.updateToken} token={this.state.token} />} />
                </Routes>
    
            </div>
        );
    }
}

export default App;
