import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import { Avatar, IconButton, IconMenu } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const realationshipTypes = {
    IS_HEAD_OF: 'Admin',
    IS_MEMBER_OF: 'Member'
}

const iconButtonElement = (
    <IconButton touch={true} >
        <MoreVertIcon />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Remove</MenuItem>
    </IconMenu>
);

export const IdentityListItem = (props) => {

    return (
        <ListItem key={props.user.uuid}
            disabled={true}
            leftAvatar={<Avatar>{props.user.givenName.charAt(0)}</Avatar>}
            primaryText={props.user.givenName + ' ' + props.user.familyName}
            secondaryText={props.relations.map(({ code }) => realationshipTypes[code])}
            rightIconButton={props.canEdit ? rightIconMenu : null} >
        </ListItem>
    )
}