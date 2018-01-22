import React, { Component } from 'react';

import { AppDrawer } from './AppDrawer';
import { AppBarHeader } from './AppBarHeader';

export class AppLayout extends Component {

    constructor() {
        super()
        this.state = {
            layout: null,
            isLoggedIn: true,
            drawerIsOpen: false,
            user: {
                displayName: "Jp Rowan",
                newInvites: 1,
            }
        }
        this.handleDrawerClose = this.handleDrawerClose.bind(this)
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
    }

    handleDrawerToggle = () => {
        this.setState({ drawerIsOpen: !this.state.open });
    }

    handleDrawerClose = () => {
        this.setState({ drawerIsOpen: false });
    }

    handleSignOut = () => {
        this.setState({
            isLoggedIn: false,
            user: null,
        });
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <AppBarHeader
                    toggleDrawer={this.handleDrawerToggle}
                    isLoggedIn={this.state.isLoggedIn}
                    user={this.state.user}
                    handleSignOut={this.handleSignOut} />
                <AppDrawer
                    isOpen={this.state.drawerIsOpen}
                    handleClose={this.handleDrawerClose}
                    handleToggle={this.handleDrawerToggle} />
                {this.props.children}
            </div>
        );
    }
}