import React from 'react';
import { Grid, Row, Col, Breadcrumb} from 'react-bootstrap';
import  Lightbox  from 'react-image-lightbox';
import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import PropTypes from "prop-types";

var baseUrl;
var photoBaseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

    baseUrl = "http://localhost:8080";
    photoBaseUrl = "http://localhost:8081";
}
else {
    baseUrl = "/api";
    photoBaseUrl = "";
}



export default class Gallery extends React.Component {
      
    static contextTypes = {
        router: PropTypes.object
      }
    constructor(props,context) {
        super(props, context);       

        this.state = { 
            mode: 'year-select', 
            year: null, 
            years: [],
            event: null,
            events: [],
            photos: [],
             };
    }


    componentDidMount () {

        var mode = 'year-select';
        var eventId = null;
    
        
        if (this.props.mode) {
            mode = this.props.mode;
        }

        if (mode === 'year-select' ) {
            fetch(baseUrl + '/years')
            .then ( response => response.json() )
            .then ( data => this.setState( { years: data.years } ) );
        }
        else if (mode === 'event-select') {

            fetch( baseUrl + '/events/' + this.props.year)
            .then ( response => response.json() )
            .then ( data => this.setState( { events: data.events}) );
        }
        else if (mode === 'photo-select' || mode === 'photo-display' ) {

            eventId = this.props.eventId;

            if (this.state.eventId !== eventId) {
                fetch( baseUrl + '/event_with_photos/' + eventId)
                .then ( response => response.json() )
                .then ( data => this.setState( { events: data.events, photos: data.photos  }) );
            }    
        }    
    }
    
    handleSelectPhoto(index,e) {

        e.preventDefault();

        this.setState( {lightboxOpen: true} );   
    }

    
    render () {

        const {
            photoIndex
        } = this.props;
        

        const {
            photos,
            events,
            years,
        } = this.state;

            var cards;
            var mode = 'year-select';

            if (this.props.mode) {
                mode = this.props.mode;
            }

           if (mode === 'year-select') {
        
                if (years.length > 0) {

                    cards = years.map( year =>
                        
                        <GalleryCard key={year.year} 
                                year={year.year} 
                                photo_id={year.photo.photo_id} 
                                thumb_x={year.photo.thumb_x} 
                                thumb_y={year.photo.thumb_y} 
                                title={year.year} 
                                url={"/years/" + year.year}
                                hoverText={year.event_count + (year.event_count > 1 ? " events" : " event")} /> 
                
                    );
                }
            }
            else if (mode === 'event-select') {
            
                if (events.length > 0) {
                
                    cards = events.map( (event, index) =>
                        
                        <GalleryCard key={event.event_id} 
                                event_id={event.event_id} 
                                photo_id={event.photo.photo_id} 
                                thumb_x={event.photo.thumb_x} 
                                thumb_y={event.photo.thumb_y} 
                                title={event.title} 
                                url = {"/event/" + event.event_id + "/" + event.title.replace(/ /g,"-")}/> 
                
                    );
                }
            }
            else if (mode === 'photo-select' || mode === 'photo-display') {
            
                if (photos.length > 0) {

                    cards = photos.map( (photo, index) =>
                        
                        <GalleryCard key={photo.photo_id} 
                                photo_id={photo.photo_id} 
                                thumb_x={photo.thumb_x} 
                                thumb_y={photo.thumb_y} 
                                title={photo.title} 
                                url = {"/photo/" + this.props.eventId + "/" + events[0].title.replace(/ /g,"-") + "/" + index} /> 
                    );
                }
            }

            var lb;

            const customStyles = {
                overlay: {
                    zIndex: 2000
                }
            }

            if (photoIndex != null && (photos.length > 0)) {
                lb =   
                <Lightbox 

                reactModalStyle={customStyles}

                mainSrc={photoBaseUrl + "/photos/" + photos[photoIndex].photo_id + ".jpg"} 
                mainSrcThumbnail={photoBaseUrl + "/thumbnails/" + photos[photoIndex].photo_id + ".jpg"}
                
                nextSrc={photoBaseUrl + "/photos/" + photos[(photoIndex + 1) % photos.length].photo_id + ".jpg"} 
                nextSrcThumbnail={photoBaseUrl + "/thumbnails/" + photos[(photoIndex + 1) % photos.length].photo_id + ".jpg"}
                
                prevSrc={photoBaseUrl + "/photos/" + photos[(photoIndex + photos.length - 1) % photos.length].photo_id + ".jpg"} 
                prevSrcThumbnail={photoBaseUrl + "/thumbnails/" + photos[(photoIndex + photos.length - 1) % photos.length].photo_id + ".jpg"}
                
                imageTitle={photos[photoIndex].title}

                imageCaption={"\u00a9 "+photos[photoIndex].taken_by}

                onMoveNextRequest={() => this.context.router.history.push("/photo/"+events[0].event_id + "/" + events[0].title.replace(/ /g,"-") +"/" + (parseInt(photoIndex,10) + 1) % photos.length) }
                
                onMovePrevRequest={() => this.context.router.history.push("/photo/"+events[0].event_id + "/" + events[0].title.replace(/ /g,"-") +"/" + (parseInt(photoIndex,10) + photos.length - 1) % photos.length) }
                
                onCloseRequest={() => this.context.router.history.push("/event/"+events[0].event_id + "/" + events[0].title.replace(/ /g,"-")) }
                                           
                />
            }

        return (     
        
            <div>

                {lb}
    
                <div>
                    <GalleryBreadcrumb mode={mode} year={this.props.year} events={events} /> 
                </div>

                <div className="album text-muted"> 
                <Grid className="text-center"> 
                    <Row  >{cards}</Row>
                </Grid>
                </div>
            </div>
        );
    }

}

