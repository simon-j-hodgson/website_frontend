import React from 'react';
import { Modal, ModalHeader, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
//import DatePicker from 'react-bootstrap-date-picker';

var DatePicker = require("react-16-bootstrap-date-picker");

var baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

    baseUrl = "http://localhost:8080";
}
else {
    baseUrl = "/api";
}


export default class EventEdit extends React.Component {


    constructor (props) {
        super(props);
    
        this.state = {
           event: {title: '',
                    date: null},

               date:  new Date().toISOString()
           
        };
    
      }

      componentDidMount() {
          
      }

    setEvent(event) {
        this.setState({event: event});
    }  

    titleChange() {

    }

    dateChange () {

    }

    render() {

        if (this.props.event == null ) {
            return null;
        }

        return (


        <Modal show={this.props.showEventEdit} onHide={this.props.onClose}>
        <ModalHeader closeButton>Edit Event</ModalHeader>
        <Modal.Body>

        <form>

            <FieldGroup
                    id="formControlsTitle"
                    type="text"
                    label="Event Title"
                    value = {this.state.event.title}
                    onChange= {this.titleChange.bind(this)}
                     />

            

            <FormGroup controlId="formControlsDate">
                <ControlLabel>Event Date</ControlLabel>
                <DatePicker showClearButton={false} showTodayButton weekStartsOn={1} value={this.state.event.date} onChange={this.dateChange.bind(this)} />
                
            </FormGroup>

        </form>
        </Modal.Body>
        <Modal.Footer>
                <Button onClick={this.props.onClose} >
                <FontAwesome name='times-circle' />&nbsp;Close
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