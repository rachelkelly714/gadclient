import React, { Component } from 'react';

import { Form, Button, FormGroup, Label, Input,Alert} from 'reactstrap';
import APIURL from '../helpers/DB';


type propsLogin = {
    token: string | null;
    updateToken: (newToken: string) => void;
 
   
   
};

type varLogin = {
    email: string;
    emailValid: boolean; 
    emailVerify: boolean
    password: string;
    passwordValid: boolean; 
    passwordVerify: boolean,
    isPasswordMatch: string; 
    passwordMatchValid: boolean, 
    passwordMatchVerify: boolean,
    passwordMatchError: string, 
    errors: string,
    alert: string,
    alertCheck: boolean


  
};

class Login extends Component<propsLogin, varLogin> {
    constructor(props: propsLogin) {
        super(props);
        this.state = {
            email: '',
            emailValid: false, 
            emailVerify: false,
            password: '',
            passwordValid: false, 
            passwordVerify: false,
            isPasswordMatch: '',
            passwordMatchValid: false,
            passwordMatchVerify: false,
            passwordMatchError: '', 
            errors: '',
            alert: '',
            alertCheck: false,
        };
    }

    emailValidate = (e: React.ChangeEvent<HTMLInputElement>)=> this.setState({email: e.target.value})
    passwordValidate = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.target.value})


    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        fetch(`${APIURL}/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              user:{
                email: this.state.email,
                password: this.state.password}
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then((result) => { 
                result.status === 200 ? this.setState({alertCheck: true}) : this.setState({alertCheck:false})
                return result
            }).then(result => result.json())
             .then(result => {
                this.setState({alert: result.message});
                this.props.updateToken(result.token);
              
                
             })

    
            }
    render() {
        return (
            <div>
                <div className="Login">
                    <h2>Sign In</h2>
                    <Form className="form" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input 
                            type="email" 
                            name="email" 
                            id="exampleEmail" 
                            placeholder="example@example.com"
                            vaule={this.state.email}
                            onChange={this.emailValidate} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input 
                            type="password" 
                            name="password"
                             id="password"
                              placeholder="********" 
                              value={this.state.password}
                              onChange={this.passwordValidate}
                              error={this.state.errors} />
                        </FormGroup>
                        <Button style={{ backgroundColor: '#64b5f6' }} type="submit"
                          >
                            Submit
                        </Button>
                    </Form>
                    {this.state.alert && <Alert color={this.state.alertCheck ? 'success' : 'danger'}>{this.state.alert}</Alert>}
                </div>
            </div>
        );
    }

    }

export default Login;
