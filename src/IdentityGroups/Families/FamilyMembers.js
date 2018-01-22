import React, { Component } from 'react';
import { CircularProgress, Dialog, FlatButton, TextField } from 'material-ui';
import { IdentityListItem } from '../Identities/IdentityListItem';
import { List } from 'material-ui/List';
import { isCurrentUser, currentUser } from '../../Auth/AuthService';

export class FamilyMembers extends Component {
    constructor() {
        super()
        this.state = {
            inviteDialogOpen: false,
        }
    }
    handleOpenInviteDialog = () => {
        this.setState({ inviteDialogOpen: true })
    }
    handleCloseInviteDialog = () => {
        this.setState({ inviteDialogOpen: false })
    }
    handleInviteSubmit = () => {
        this.setState({ inviteDialogOpen: false })
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
                    <FlatButton label="Invite Members" onClick={this.handleOpenInviteDialog} key='invite' />)
            }

            const inviteDialogActions = [
                <FlatButton
                    label="Cancel"
                    secondary={true}
                    onClick={this.handleCloseInviteDialog}
                />,
                <FlatButton
                    label="Submit"
                    primary={true}
                    disabled={false}
                    onClick={this.handleInviteSubmit}
                />,
            ]

            const members = []
            members.push(this.props.familyMembers.map((familyMember) => {
                const user = familyMember.user
                return (
                    <IdentityListItem
                    key={user.uuid}
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
                    <Dialog
                        title="Invite A Family Member"
                        actions={inviteDialogActions}
                        modal={true}
                        open={this.state.inviteDialogOpen} >
                        <TextField
                            id="invitee_given_name"
                            floatingLabelText="First Name"
                            fullWidth={true}
                        /> <br />
                        <TextField
                            id="invitee_family_name"
                            floatingLabelText="Last Name"
                            fullWidth={true}
                        /> <br />
                        <TextField
                            id="invitee_email_address"
                            floatingLabelText="Email Address"
                            fullWidth={true}
                        /> <br />
                    </Dialog>
                </div>
            )
        }
    }
}