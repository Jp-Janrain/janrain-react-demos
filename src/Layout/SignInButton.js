import React from 'react';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import { login } from '../Auth/AuthService';

const style = { color: "#fff" }

export const SignInButton = () => {
    return (
        <Button
            target="_self"
            onClick={login}
            icon={<Icon className="material-icons" >perm_identity</Icon>}
            style={style}>
            Sign In
        </Button>
    )
}
