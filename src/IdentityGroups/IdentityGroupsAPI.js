import { IG_BASEURL } from "../Config";
import { isTokenExpired } from "../Auth/AuthService";


export const callIdentityGroupAPI = (endpoint, requestObj, successFunction, errorFunction) => {
    const accessToken = localStorage.getItem('privategroups_access_token')
    requestObj.headers = { 'Authorization': 'Bearer ' + accessToken }

    if (['post', 'patch', 'put'].includes(requestObj.method.toLowerCase())) {
        requestObj.headers['Content-type'] = 'application/json'
    }

    // console.info('PATH: ' + IG_BASEURL + endpoint + '\nINIT: ' + JSON.stringify(requestObj))

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

export const flattenNestedKeys = (obj, parent) => {
    const newObj = {}
    Object.entries(obj).map(([key, item]) => {
        if ((typeof item === 'object') && item !== null) {
            Object.assign(newObj, flattenNestedKeys(item, key))
        } else {
            if (parent) {
                newObj[parent + '.' + key] = item
            } else {
                newObj[key] = item
            }
        }
        return null
    })
    return newObj
}

export const expandFlatKeys = (obj, parent) => {
    const newObj = {}
    Object.entries(obj).map(([key, item]) => {
        const splitKey = key.split('.')
        if (splitKey.length === 2) {
            if (!newObj[splitKey[0]]) {newObj[splitKey[0]] = {}}
            newObj[splitKey[0]][splitKey[1]] = item
        } else {
            newObj[key] = item
        }
        return null
    })
    return newObj
}
