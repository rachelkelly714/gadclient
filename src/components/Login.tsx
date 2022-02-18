import { Component } from "react";
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
  name?: string; 
  value: string; 
};

class Login extends Component<Propslogin, Varlogin> {
  constructor(props: Propslogin) {
    super(props);
    this.state = {
      username: "",
      password: "",
      emailAddress: "",
     
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

 handleUserInput= (e: React.FormEvent) => {
    e.preventDefault();  


 }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          
          <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input
              id="exampleUsername"
              name="username"
              placeholder="Username *"
      
              />
              </FormGroup>
          
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email Address"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password *"
              type="password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Verify Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Verify Password *"
              type="password"
            />
          </FormGroup>
          <Button>Submit</Button>
          <p>* Required</p>
        </Form>
      </div>
    );
  }
}
 





export default Login;
