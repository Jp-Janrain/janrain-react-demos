import formurlencoded from 'form-urlencoded';

import { APP_DOMAIN, MIAA_AUTH_DOMAIN, CAPTURE_CLIENT_ID, PG_ACCESS_TOKEN } from "../Config";
import { getAccessToken, nonce } from "../AuthService";


const audiencePath = MIAA_AUTH_DOMAIN + '/auth?' + formurlencoded({
    audience: 'privategroups',
    scope: 'openid manage_family read_family manage_companies read_companies',
    prompt: 'none',
    client_id: CAPTURE_CLIENT_ID,
    response_type: 'id_token token',
    redirect_uri: APP_DOMAIN + '/callback',
    nonce: nonce(12),
})

export const getPrivateGroupsToken = () => {
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

export const keepPrivateGroupsTokenActive = () => {
    // const pgAccessToken = window.localStorage.getItem('privategroups_access_token')
    // if (!pgAccessToken | isTokenExpired(pgAccessToken)) {
    if (!window.localStorage.getItem('privategroups_access_token')) {
        //         const token = getPrivateGroupsToken()
        //     console.log(token)
    }
    localStorage.setItem('privategroups_access_token', PG_ACCESS_TOKEN)
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