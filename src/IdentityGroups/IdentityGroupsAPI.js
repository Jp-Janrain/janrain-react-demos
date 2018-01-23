import { IG_BASEURL } from "../Config";
import { isTokenExpired } from "../Auth/AuthService";


export const callIdentityGroupAPI = (endpoint, requestObj, successFunction, errorFunction) => {
    const accessToken = localStorage.getItem('privategroups_access_token')
    requestObj.headers = { 'Authorization': 'Bearer ' + accessToken }

    if (['post', 'patch', 'put'].includes(requestObj.method.toLowerCase())) {
        requestObj.headers['Content-type'] = 'application/json'
    }

    console.info('PATH: ' + IG_BASEURL + endpoint + '\nINIT: ' + JSON.stringify(requestObj))

    fetch(IG_BASEURL + endpoint, requestObj)
        .then(res => {
            if (!res.ok) { throw res }
            return res.json()
        })
        .then((data) => successFunction(data))
        .catch(error => {
            if (!error.text) { errorFunction(error.message) } else {
                error.text().then((errorMessage) => errorFunction(errorMessage))
            }
        })
}

export const keepIdentityGroupsTokenActive = () => {
    const pgAccessToken = window.localStorage.getItem('privategroups_access_token')
    if (!pgAccessToken | isTokenExpired(pgAccessToken)) {
        //     Do a token refresh here
        alert('token error to come')
    }
}

