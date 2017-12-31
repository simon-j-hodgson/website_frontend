import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, NavItem, Grid, MenuItem, } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Gallery from './Gallery.jsx';
import GalleryYear from './GalleryYear.jsx';
import GalleryEvent from './GalleryEvent.jsx';
import LoginBox from './LoginBox.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './Album.css';



import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = { showLogin: false };

  }

  handleClose() {
    this.setState({showLogin: false});
  }

  showLogin() {
    this.setState({showLogin: true});
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
            
            <NavDropdown title="Admin">
              <LinkContainer to="/EventAdmin"><MenuItem>Events</MenuItem></LinkContainer>
              <MenuItem>Upload</MenuItem>
            </NavDropdown>
            <NavDropdown title="Links">
              <MenuItem href="https://www.nickelarse.com"><FontAwesome name='bicycle' fixedWidth />&nbsp;Nick Lee</MenuItem>
              <MenuItem href="https://www.mercian.org.uk"><FontAwesome name='map-signs' fixedWidth />&nbsp;Mercian MC</MenuItem>
              <MenuItem href="https://github.com/simon-j-hodgson/"><FontAwesome name='github' fixedWidth />&nbsp;GitHub</MenuItem>
              <MenuItem href="https://www.facebook.com/simon.hodgson"><FontAwesome name='facebook' fixedWidth />&nbsp;Facebook</MenuItem>
              <MenuItem href="https://www.instagram.com/snow_geek/"><FontAwesome name='instagram' fixedWidth />&nbsp;Instagram</MenuItem>
            </NavDropdown>
            <NavItem onClick={this.showLogin.bind(this) }><FontAwesome name='sign-in' />&nbsp;Login</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      <LoginBox showLogin={this.state.showLogin} onClose={this.handleClose.bind(this)} />

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


