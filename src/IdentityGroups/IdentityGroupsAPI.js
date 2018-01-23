import formurlencoded from 'form-urlencoded';

import { APP_DOMAIN, MIAA_AUTH_DOMAIN, CAPTURE_CLIENT_ID, IG_ACCESS_TOKEN, IG_BASEURL } from "../Config";
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
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    })
        .then((res) => { console.log(res) })
}

export const callIdentityGroupAPI = (endpoint, requestObj, successFunction, errorFunction) => {
    const accessToken = localStorage.getItem('identitygroups_access_token')
    requestObj.headers = { 'Authorization': 'Bearer ' + accessToken }

    if (['post', 'patch', 'put'].includes(requestObj.method.toLowerCase())) {
        requestObj.headers['Content-type'] = 'application/json'
    }

    console.info('PATH: '+ IG_BASEURL + endpoint + '\nINIT: ' + JSON.stringify(requestObj))

    fetch(IG_BASEURL + endpoint, requestObj)
        .then(res => {
            if (!res.ok) { throw res }
            return res.json()
        })
        .then((data) => successFunction(data))
        .catch(error => {
            if (!error.text) {errorFunction(error.message)} else {
            error.text().then((errorMessage) => errorFunction(errorMessage)) }})
}

export const keepIdentityGroupsTokenActive = () => {
    // const pgAccessToken = window.localStorage.getItem('identitygroups_access_token')
    // if (!pgAccessToken | isTokenExpired(pgAccessToken)) {
    if (!window.localStorage.getItem('identitygroups_access_token')) {
            //     const token = getIdentityGroupsToken()
            // console.log(token)
    }
    localStorage.setItem('identitygroups_access_token', IG_ACCESS_TOKEN)
}
