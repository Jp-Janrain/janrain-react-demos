import React from 'react'
import Icon from 'material-ui/Icon/Icon';
import Button from 'material-ui/Button';


export const ProfileButton = (props) => {
    return (
        <Button onClick={props.onClick} color="inherit">
            {props.displayName}
            <Icon >{props.notifications ? 'notifications' : 'perm_identity'}</Icon>
        </Button>
    );
}
