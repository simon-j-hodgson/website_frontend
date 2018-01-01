import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, NavItem, Grid, MenuItem, } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Gallery from './Gallery.jsx';
import GalleryYear from './GalleryYear.jsx';
import GalleryEvent from './GalleryEvent.jsx';
import LoginBox from './LoginBox.jsx';
import EventAdmin from './EventAdmin.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './Album.css';



import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = { showLogin: false,
                  loggedIn: false,
                  user: null };

  }

  handleClose() {
    this.setState({showLogin: false});
  }

  showLogin() {
    this.loginbox.reset();
    this.setState({showLogin: true});
  }

  loginSucess(user) {
      this.setState({loggedIn: true,
              user: user});
  }

  logout() {
    this.setState({loggedIn: false,
      user: null});
  }

  render() {

    var userItem = null;

    if (this.state.loggedIn !== true) {
        userItem = (
        <NavItem onClick={this.showLogin.bind(this) }><FontAwesome name='sign-in' />&nbsp;Login</NavItem>
      )
    }
    else {
        userItem = (
        <NavItem onClick={this.logout.bind(this) }><FontAwesome name='sign-out' />&nbsp;Logout</NavItem>
        )
    }

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
            
            {this.state.loggedIn && (
            <NavDropdown title="Admin" id="adminMenu">
              <LinkContainer to="/eventadmin"><MenuItem>Events</MenuItem></LinkContainer>
              <MenuItem>Upload</MenuItem>
            </NavDropdown>
            )}
            <NavDropdown title="Links" id="linksMenu"  >
              <MenuItem href="https://www.nickelarse.com"><FontAwesome name='bicycle' fixedWidth />&nbsp;Nick Lee</MenuItem>
              <MenuItem href="https://www.mercian.org.uk"><FontAwesome name='map-signs' fixedWidth />&nbsp;Mercian MC</MenuItem>
              <MenuItem href="https://github.com/simon-j-hodgson/"><FontAwesome name='github' fixedWidth />&nbsp;GitHub</MenuItem>
              <MenuItem href="https://www.facebook.com/simon.hodgson"><FontAwesome name='facebook' fixedWidth />&nbsp;Facebook</MenuItem>
              <MenuItem href="https://www.instagram.com/snow_geek/"><FontAwesome name='instagram' fixedWidth />&nbsp;Instagram</MenuItem>
            </NavDropdown>
           {userItem}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      <LoginBox ref={instance => { this.loginbox = instance; }} showLogin={this.state.showLogin} onClose={this.handleClose.bind(this)} onSucess={this.loginSucess.bind(this)} />

       <div className="container">   
       
        <Grid>

        <Switch>
          <Route path="/years/:year" component={GalleryYear} />
          <Route path="/event/:eventId/:title" component={GalleryEvent}  />
          <Route path="/photo/:eventId/:title/:photoIndex" component={GalleryEvent}  />
          <Route path="/eventadmin" component={EventAdmin}/>
          <Route path="/" component={Gallery}/>
        </Switch>

         </Grid>

         </div>

      </div>
    );
  }

}

export default App;


