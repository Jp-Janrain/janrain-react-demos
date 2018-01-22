import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import { login } from '../Auth/AuthService';

const style = { color: "#fff" }

export const SignInButton = () => {
    return (
        <FlatButton
            label="Sign In"
            target="_self"
            onClick={login}
            icon={<FontIcon className="material-icons" >perm_identity</FontIcon>}
            style={style} />
    )
}
