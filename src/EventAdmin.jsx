import React from 'react';
import { Button, Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import EventEdit from './EventEdit';
import PhotoUpload from './PhotoUpload';

var baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

    baseUrl = "http://localhost:8080";
}
else {
    baseUrl = "/api";
}



export default class EventAdmin extends React.Component {

    constructor (props) {
        super(props);
    
        this.state = { events: null };
    
        this.eventEdit = null;
      }

    componentWillMount() {

        fetch( baseUrl + '/events/')
        .then ( response => response.json() )
        .then ( data => this.setState( { events: data.events}) );
    }

    editClick(event) {
        this.setState({EditActive: true,
                    event: event});
        this.eventEdit.setEvent(event);
    }

    editClose() {
        this.setState({EditActive: false});
    }

    uploadClose() {
        this.setState({UploadActive: false});
    }

    uploadClick(event) {
        this.setState({UploadActive: true,
                    event: event});
        this.photoUpload.setEvent(event);
    }

    render() {

        const {
            events,    
        } = this.state;

        var rows;

        if (events) {

            rows = events.map( (event, index) => 
                <EventRow key={event.event_id} event={event} onEditClick={this.editClick.bind(this)} onUploadClick={this.uploadClick.bind(this)} />
            );

        }

        return (
            
            <div>

            <EventEdit ref={instance => { this.eventEdit = instance; }} event={this.state.event} showEventEdit={this.state.EditActive} onClose={this.editClose.bind(this)} />

            <PhotoUpload ref={instance => { this.photoUpload = instance; }} event={this.state.event} showPhotoUpload={this.state.UploadActive} onClose={this.uploadClose.bind(this)} />


            <Table striped>
            <thead>
            <tr>
            <th>Title</th>
            <th>Date</th>
            <th></th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
            </Table>
            
            </div>
        );
    }
}

class EventRow extends React.Component {


    render () {
        return (
            <tr>
            <td>{this.props.event.title}</td>
            <td>{this.props.event.date}</td>
            <td><Button onClick={() => this.props.onEditClick(this.props.event)}><FontAwesome name='pencil' />&nbsp;Edit</Button></td>
            <td><Button onClick={() => this.props.onUploadClick(this.props.event)}><FontAwesome name='cloud-upload' />&nbsp;Upload</Button></td>
            </tr>
        )
    }
}