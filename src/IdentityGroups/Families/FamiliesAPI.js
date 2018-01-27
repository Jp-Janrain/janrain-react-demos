import { callIdentityGroupAPI, expandFlatKeys } from "../IdentityGroupsAPI";


export const getUsersFamilies = (userUUID, successFunction, errorFunction) => {
    const endpoint = '/users/' + userUUID + '/family'
    callIdentityGroupAPI(endpoint, {method: 'GET'}, successFunction, errorFunction)
}

export const getFamilyInfo = (familyUUID, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID
    callIdentityGroupAPI(endpoint, {method: 'GET'}, successFunction, errorFunction)
}

export const getFamilyMembers = (familyUUID, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID + '/users'
    callIdentityGroupAPI(endpoint, {method: 'GET'}, successFunction, errorFunction)
}

export const inviteFamilyMember = (familyUUID, body, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID + '/users'
    callIdentityGroupAPI(endpoint, {body: JSON.stringify(expandFlatKeys(body)), method: 'POST'}, successFunction, errorFunction)
}

export const updateFamilyInfo = (familyUUID, body, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID
    callIdentityGroupAPI(endpoint, {body: JSON.stringify(expandFlatKeys(body)), method: 'PATCH'}, successFunction, errorFunction)
}