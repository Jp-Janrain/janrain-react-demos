import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import decode from 'jwt-decode';

import { APP_TITLE } from '../Config'
import { ProfileButton } from './ProfileButton';
import { ProfileMenu } from './ProfileMenu';
import { SignInButton } from './SignInButton';
import { isLoggedIn, getIdToken, logout, currentUserUUID } from '../Auth/AuthService';
import { getUsersInvites } from '../IdentityGroups/Families/FamiliesAPI';

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
        // this.handleMenuState = this.handleMenuState.bind(this);
        // this.handleSignOut = this.handleSignOut.bind(this);
        this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        this.hideProfileMenu = this.hideProfileMenu.bind(this);
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
                        displayName={state.user.displayName}
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
            <div>
                <AppBar
                    title={APP_TITLE}
                    iconElementRight={this.handleMenuState()}
                    showMenuIconButton={true}
                    onLeftIconButtonClick={this.props.toggleDrawer}
                />
            </div>
        );
    }
}
