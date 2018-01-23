import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route';

import { FamiliesContainer } from './IdentityGroups/Families/FamiliesContainer';
import { AppDrawer } from './Layout/AppDrawer';
import { AppBarHeader } from './Layout/AppBarHeader';
import { Callback } from './Auth/Callback';
import { isLoggedIn } from './Auth/AuthService'
import { UnAuthorized } from './Layout/UnAuthorized';


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
            <Route path="/auth/callback" component={Callback} />
            <Route path="/auth/:audience/callback" component={Callback} />
            <AppBarHeader
              toggleDrawer={this.handleDrawerToggle}
              handleSignOut={this.handleSignOut} />
            <AppDrawer
              isOpen={this.state.drawerIsOpen}
              handleClose={this.handleDrawerClose}
              handleToggle={this.handleDrawerToggle} />
            {/* <Route path="/families" component={Families} /> */}
            <div style={styles.root}>
              <Route path="/families" component={this.securePath(FamiliesContainer)} />
            </div>
          </div>
        </Router>
      </ MuiThemeProvider>
    );
  }
}


export default App;
