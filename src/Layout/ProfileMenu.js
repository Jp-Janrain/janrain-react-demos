import React from 'react'
import Popover from 'material-ui/Popover/Popover';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { Avatar } from 'material-ui';
import MenuList from 'material-ui/Menu/MenuList';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';

export const ProfileMenu = (props) => {
    return (
        <Popover
            open={props.isVisible}
            anchorEl={props.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            onClose={props.hideMenu} >
            <MenuList >
                <Link to="profile">
                    <MenuItem onClick={props.hideMenu} >
                        <ListItemText primary="Edit Profile" />
                    </MenuItem>
                </Link>
                <Link to="invitations">
                    <MenuItem onClick={props.hideMenu}>
                        <ListItemText primary="Manage Invites" />
                        {props.invitations ? (<ListItemIcon><Avatar >{props.invitations.length}</Avatar></ListItemIcon>) : null}
                    </MenuItem>
                </Link>
                <MenuItem onClick={props.handleSignOut} >
                    <ListItemText primary="Sign Out" />
                </MenuItem>
            </MenuList>
        </Popover>
    );
}
