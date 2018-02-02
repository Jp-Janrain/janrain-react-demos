import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from 'material-ui/List/ListItem';
import { Avatar } from 'material-ui';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import ListItemText from 'material-ui/List/ListItemText';
import { MembersListMenu } from './MembersListMenu'

export default class MembersListItem extends Component {

    constructor() {
        super()
        this.state = {
            menuIsOpen: false,
            menuAnchorEl: null
        }
    }

    render() {
        const { props } = this

        const rightIconMenu = (<MembersListMenu status={props.status} />)

        return (
            <ListItem>
                <ListItemAvatar>
                    {props.user.givenName ? <Avatar>{props.user.givenName.charAt(0)}</Avatar> : null}
                </ListItemAvatar>
                <ListItemText
                    primary={props.user.givenName + ' ' + props.user.familyName}
                    secondary={props.status} />
                <ListItemSecondaryAction>
                    {props.canEdit ? rightIconMenu : null}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    propTypes = {
        user: PropTypes.shape({
            givenName: PropTypes.string.isRequired,
            familyName: PropTypes.string.isRequired,
        }).isRequired,
        status: PropTypes.oneOf(['active', 'pending']).isRequired,
        canEdit: PropTypes.bool.isRequired,
    }
}


