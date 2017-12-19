import React from 'react';
import Gallery from './Gallery.jsx';


export default class GalleryEvent extends React.Component
{
    render() {

        var photoIndex = null;

        //if (this.props.match.params.photoIndex) {
            photoIndex = this.props.match.params.photoIndex; 
       // }
        //else {
          //  photoIndex = 'none';
        //}

      return (
        
        <Gallery mode='photo-select' eventId={this.props.match.params.eventId} photoIndex={photoIndex} / >
      )

    }
}