import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'

ReactGA.initialize('UA-41407998-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  } 

  render() {
    return this.props.children;
  }
}

ReactDOM.render((
    <BrowserRouter>
    <GAListener>
      <App />
      </GAListener>
    </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();

