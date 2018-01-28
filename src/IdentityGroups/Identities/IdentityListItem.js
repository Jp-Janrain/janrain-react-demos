import React, { Component } from 'react';
import ListItem from 'material-ui/List/ListItem';
import { Avatar } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import DeleteIcon from 'material-ui-icons/Delete';
import { MoreIconMenu } from '../../Layout/MoreIconMenu';


const realationshipTypes = {
    IS_HEAD_OF: 'Admin',
    IS_MEMBER_OF: 'Member',
}

export class IdentityListItem extends Component {
    constructor() {
        super()
        this.state = {
            menuIsOpen: false,
            menuAnchorEl: null
        }
    }
    handleMenuOpen = (e) => {
        this.setState({ menuAnchorEl: e.currentTarget })
    }
    handleMenuClose = () => {
        this.setState({ menuAnchorEl: null });
    }


    render() {
        const { props } = this

        const rightIconMenu = (
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

        return (
            <ListItem>
                <ListItemAvatar>
                    {props.user.givenName ? <Avatar>{props.user.givenName.charAt(0)}</Avatar> : null}
                </ListItemAvatar>
                <ListItemText
                    primary={props.user.givenName + ' ' + props.user.familyName}
                    secondary={props.relations.map(({ code }) => realationshipTypes[code])} />
                <ListItemSecondaryAction>
                    {props.canEdit ? rightIconMenu : null}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}