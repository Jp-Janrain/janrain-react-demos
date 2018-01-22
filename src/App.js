import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route';

import { Families } from './components/Families';
import { AppDrawer } from './components/AppDrawer';
import { AppBarHeader } from './components/AppBarHeader';
import { Callback } from './components/Callback';
import { isLoggedIn } from './AuthService';
import { UnAuthorized } from './components/UnAuthorized';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '10px',
    align: 'center',
  }
}

export class App extends Component {

  constructor() {
    super()
    this.state = {
      layout: null,
      drawerIsOpen: false,
    }
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.securePath = this.securePath.bind(this)
  }
  handleSignOut = () => {
    this.forceUpdate()
  }

  handleDrawerToggle = () => {
    this.setState({ drawerIsOpen: !this.state.open });
  }

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  }

  securePath = (returnValue) => {
    return isLoggedIn() ? returnValue : UnAuthorized
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route path="/callback" component={Callback} />
            <AppBarHeader
              toggleDrawer={this.handleDrawerToggle}
              handleSignOut={this.handleSignOut} />
            <AppDrawer
              isOpen={this.state.drawerIsOpen}
              handleClose={this.handleDrawerClose}
              handleToggle={this.handleDrawerToggle} />
            {/* <Route path="/families" component={Families} /> */}
            <div style={styles.root}>
              <Route path="/families" component={this.securePath(Families)} />
            </div>
          </div>
        </Router>
      </ MuiThemeProvider>
    );
  }
}


export default App;
