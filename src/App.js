import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Route from 'react-router-dom/Route';

import { FamiliesContainer } from './IdentityGroups/Families/FamiliesContainer';
import { AppDrawer } from './Layout/AppDrawer';
import { AppBarHeader } from './Layout/AppBarHeader';
import { Callback } from './Auth/Callback';
import { isLoggedIn } from './Auth/AuthService'
import { UnAuthorized } from './Layout/UnAuthorized';
import { NotificationSnackbar } from './Layout/NotificationSnackbar';

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
      notifications: [],
    }
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.securePath = this.securePath.bind(this)
  }

  postMessage = (message) => {
    const notifications = this.state.notifications.concat(message)
    this.setState({ notifications })
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

    const notifications = []
    if (this.state.notifications) {
      this.state.notifications.map((notification) => {
        notifications.push(<NotificationSnackbar message={notification} />)
      })
    }

    return (
      <Router>
        <div>
          <Route path="/auth/callback" component={Callback} />
          <Route path="/auth/:audience/callback" component={Callback} />
          <AppBarHeader
            toggleDrawer={this.handleDrawerToggle}
            handleSignOut={this.handleSignOut}
            postMessage={this.postMessage} />
          <AppDrawer
            isOpen={this.state.drawerIsOpen}
            handleClose={this.handleDrawerClose}
            handleToggle={this.handleDrawerToggle}
            postMessage={this.postMessage} />
          <div style={styles.root}>
            <Route path="/families" render={(props) => {
              return (this.securePath(
                <FamiliesContainer {...props}
                  postMessage={this.postMessage} />))
            }} />
            {notifications}
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
