import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import decode from 'jwt-decode';

import { APP_TITLE } from '../Config'
import { ProfileButton } from './ProfileButton';
import { ProfileMenu } from './ProfileMenu';
import { SignInButton } from './SignInButton';
import { isLoggedIn, getIdToken, logout, currentUserUUID } from '../Auth/AuthService';
import { getUsersInvites } from '../IdentityGroups/Families/FamiliesAPI';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import IconButton from 'material-ui/IconButton/IconButton';
import Typography from 'material-ui/Typography/Typography';

const styles = {
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const getUserInfo = () => {
    const token = decode(getIdToken());
    return {
        displayName: token.nickname ? token.nickname : token.given_name
    }
}

export class AppBarHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profileMenu: {
                isOpen: false,
                anchorEl: null,
            },
            user: isLoggedIn() ? getUserInfo() : null,
            isLoggedIn: isLoggedIn(),
            notifications: false,
            invitatations: [],
        }
        // alert(JSON.stringify(this.state.user))
        // this.handleMenuState = this.handleMenuState.bind(this);
        // this.handleSignOut = this.handleSignOut.bind(this);
        // this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        // this.hideProfileMenu = this.hideProfileMenu.bind(this);
    }
    componentWillMount() {
        if (isLoggedIn()) {
            getUsersInvites(currentUserUUID(), (res) => {
                if (res.length > 0) { this.setState({ notifications: true, invitatations: res }) }
            }, () => { })
        }
    }
    toggleProfileMenu = (e) => {
        this.setState({
            profileMenu: {
                isOpen: !this.state.profileMenuIsOpen,
                anchorEl: e.currentTarget,
            }
        });
    };
    hideProfileMenu = (e) => {
        this.setState({
            profileMenu: {
                isOpen: false,
                anchorEl: null,
            }
        });
    };
    handleSignOut = () => {
        logout()
        this.setState({
            isLoggedIn: false,
            user: null,
        });
        this.props.handleSignOut()
    }

    handleMenuState = () => {
        const state = this.state
        if (state.isLoggedIn) {
            return (
                <div id="profile-button-container">
                    <ProfileButton
                        id="profile-button"
                        displayName={this.state.user.displayName}
                        onClick={(e) => this.toggleProfileMenu(e)}
                        notifications={this.state.notifications} />
                    <ProfileMenu
                        handleSignOut={this.handleSignOut}
                        isVisible={state.profileMenu.isOpen}
                        hideMenu={this.hideProfileMenu}
                        anchorEl={state.profileMenu.anchorEl}
                        invitations={state.invitatations} />
                </div>
            );
        } else {
            return <SignInButton />
        }
    }

    render() {
        return (

            <AppBar position="static" style={styles.root}>
                <Toolbar>
                    <IconButton onClick={this.props.toggleDrawer} color="inherit" style={styles.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" style={styles.flex}>
                        {APP_TITLE}
                    </Typography>
                    {this.handleMenuState()}
                </Toolbar>
            </AppBar>

        );
    }
}
