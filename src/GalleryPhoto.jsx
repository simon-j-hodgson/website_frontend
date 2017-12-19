import React from 'react';
import Gallery from './Gallery.jsx';

export default class GalleryPhoto extends React.Component
{
    render() {
      return (
          <Gallery mode='photo-display' eventId={this.props.match.params.eventId}  photoIndex={this.props.match.params.photoIndex} / >
      )

    }
}