import  React, { Component, useState } from 'react'; 

import { Form, Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import APIURL from '../helpers/DB';

type propsReg = {
 
    updateToken: (newToken: string) => void;
    token: string | null


};

type VarReg = {
    email: string;
    emailValid: boolean;
    emailTyping: boolean;
    password: string;
    passwordValid: boolean;
    passwordTyping: boolean;
    passwordConfirm: string;
    isPasswordConfirm: boolean;
    passwordConfirmTyping: boolean; 
    passwordConfirmError: string;
    errors: string
    alert: string 
    alertCheck: boolean
};

class Register extends Component<propsReg, VarReg> {
    constructor(props: propsReg) {
        super(props);
        this.state = {
            email: '',
            emailValid: false,
            emailTyping: false,
            password: '',
            passwordValid: false,
            passwordTyping: false,
            passwordConfirm: '',
            passwordConfirmTyping: false, 
            isPasswordConfirm: false,
            passwordConfirmError: '',
            errors: '',
            alert: '',
            alertCheck: false, 
        };
    }
     


     passwordValidate = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?'_]).*$/



  

    passwordCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.passwordTyping)
            this.setState({ passwordTyping: true })
        this.setState({ password: event.target.value },
            () => {
                if (this.passwordValidate.test(this.state.password))
                    this.setState({ passwordValid: true, errors: '' })
                else
                    this.setState({ passwordValid: false, errors: 'Password must be at least 8 characters long, under 16 characters, and include a number and a symbol. ' })
            })
    }
    passwordVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.passwordConfirmTyping)
            this.setState({passwordConfirmTyping: true })
        this.setState({ passwordConfirm: event.target.value },
            () => {
                if (this.state.password === this.state.passwordConfirm)
                    this.setState({ isPasswordConfirm: true, errors: '' })
                else
                    this.setState({ isPasswordConfirm: false, errors: 'Passwords must match' })
            })
    }




    
  handleRegSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
   await fetch(`${APIURL}/user/register`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ 
        user:{
        email: this.state.email,
        password: this.state.password,
      }
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((result) => {
        result.status === 201 ? this.setState({alertCheck: true}) : this.setState({ alertCheck: false})
        return result
    })
      .then(result => result.json())
      .then(result => {
        this.props.updateToken(result.sessionToken)
        this.setState({alert: result.message})
      })
  }





    render() {
        return (
            <div>
                <div className="Register">
                    <h2>Sign Up!</h2>
                    <Form
          onSubmit={this.handleRegSubmit} className="form">
                        <FormGroup
                      >      
                            <Label for="Email">Email Address</Label>
                            <Input 
                            type="email"
                            // vaule={this.state.email}
                            name="email" 
                            id="email" 
                            placeholder="Email Address" 
                            autoComplete="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input 
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.passwordCheck}
                            error={this.state.errors}
                            id="password" 
                            placeholder="********" 
                            autoComplete="new-password" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Password"> Verify Password</Label>
                            <Input 
                            type="password" 
                            name="password"
                            value={this.state.passwordConfirm}
                            onChange={this.passwordVerify} 
                            error={this.state.errors}
                            id="password" 
                            placeholder="********" />
                        </FormGroup>
                        <Button 
                        type="submit" 
                        style={{ backgroundColor: '#64b5f6' }}
                         >
                            Submit
                        </Button>
                    </Form>
                  
                </div>
                {this.state.alert && <Alert color={this.state.alertCheck ? 'success' : 'danger'}>{this.state.alert}</Alert>}
            </div>
         
        );
    }
}


export default Register;
