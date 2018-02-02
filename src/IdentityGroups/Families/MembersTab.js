// Needs to be updated to take an Active vs. Pending state and adjust the format accordingly
// Pending user will take the current menu, Active menu should have: "Remove", "View", "Change Permissions"

import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';
import MembersListItem from './MembersListItem';
import List from 'material-ui/List';
// import { isCurrentUser } from '../../Auth/AuthService';
import { MembersInviteDialog } from './MembersInviteDialog';
import { inviteFamilyMember } from './FamiliesAPI';
import Button from 'material-ui/Button/Button';
import { RELATIONSHIP_TYPES } from './_Config';

export class MembersTab extends Component {
    constructor() {
        super()
        this.state = {
            inviteDialogOpen: false,
        }
    }
    openInviteDialog = () => {
        this.setState({ inviteDialogOpen: true })
    }
    closeInviteDialog = () => {
        this.setState({ inviteDialogOpen: false })
    }

    handleInviteSubmit = () => {
        // This should be updated to use ControlledForm
        inviteFamilyMember(
            this.props.familyUUID,
            {
                "user": {
                    "email": document.getElementById('invitee_email_address').value,
                    "givenName": document.getElementById('invitee_given_name').value,
                    "familyName": document.getElementById('invitee_family_name').value,
                },
                "relationTypeCodes": [
                    document.getElementById('invitee_access_member').value === 'on' ? "IS_MEMBER_OF" : null,
                    document.getElementById('invitee_access_admin').value === 'on' ? "IS_HEAD_OF" : null,
                ]
            },
            (data) => this.setState({ inviteDialogOpen: false }),
            (errorMessage) => this.props.postMessage("ERROR INVITING USER: " + errorMessage)
        )
    }
    render() {

        if (this.props.isLoading) {
            return (
                <div align="center" >
                    <CircularProgress size={50} thickness={7} />
                </div>)
        } else {

            const membersActions = []
            if (this.props.isHeadOf) {
                membersActions.push(
                    <Button onClick={this.openInviteDialog} key='invite'>Invite Members</Button>)
            }

            const members = {}
            const membersList = []
            Object.entries(RELATIONSHIP_TYPES).map(([relationshipType, relationshipLabel]) => {
                members[relationshipType] = []
                this.props.familyMembers.map((familyMember, i) => {
                    const user = familyMember.user
                    familyMember.relations.map((relationship) => {
                        if (relationship.code === relationshipType) {
                            members[relationshipType].push(
                                <MembersListItem
                                    key={i}
                                    user={user}
                                    relations={familyMember.relations}
                                    status={relationship.status}
                                    // Below test would work if members list returned uuids
                                    // canEdit={!isCurrentUser(user.uuid) && this.props.isHeadOf} />
                                    canEdit={true} />
                            )
                        }
                    })
                })
                membersList.push(
                    <List>
                        {relationshipLabel+ 's'}
                        {members[relationshipType]}
                    </List>
                )
            })

            return (

                <div>
                    {membersList}
                    <div align="center">{membersActions}</div>
                    <MembersInviteDialog
                        isOpen={this.state.inviteDialogOpen}
                        submitAction={this.handleInviteSubmit}
                        closeAction={this.closeInviteDialog} />
                </div>
            )
        }
    }
}