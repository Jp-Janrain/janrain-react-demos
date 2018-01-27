import React from 'react'
import FlatButton from 'material-ui/FlatButton/FlatButton';
import FontIcon from 'material-ui/FontIcon/FontIcon';

const style = { color: "#fff" }

export const ProfileButton = (props) => {
    return (
        <FlatButton
            label={props.displayName}
            icon={<FontIcon className="material-icons" >{props.notifications? 'notifications' : 'perm_identity'}</FontIcon>}
            onClick={props.onClick}
            style={style} />
    );
}
