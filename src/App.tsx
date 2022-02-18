import{Component, useEffect, useState} from "react";

import "./App.css";
import {  Router, Route, Routes,  } from "react-router-dom";
import Login from "../src/components/Login";


export interface Flytoken {

    userLoggedIn: boolean; 
    setUserLoggedIn: (value : boolean) => void; 
    clearToken: () => void; 
    sessionToken: string | null; 
    setSessionToken: (token: string | null) => void; 
    updateToken: (newToken: string) => void; 
  
  }

  export interface Philotoken {
    philoLoggedIn: boolean; 
    setPhiloLoggedIn: (value : boolean) => void; 
    clearToken: () => void; 
    sessionTokenP: string | null; 
    setSessionTokenP: (tokenP: string | null) => void; 
    updateToken: (newToken: string) => void; 

  }

  export interface Admintoken {
   adminLoggedIn: boolean; 
   setAdminLoggedIn: (value: boolean) => void; 
   clearToken: () => void; 
   sessionTokenA: string | null; 
   setSessionTokenA: (tokenA: string | null) => void; 
   updateToken: (newTokenA: string) => void; 

  }
  
  export interface Usercred {
  
    id: string; 
    setId: (id: string) => void; 
    emailAddress: string | null;
    setEmailAddress: (email: string | null) => void; 
    username: string;
    setUsername: (username: string) => void;
    role: string; 
    setRole: (role: string) => void;  
 
  }; 
  
  export interface Philocred {
    idp: string; 
    setIdp: string;
    emailPAddress: string | null; 
    setEmailPAddress: (email: string | null) => void;
    usernameP: string; 
    setUserNameP: (usernameP: string) => void; 
    rolep: string; 
    setRolep: (rolep: string) => void; 
  }
  
  
  export interface Admincred {
  
  ida: string; 
  setIda: (id: string | null) => void; 
  emailAAddress: string | null; 
  setEmailAAddress: (emailAAddress: string | null) => void; 
  usernameA: string; 
  setUserNameA: (usernameA: string) => void; 
  rolea: string; 
  setRolea: (rolea: string) => void; 
  
  }
  
  export interface Serverfetch {
    errorMessage: string; 
    setErrorMessage: (errorMessage: string) => void; 
    fetchDatab: () =>Promise<void>; 
    responseCall: number; 
    setResponseCall: (responseCall: number) => void; 
  }
  
  

export interface SetPropsUser {

    id: Usercred['id']; 
    setId: Usercred['setId']
    emailAddress: Usercred['emailAddress'];
    setEmailAddress: Usercred['setEmailAddress'];
    username: Usercred['username'];
    setUserName: Usercred['setUsername'];
    sessionToken: Flytoken['sessionToken'];
    setSessionToken: Flytoken['setSessionToken'];
    responseCall: Serverfetch['responseCall']; 
    clearToken: Flytoken['clearToken'];
    role: Usercred['role'];
    setRole: Usercred['setRole']

    

  
}

export interface SetPropsPhilo {
  idp: Philocred['idp'];
  setIdp: Philocred['setIdp']; 
  emailPAddress: Philocred['emailPAddress']; 
  setEmailPAddress: Philocred['setEmailPAddress']; 
  usernameP: Philocred['usernameP']; 
  setUserNameP: Philocred['setUserNameP'];
  sessionTokenP: Philotoken['sessionTokenP'];
  setSessiontokenP: Philotoken['sessionTokenP'];
  responseCall: Serverfetch['responseCall'];
  clearToken: Philotoken['clearToken']; 
  rolep: Philocred['rolep']; 
  setRolep: Philocred['setRolep']

}

export interface SetPropsAdmin {

  id: Admincred['ida'];
  setIda: Admincred['setIda']; 
  emailAAddress: Admincred['emailAAddress']; 
  setEmailAAddress: Admincred['setEmailAAddress']; 
  usernameA: Admincred['usernameA']; 
  setUserNameA: Admincred['setUserNameA'];
  sessionTokenA: Admintoken['sessionTokenA'];
  setSessiontokenA: Admintoken['sessionTokenA'];
  responseCall: Serverfetch['responseCall'];
  clearToken: Admintoken['clearToken']; 
  rolea: Admincred['rolea']; 
  setRolea: Admincred['setRolea']





}


export const UseStates = () => {
// ~~** User States **~~ //


  const[id, setId] = useState<Usercred['id']>('');
  const[role, setRole] = useState<Usercred['role']>('glaucon');
  const[emailAddress, setEmailAddress] = useState<Usercred['emailAddress']>('' || null);
  const[username, setUsername] = useState<Usercred['username']>('');
  const[errorMessage, setErrorMessage] = useState<Serverfetch['errorMessage']>('');
  const[responseCall, setResponseCall] = useState<Serverfetch['responseCall']>();
  const[sessionToken, setSessionToken] = useState<Flytoken['sessionToken']>('');
  const[userLoggedIn, setUserLoggedIn] = useState<Flytoken['userLoggedIn']>(false);
  

// ~~** Philo States **~~ // 

const[idp, setIdp] = useState<Philocred['idp']>(''); 
const[rolep, setRolep] = useState<Philocred['rolep']>('Aristotle'); 
const[emailPAdress, setEmailPAdress] = useState<Philocred['emailPAddress']>('' || null); 
const[usernameP, setUsernameP] = useState<Philocred['usernameP']>(''); 
const[sessionTokenP, setSessionTokenP] = useState <Philotoken['sessionTokenP']>(''); 
const[philoLoggedIn, setPhiloLoggedIn] = useState<Philotoken['philoLoggedIn']>(false);

  


}



type Tokens = 
{
    sessionToken: string; 
    role: string
}




class App extends Component<{}, Tokens > {
    
    constructor(props: {} ){
        super(props); 
        this.state = { 
            sessionToken: '', 
            role: '' 
        };
    }
    
   
    componentDidMount(){
        if (localStorage.getItem('token')){
            this.setState({
                sessionToken:localStorage.getItem('token')!,
            }); 
        } if (localStorage.getItem('role')){
            this.setState({
                role:String(localStorage.getItem('role')), 
            });
        }
    }

      updateToken = ( newToken: string ): void => {
        localStorage.setItem('token', String(newToken)); 
        this.setState({
            sessionToken: newToken, 
        });
    }; 

    updateRole = (newRole: string): void => {
        localStorage.setItem('role', String(newRole)); 
        this.setState ({ role: newRole})
    }; 

    clearToken = (): void => {
        localStorage.removeItem('sessionToken'); 
        this.setState({
            sessionToken: String(''), 
            role: String('')

        }); localStorage.clear(); 


    }

render () {
    return (
    <>
    <div className= 'App'> 
    <Routes>
    <Route path='/users/login' element = {<Login  
      token={this.state.sessionToken}
      updateToken = {this.updateToken}
      role={this.state.role}
      updateRole={this.updateRole}
          
      />
    } />
        

    
    
    
    </Routes>
    
    
    </div>

</>

    )}



}

  




export default App;
