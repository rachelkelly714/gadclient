import React, {useState, useEffect} from "react";

import './App.css';
import server from './helpers/DB';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; 
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import Interface from '../src/components/Interfaces'
 

export interface Flytoken {

  userLoggedIn: boolean; 
  setUserLoggedIn: (value : boolean) => void; 
  clearToken: () => void; 
  sessionToken: string | null; 
  setSessionToken: (token: string | null) => void; 
  updateToken: (newToken: string) => void; 

}

export interface Usercred {

  id: string; 
  setId: (id: string) => void; 
  emailAddress: string | null;
  setEmailAddress: (email: string | null) => void; 
  username: string;
  setUsername: (username: string) => void; 
  isAdmin: boolean | null; 
  setIsAdmin: (isAdmin: boolean | null) => void; 
  isPhilo: boolean | null; 
  setIsPhilo: (isPhilo: boolean | null) => void; 
}; 

export interface Philocred {
  id: string; 
  emailPAddress: string | null; 
  setEmailPAddress: (email: string | null) => void;
  usernameP: string; 
  setUserNameP: (usernameP: string) => void; 
  isPhilo: boolean | null; 
  setIsPhilo: ( isPhilo: boolean | null) => void; 
  isAdmin: boolean | null;
  setIsAdmin: (isAdmin: boolean | null ) => void; 
}


export interface Admincred {

id: string; 
emailAAdress: string | null; 
setEmailAAdress: (emailAAdress: string | null) => void; 
usernameA: string; 
setUserNameA: (usernameA: string) => void; 
isAdmin: boolean | null; 
setIsAdmin: (isAdmin: boolean | null) => void;

}

export interface Serverfetch {
  errorMessage: string; 
  setErrorMessage: (errorMessage: string) => void; 
  fetchServer: () =>Promise<void>; 
  responseCall: number; 
  setResponseCall: (responseCall: number) => void; 
}



const App = () => {
  // ~~** User States **~~// 

  const [id, setId] = useState<Usercred['id']>('');  
  const [username, setUsername] = useState<Usercred['username']>(''); 
  const [emailAddress, setEmailAddress] = useState<Usercred['emailAddress']>(''); 
  const [isPhilo, setIsPhilo] = useState<Usercred['isPhilo']>('');
  const [isAdmin, setIsAdmin] = useState<Usercred['isAdmin']>(''); 
  const [sessionToken, setSessionToken] = useState<Flytoken['sessionToken']>(''); 
  const [userLoggedIn, setUserLoggedIn] = useState<Flytoken['sessionToken']>(''); 
  const [errorMessage, setErrorMessage] = useState<Serverfetch['errorMessage']>('');
  const []


}

export default App;
