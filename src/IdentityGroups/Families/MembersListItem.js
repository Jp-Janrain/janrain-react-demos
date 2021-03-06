import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from 'material-ui/List/ListItem';
import { Avatar } from 'material-ui';
import ListItemAvatar from 'material-ui/List/ListItemAvatar';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import ListItemText from 'material-ui/List/ListItemText';
import MemberMenuPending from './MemberMenuPending';
import MemberMenuActive from './MemberMenuActive';

class MembersListItem extends Component {

    render() {
        const { props } = this
        const { user } = props

        const rightIconMenu = (props.status === 'active' ?
            <MemberMenuActive user={user} /> : <MemberMenuPending user={user} />)

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

}

MembersListItem.propTypes = {
    user: PropTypes.shape({
        givenName: PropTypes.string.isRequired,
        familyName: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.oneOf(['active', 'pending']).isRequired,
    canEdit: PropTypes.bool.isRequired,
}

export default MembersListItem