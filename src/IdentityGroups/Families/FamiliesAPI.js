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
    const endpoint = '/family/' + familyUUID + '/users?status=pending,active'
    callIdentityGroupAPI(endpoint, {method: 'GET'}, successFunction, errorFunction)
}

export const inviteFamilyMember = (familyUUID, body, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID + '/users'
    callIdentityGroupAPI(endpoint, {body: JSON.stringify(body), method: 'POST'}, successFunction, errorFunction)
}

export const updateFamilyInfo = (familyUUID, body, successFunction, errorFunction) => {
    const endpoint = '/family/' + familyUUID
    callIdentityGroupAPI(endpoint, {body: JSON.stringify(expandFlatKeys(body)), method: 'PATCH'}, successFunction, errorFunction)
}

export const getUsersInvites = (userUUID, successFunction, errorFunction) => {
    // Get a list of received invites for a specific user
    // https://documenter.getpostman.com/view/1472660/private-groups/6tXaRfK#fb144d80-1e92-2509-9aa1-c679bb522195
    const endpoint = '/users/' + userUUID + '/invitations?type=received'
    callIdentityGroupAPI(endpoint, {method: 'GET'}, successFunction, errorFunction)
}