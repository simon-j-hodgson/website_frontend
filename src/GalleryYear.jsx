import React from 'react';
import Gallery from './Gallery.jsx';


export default class GalleryYear extends React.Component
{
    
    render() {
      return (
          <Gallery mode='event-select' year={this.props.match.params.year} / >
      )

    }
}