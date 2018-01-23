import { callIdentityGroupAPI } from "../IdentityGroupsAPI";


export const getUsersFamilies = (userUUID, successFunction, errorFunction) => {
    const endpoint = '/users/' + userUUID + '/family'
    callIdentityGroupAPI(endpoint, {method: 'get'}, successFunction, errorFunction)
}

export const getFamilyInfo = (familyUUID, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID
    callIdentityGroupAPI(endpoint, {method: 'get'}, successFunction, errorFunction)
}

export const getFamilyMembers = (familyUUID, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID + '/users'
    callIdentityGroupAPI(endpoint, {method: 'get'}, successFunction, errorFunction)
}

export const updateFamilyInfo = (familyUUID, body, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID
    callIdentityGroupAPI(endpoint, {body: body, method: 'patch'}, successFunction, errorFunction)
}