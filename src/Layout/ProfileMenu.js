import React from 'react'
import Popover from 'material-ui/Popover/Popover';
import Menu from 'material-ui/Menu/Menu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import { Link } from 'react-router-dom';

export const ProfileMenu = (props) => {
    return (
        <Popover
            open={props.isVisible}
            anchorEl={props.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onRequestClose={props.hideMenu} >
            <Menu>
                <MenuItem
                    primaryText="Edit Profile"
                    onClick={props.hideMenu}
                    containerElement={
                        <Link to="profile" />
                    }
                />
                <MenuItem
                    primaryText="Sign Out"
                    onClick={props.handleSignOut}
                />
            </Menu>
        </Popover>
    );
}
