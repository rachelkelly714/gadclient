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

type propsLogin = {
  token: string;
  updateToken: (newToken: string) => void;
  role: string;
  updateRole: (newRole: string) => void;
};

type varLogin = {
  username: string;
  password: string;
  emailAddress: string;
  usernameValid: boolean; 
  passwordValid: boolean;  
};

class Login extends Component<propsLogin, varLogin> {
  constructor(props: propsLogin) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailAddress: "",
      usernameValid: true, 
      passwordValid: true, 
     
    };
  }

  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    fetch(`${datab}/user/login`, {
      method: "Post",
      body: JSON.stringify({
        
          username: this.state.username,
          emailAddress: this.state.emailAddress,
          password: this.state.password,
        
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
      })
   
  };

handleChange= (e: React.ChangeEvent<HTMLInputElement>): void => {
  const target = e.target;
  const value = target.value;
  const name = target.name;
  this.setState({ [name]: value } as unknown as Pick<varLogin, keyof varLogin>) }
    





  render() {
    return (
      <div>  
        <div className="Login">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={this.handleSubmit}>
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
              id="password"
              placeholder="********"
              onChange={this.handleChange}
            />
          </FormGroup>
        <Button style={{ backgroundColor:'#64b5f6'}
    } type='submit'>Submit</Button>
      </Form>
    </div>
       
      </div>
    );
  }
}
 





export default Login;
