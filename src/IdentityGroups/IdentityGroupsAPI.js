import formurlencoded from 'form-urlencoded';

import { APP_DOMAIN, MIAA_AUTH_DOMAIN, CAPTURE_CLIENT_ID, IG_ACCESS_TOKEN } from "../Config";
import { getAccessToken, nonce } from "../Auth/AuthService";


const audiencePath = MIAA_AUTH_DOMAIN + '/auth?' + formurlencoded({
    audience: 'privategroups',
    scope: 'openid manage_family read_family manage_companies read_companies',
    prompt: 'none',
    client_id: CAPTURE_CLIENT_ID,
    response_type: 'id_token token',
    redirect_uri: APP_DOMAIN + '/callback',
    nonce: nonce(12),
})

export const getIdentityGroupsToken = () => {
    const accessToken = getAccessToken()
    fetch(audiencePath, {
        method: 'get',
        mode: 'no-cors',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    })
        .then((res) => { console.log(res) })
}

export const keepIdentityGroupsTokenActive = () => {
    // const pgAccessToken = window.localStorage.getItem('identitygroups_access_token')
    // if (!pgAccessToken | isTokenExpired(pgAccessToken)) {
    if (!window.localStorage.getItem('identitygroups_access_token')) {
        //         const token = getIdentityGroupsToken()
        //     console.log(token)
    }
    localStorage.setItem('identitygroups_access_token', IG_ACCESS_TOKEN)
}


export const FAMILY_CREATE = {
    "carnet": {
        "familyName": "Rowan",
        "description": "An awesome family named Rowan"
    }
}

export const FAMILY_INVITE = {
    "user": {
        "email": "jp@jprowan.com"
    },
    "relationTypeCodes": [
        "IS_MEMBER_OF"
    ]
}

export const FAMILY_MEMBERS = [
    {
        "user": {
            "givenName": "Jim",
            "familyName": "Example",
            "title": null,
            "primaryAddress": {
                "mobile": null
            }
        },
        "relations": [
            {
                "status": "active",
                "code": "IS_HEAD_OF"
            }
        ]
    }
]