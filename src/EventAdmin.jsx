import React from 'react';
import { Button, Table} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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
    
      }

    componentWillMount() {

        fetch( baseUrl + '/events/')
        .then ( response => response.json() )
        .then ( data => this.setState( { events: data.events}) );
    }

    render() {

        const {
            events,    
        } = this.state;

        var rows;

        if (events) {

            rows = events.map( (event, index) => 
                <EventRow key={event.event_id} event={event} />
            );

        }

        return (
            
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
            
        );
    }
}

class EventRow extends React.Component {

    render () {
        return (
            <tr>
            <td>{this.props.event.title}</td>
            <td>{this.props.event.date}</td>
            <td><Button><FontAwesome name='pencil' />&nbsp;Edit</Button></td>
            </tr>
        )
    }
}