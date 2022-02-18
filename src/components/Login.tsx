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

class Login extends Component<Propslogin, Varlogin> {
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
    fetch(`${Datab}/user/login`, {
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
         <h1>Login</h1>
        <Container
         style={{
           backgroundColor: '#211F26',
           width: '30%',
           paddingLeft: 200,
           paddingRight: 0, 
           paddingTop: 100, 
           paddingBottom: 30, 
           border: '3px solid lightGray', 
           boxShadow: '30px', 
           alignItems: 'center'

          }} 
         >
        <Form 
        className="space-y-3 bg-gray-700" 
        onSubmit={this.handleSubmit}
       >
          <Row >
            <Col xs={5}>
          <FormGroup>
            <Label for="exampleUsername" style={{color: '#5176FA'}}>Username</Label>
            <Input
             
              id="exampleUsername"
              name="username"
              placeholder="Username*"
              className='width-50px border-3 focus:border-lightgray-200 bsSize:sm'
              
        
      
              />
              </FormGroup>
              </Col>
              </Row>
              <Row>
            <Col xs={5}>
          <FormGroup>
            <Label for="exampleEmail" style={{color: '#5176FA'}}>Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email Address"
              type="email"
              className='width-50px border-3 focus:border-lightgray-200 bsSize:sm'
            />
          </FormGroup>
          </Col>
          </Row>
          <Row>
          <Col xs={5}>
          <FormGroup>
            <Label for="examplePassword"style={{color: '#5176FA'}} >Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password *"
              type="password"
              className='width-50px border-3 focus:border-lightgray-200 bsSize:sm'
            />
          </FormGroup>
          </Col>
          </Row>
          <Button style = {{color:'black', backgroundColor: 'rgb(81,118,250)',}} >Submit</Button>
          <p style = {{color: 'red', fontWeight: 'bold', paddingRight: '250px'}}   > * Required </p>
        </Form>
        </Container>
       
      </div>
    );
  }
}
 





export default Login;
