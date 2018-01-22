import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import decode from 'jwt-decode';

import { ProfileButton } from './ProfileButton';
import { ProfileMenu } from './ProfileMenu';
import { SignInButton } from './SignInButton';
import { isLoggedIn, getIdToken, logout } from '../AuthService';

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
        }
        this.handleMenuState = this.handleMenuState.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
        this.hideProfileMenu = this.hideProfileMenu.bind(this);
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
                        onClick={(e) => this.toggleProfileMenu(e)} />
                    <ProfileMenu
                        handleSignOut={this.handleSignOut}
                        isVisible={state.profileMenu.isOpen}
                        hideMenu={this.hideProfileMenu}
                        anchorEl={state.profileMenu.anchorEl} />
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
                    title="Janrain Private Groups Demo"
                    iconElementRight={this.handleMenuState()}
                    showMenuIconButton={true}
                    onLeftIconButtonClick={this.props.toggleDrawer}
                />
            </div>
        );
    }
}
