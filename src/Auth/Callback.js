import React from 'react'
import Redirect from 'react-router-dom/Redirect';

import { setAuthParam, ID_TOKEN_KEY, ACCESS_TOKEN_KEY, login, getToken } from './AuthService';

export const Callback = (props) => {
    const audience = props.match.params.audience ? props.match.params.audience : null
    setAuthParam('access_token', audience ? audience + '_access_token' : '_access_token');
    setAuthParam('id_token', audience ? audience + '_id_token' : '_id_token');
    if (!audience) {
        getToken('privategroups', 'openid profile manage_family read_family manage_companies read_companies')
    }
    return (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    );
}
