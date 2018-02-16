import React from 'react'
import PropTypes from 'prop-types';

import { MoreIconMenu } from '../../Layout/MoreIconMenu';
import MenuItem from 'material-ui/Menu/MenuItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
// import DraftsIcon from 'material-ui-icons/Drafts';
import DeleteIcon from 'material-ui-icons/Delete';
import Settings from 'material-ui-icons/Settings';
import MembersListMenuResendInvite from './MembersListMenuResendInvite';
import MembersListMenuEditInvite from './MembersListMenuEditInvite';

export const MembersListMenu = (props) => {
    if (props.status === 'pending') {
        return (
            <MoreIconMenu closeOnClick={false}>
                <MembersListMenuResendInvite
                    user={props.user}
                    closeMoreIconMenu={props.closeMoreIconMenu} />
                <MembersListMenuEditInvite
                    user={props.user}
                    closeMoreIconMenu={props.closeMoreIconMenu} />
                <MenuItem onClick={props.closeMoreIconMenu}>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText inset primary="Delete Invite" />
                </MenuItem>
            </MoreIconMenu>
        )
    } else {
        return (
            <MoreIconMenu closeOnClick={true}>
                <MenuItem onClick={this.handleMenuClose}>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText inset primary="Edit Permissions" />
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText inset primary="Remove User" />
                </MenuItem>
            </MoreIconMenu>
        )
    }
}

MembersListMenu.propTypes = {
    user: PropTypes.object.isRequired,
    closeMoreIconMenu: PropTypes.func.isRequired,
};

export default MembersListMenu;