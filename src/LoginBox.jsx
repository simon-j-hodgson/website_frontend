import React, { Component } from 'react';
import { Modal, ModalHeader,Label, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';


export default class Gallery extends React.Component {
  
    handleLogin() {

        this.props.onClose();
    }

    render() {

        return (

            <Modal show={this.props.showLogin} onHide={this.props.onClose}>
                <ModalHeader closeButton>Login</ModalHeader>
                <Modal.Body>
                <form> 
                     <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="email@address.com"
                     />
                    <FieldGroup
                    id="formControlsPassword"
                    label="Password"
                    type="password"
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