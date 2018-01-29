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
import { RELATIONSHIP_TYPES } from '../Families/_Config';
import {MembersListMenu} from './MembersListMenu'

export class MembersListItem extends Component {
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

        const rightIconMenu = (<MembersListMenu status={this.props.status}/>)

        return (
            <ListItem>
                <ListItemAvatar>
                    {props.user.givenName ? <Avatar>{props.user.givenName.charAt(0)}</Avatar> : null}
                </ListItemAvatar>
                <ListItemText
                    primary={props.user.givenName + ' ' + props.user.familyName}
                    secondary={this.props.status} />
                <ListItemSecondaryAction>
                    {props.canEdit ? rightIconMenu : null}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}