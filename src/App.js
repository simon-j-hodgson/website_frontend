import React, { Component } from 'react';
import { NavDropdown, Navbar, Nav, NavItem, Grid, MenuItem, } from 'react-bootstrap';
import Gallery from './Gallery.jsx';
import GalleryYear from './GalleryYear.jsx';
import GalleryEvent from './GalleryEvent.jsx';
import './App.css';
import './Album.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Switch, Route } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div className="App">            

        <Navbar inverse fixedTop collapseOnSelect >
          <Navbar.Header>
            <LinkContainer to="/">
              <Navbar.Brand>Simon Hodgson</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />              
          </Navbar.Header> 
          
          <Navbar.Collapse >
          <Nav pullRight>
            <NavItem>Login</NavItem>
            <NavDropdown title="Admin">
              <MenuItem>Events</MenuItem>
              <MenuItem>Upload</MenuItem>
            </NavDropdown>
            <NavDropdown title="Links">
              <MenuItem href="https://www.nickelarse.com">Nick Lee</MenuItem>
              <MenuItem href="https://www.mercian.org.uk">Mercian MC</MenuItem>
            </NavDropdown>
            </Nav>
          </Navbar.Collapse>
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


