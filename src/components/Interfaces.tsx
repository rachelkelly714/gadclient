import React from 'react'; 
import server from '../helpers/DB'; 


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
  
  

interface SetProps {

    id: Usercred['id']; 
    emailAddress: Usercred['emailAddress'];
    setEmailAddress: Usercred['setEmailAddress'];
    username: Usercred['username'];
    setUserName: Usercred['setUsername']
    sessionToken: Flytoken['sessionToken']
    

}


