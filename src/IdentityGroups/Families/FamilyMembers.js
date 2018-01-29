// Needs to be updated to take an Active vs. Pending state and adjust the format accordingly
// Pending user will take the current menu, Active menu should have: "Remove", "View", "Change Permissions"

import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';
import { IdentityListItem } from '../Identities/IdentityListItem';
import List from 'material-ui/List';
// import { isCurrentUser } from '../../Auth/AuthService';
import { InviteDialog } from './InviteDialog';
import { inviteFamilyMember } from './FamiliesAPI';
import Button from 'material-ui/Button/Button';

export class FamilyMembers extends Component {
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


            const members = []
            // Trying to handle for when no users are returned... Shouldn't happen, but don't want the UI to break if it does
            // if (!this.props.familyMembers === {}) {
                members.push(this.props.familyMembers.map((familyMember, i) => {
                    const user = familyMember.user
                    return (
                        <IdentityListItem
                            key={i}
                            user={user}
                            relations={familyMember.relations}
                            // Below test would work if members list returned uuids
                            // canEdit={!isCurrentUser(user.uuid) && this.props.isHeadOf} />
                            canEdit={true} />
                    )
                }))
            // }

            return (
                <div>
                    <List>
                        {members}
                    </List>
                    <div align="center">{membersActions}</div>
                    <InviteDialog
                        isOpen={this.state.inviteDialogOpen}
                        submitAction={this.handleInviteSubmit}
                        closeAction={this.closeInviteDialog} />
                </div>
            )
        }
    }
}