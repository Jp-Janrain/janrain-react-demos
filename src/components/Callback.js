import React from 'react'
import Redirect from 'react-router-dom/Redirect';

import { setAuthParam, ID_TOKEN_KEY, ACCESS_TOKEN_KEY } from '../AuthService';

export const Callback = (props) => {
    setAuthParam('access_token', ACCESS_TOKEN_KEY);
    setAuthParam('id_token', ID_TOKEN_KEY);
    return (
        <Redirect to={{pathname: '/', state: { from: props.location }}} />
    );
}
