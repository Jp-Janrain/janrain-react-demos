import React, { Component } from 'react';
import { CircularProgress, FlatButton } from 'material-ui';
import { IdentityListItem } from '../Identities/IdentityListItem';
import { List } from 'material-ui/List';
import { isCurrentUser } from '../../Auth/AuthService';
import { InviteDialog } from './InviteDialog';
import { inviteFamilyMember } from './FamiliesAPI';

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
    handleInviteSuccess = (data) => {
        this.setState({ inviteDialogOpen: false })
    }
    handleInviteError = (errorMessage) => {
        console.log("ERROR INVITING USER: " + errorMessage)
    }
    handleInviteSubmit = () => {

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
                    document.getElementById('invitee_access_admin').value === 'on' ? "IS_MEMBER_OF" : null,
                ]
            },
            this.handleInviteSuccess,
            this.handleInviteError
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
                    <FlatButton label="Invite Members" onClick={this.openInviteDialog} key='invite' />)
            }


            const members = []
            members.push(this.props.familyMembers.map((familyMember, i) => {
                const user = familyMember.user
                return (
                    <IdentityListItem
                        key={i}
                        user={user}
                        relations={familyMember.relations}
                        // Below test would work if members list returned uuids
                        canEdit={!isCurrentUser(user.uuid) && this.props.isHeadOf} />
                )
            }))

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