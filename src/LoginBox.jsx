import React from 'react';
import { Modal, ModalHeader, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

var baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

    baseUrl = "http://localhost:8080";
}
else {
    baseUrl = "/api";
}


export default class Gallery extends React.Component {
  

    constructor (props) {
        super(props);
    
        this.state = {
            email: '',
            password: ''
        };
    
      }

    handleLogin() {

        var postData = {
            email: this.state.email,
            password: this.state.password
        };

        fetch( baseUrl + '/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(postData)
        })
        .then ( response => { if (!response.ok) {
                                throw new Error('Login Failed (HTTP Response ' + response.status + ')');
                            }
                            response.json();} )
        .then ( response => {this.props.onSucess(response);
                            this.props.onClose();} )
        .catch ( error=> {  console.log(error);
                            this.setState({loginFailed: true}) } );

        
    }

    emailChange(event) {
        this.setState({email: event.target.value});
    }

    passwordChange (event) {
        this.setState({password: event.target.value});
    }

    reset() {
        this.setState({email: '', password: '', loginFailed: false});
    }

    render() {

        return (

            <Modal show={this.props.showLogin} onHide={this.props.onClose}>
                <ModalHeader closeButton>Login</ModalHeader>
                <Modal.Body>

                { this.state.loginFailed && (
                <Alert bsStyle="danger">
                    <strong>Failed</strong> Your email address and password were not recognised, please try again.
                </Alert>
                )}
                <form> 
                     <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="email@address.com"
                    value = {this.state.email}
                    onChange= {this.emailChange.bind(this)}
                     />
                    <FieldGroup
                    id="formControlsPassword"
                    label="Password"
                    type="password"
                    value = {this.state.password}
                    onChange = {this.passwordChange.bind(this)}
                    />

                
                </form>
                </Modal.Body>

                <Modal.Footer>
                <Button onClick={this.props.onClose} >
                <FontAwesome name='times-circle' />&nbsp;Close
                </Button>

                <Button type="submit" bsStyle="primary" onClick={this.handleLogin.bind(this)} >
                    <FontAwesome name='sign-in' />&nbsp;Login
                    </Button>
                    </Modal.Footer>
            </Modal>

        )
    }
}

class FieldGroup extends React.Component {
    
    
    render() {

        const {
            controlId,
            id,
            label,
            help,
            ...props
        } = this.props;

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    )
    }
  }  