class GalleryCard extends React.Component {

    constructor(props) {
        super(props);       

        this.state = { showHover: false };
    }

    mouseEnter(){
        console.log('mouse enter');
        this.setState( {showHover: true });
    }

    mouseLeave() {
        this.setState( {showHover: false });
    }

    render () {

        const {
            photo_id,
            thumb_x,
            thumb_y,
            title,
            onClickFunc,
            url,
            hoverText
        } = this.props;

        var new_thumb_x = parseInt(thumb_x,10);
        var new_thumb_y = parseInt(thumb_y,10);

        if (new_thumb_x > new_thumb_y) {
            new_thumb_x = Math.round(new_thumb_x * (250 / new_thumb_y));
            new_thumb_y = 250; 
        }
        else {
            new_thumb_y = Math.round(new_thumb_y * (250 / new_thumb_x));
            new_thumb_x = 250;
        }

        var hoverDiv = null;

        if (this.state.showHover && hoverText) {
            hoverDiv = <div className="hover-text"><br />{hoverText}</div>;
        }

        return (               

            <Col className="card" lg={4} md={6} xs={12}>
                <div className="img-container">
                    <div className="img-clip" onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={ this.mouseLeave.bind(this) }>
                        <Link to={ encodeURI(url)} onClick={onClickFunc} >
                            <img src={photoBaseUrl + "/thumbnails/"+photo_id+".jpg"}  width={new_thumb_x} height={new_thumb_y} alt={title} />
                            {hoverDiv}
                        </Link>
                </div>
            </div>

            <p className="card-text">&nbsp;{title}&nbsp;</p>
            </Col>
        );
    }
}


class GalleryBreadcrumb extends React.Component {
        
    render() {

        var yearBreadcrumb = "";
        var eventBreadcrumb = "";

        if (this.props.mode === 'event-select') {
            yearBreadcrumb = (<Breadcrumb.Item active>{this.props.year}</Breadcrumb.Item>);
        }

        if (this.props.mode === 'photo-select') {
            var title = null;
            var year = null;
            if (this.props.events.length > 0) {
                title = this.props.events[0].title;
                year = new Date(this.props.events[0].date).getFullYear();
            }
            yearBreadcrumb = (<LinkContainer to={"/years/" + year}><Breadcrumb.Item>{year}</Breadcrumb.Item></LinkContainer>);
            eventBreadcrumb = (<Breadcrumb.Item active>{title}</Breadcrumb.Item>);
        }

        return (

            <Breadcrumb className="text-left">
                <LinkContainer to="/"><Breadcrumb.Item>Home</Breadcrumb.Item></LinkContainer>
                {yearBreadcrumb}
                {eventBreadcrumb}
            </Breadcrumb>
        );
    }

}
