import React from 'react'
import { MoreIconMenu } from '../../Layout/MoreIconMenu';
import MenuItem from 'material-ui/Menu/MenuItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import DeleteIcon from 'material-ui-icons/Delete';

export const InvitePendingMenu = () =>(
    <MoreIconMenu>
        <MenuItem onClick={this.handleMenuClose}>
            <ListItemIcon><SendIcon /></ListItemIcon>
            <ListItemText inset primary="Resend Invite" />
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
            <ListItemIcon><DraftsIcon /></ListItemIcon>
            <ListItemText inset primary="Edit Invite" />
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
            <ListItemIcon><DeleteIcon /></ListItemIcon>
            <ListItemText inset primary="Delete Invite" />
        </MenuItem>
    </MoreIconMenu>
)