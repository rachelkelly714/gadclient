import React from 'react'; 
import server from '../helpers/DB'; 
import {Usercred, Philocred, Admincred, Flytoken} from '../App'



interface SetProps {

    id: Usercred['id']; 
    emailAddress: Usercred['emailAddress'];
    setEmailAddress: Usercred['setEmailAddress'];
    username: Usercred['username'];
    setUserName: Usercred['setUsername']
    sessionToken: Flytoken['sessionToken']
    

}
