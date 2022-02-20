import { Component, useState, useEffect } from "react";


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
import Datab from "../helpers/DB";
import {
  Flytoken,
  Usercred,
  Admincred,
  Admintoken,
  Serverfetch,
  SetPropsUser,
} from "./Interfaces";

type Propslogin = {
  token: string;
  updateToken: (newToken: string) => void;
  role: string;
  updateRole: (newRole: string) => void;
};

type Varlogin = {
  username: string;
  password: string;
  emailAddress: string;
  usernameValid: boolean; 
  passwordValid: boolean;  
};

class Register extends Component<Propslogin, Varlogin> {
  constructor(props: Propslogin) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailAddress: "",
      usernameValid: true, 
      passwordValid: true, 
     
    };
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${Datab}/user/register`, {
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
