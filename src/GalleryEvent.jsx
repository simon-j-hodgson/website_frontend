import React from 'react';
import Gallery from './Gallery.jsx';


export default class GalleryEvent extends React.Component
{
    render() {

      var photoIndex = this.props.match.params.photoIndex; 
       
      return (
        
        <Gallery mode='photo-select' eventId={this.props.match.params.eventId} photoIndex={photoIndex} / >
      )

    }
}