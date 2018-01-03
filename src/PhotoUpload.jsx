import React from 'react';
import { Modal, ModalHeader, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Dropzone from 'react-dropzone';

export default class PhotoUpload extends React.Component {

    constructor (props) {
        super(props);
    
        this.state = {
           event: {title: '',
                    date: null}
           
        };
    
      }

      setEvent(event) {
        this.setState({event: event});
    }  

    onDrop(acceptedFiles, rejectedFiles) {
        
        acceptedFiles.forEach(file => { console.log(file.name) } );

      }

    render() {
        return (

            <Modal show={this.props.showPhotoUpload} onHide={this.props.onClose}>
                <ModalHeader closeButton>Upload Photos : {this.state.event.title}</ModalHeader>
                <Modal.Body>

                    

                    <Dropzone onDrop={this.onDrop.bind(this)} accept="image/jpeg" >
                    <p>Drop files here to upload. Only JPEG files will be accepted.</p>
                    </Dropzone>

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