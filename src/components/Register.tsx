import React, { Component, useState, useEffect } from "react";


import {
  Form,
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import datab from "../helpers/DB";
import {
  Flytoken,
  Usercred,
  Admincred,
  Admintoken,
  Serverfetch,
  SetPropsUser,
} from "./Interfaces";

const [passwordValid, setPasswordValid]= React.useState<boolean>(true); 
const [passwordError, setPasswordError] =
		React.useState<string>("");
type propsReg = {
  token: string;
  updateToken: (newToken: string) => void;
  role: string;
  updateRole: (newRole: string) => void;
};

type varReg = {
  username: string;
  password: string;
  emailAddress: string;
  passwordValid: boolean;
  passwordVerify: boolean; 
  passwordConfirm: React.useState<string>('')
  isPasswordConfirm: boolean;
  passwordConfirmError: string
  loginGo: React.useState<string>('')
};

class Register extends Component<propsReg, varReg> {
  constructor(props: propsReg) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailAddress: "",
      usernameValid: true, 
      passwordValid: true, 
      passwordVerify: true,
      passwordConfirm: React.useState<string>('')
      isPasswordConfirm: true,
      passwordConfirmError: ""
      loginGo: React.useState<string>('')

     
    };
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch(`${datab}/user/register`, {
      method: "Post",
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          emailAddress: this.state.emailAddress,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
        this.props.updateRole(data.user.role);
      })
      .catch((err) => {
        console.log("Error: 500 ISE", err);
      });
  };

 handleChange= (e: React.ChangeEvent<HTMLInputElement>): void => {
     if (event.target.id ==== 'password') {
       setPassword(event.target.value);
     } else if (event.target.id === 'username'){
       setLoginGo(event.target.value);
      
     }else { console.log('Error: ID Not found')}

     
    }

    const passwordValid = () =>
    if (password.length < 8 ) {
       setPasswordValid(false)
       setPasswordError('Your password must be at least 8 characters.')
       return['Your password must be at least 8 characters.', false];
    }

    const passwordVerify = () => 
    if (password !== passwordConfirm ){
      setIsPasswordConfirm(false)
      setPasswordConfirmError('Passwords do not match.')
    }



  render() {
    return (
      <div>  
        <div className="Register">
        <h2>Sign Up!</h2>
        <Form className="form">
          <FormGroup>
            
            <Label for="exampleEmail">Username</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="example@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword"> Verify Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
        <Button style={{ backgroundColor:'#64b5f6'}}>Submit</Button>
      </Form>
    </div>
       
      </div>
    );
  }
}
 





export default Register;
