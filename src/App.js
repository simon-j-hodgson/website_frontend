import React, { Component } from 'react';
import { NavDropdown, Navbar, Nav, NavItem, Grid, MenuItem, } from 'react-bootstrap';
import Gallery from './Gallery.jsx';
import GalleryYear from './GalleryYear.jsx';
import GalleryEvent from './GalleryEvent.jsx';
import './App.css';
import './Album.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga'

class App extends Component {

  constructor(props) {
    super(props)
    ReactGA.initialize('UA-41407998-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div className="App">            

        <Navbar inverse fixedTop >
          <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Simon Hodgson</a>
                </Navbar.Brand>              
          </Navbar.Header> 
          <Nav pullRight>
            <NavItem>Login</NavItem>
            <NavDropdown title="Admin">
              <MenuItem>Events</MenuItem>
              <MenuItem>Upload</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>

       <div className="container">   
       
        <Grid>

        <Switch>
          <Route path="/years/:year" component={GalleryYear} />
          <Route path="/event/:eventId/:title" component={GalleryEvent}  />
          <Route path="/photo/:eventId/:title/:photoIndex" component={GalleryEvent}  />
          <Route path="/" component={Gallery}/>
        </Switch>

        
         </Grid>

         </div>

      </div>
    );
  }

}

export default App;


