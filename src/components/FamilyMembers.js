import React, { Component } from 'react';
import { CircularProgress, TableRowColumn, Dialog, FlatButton, TextField } from 'material-ui';
import { Table } from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableRow from 'material-ui/Table/TableRow';

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
                    <FlatButton label="Invite Members" onClick={this.handleOpenInviteDialog} key='invite'/>)
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
                    <TableRow key={user.uuid}>
                        <TableRowColumn>{user.givenName + ' ' + user.familyName}</TableRowColumn>
                        <TableRowColumn>{user.primaryAddress.mobile} </TableRowColumn>
                    </TableRow>
                )
            }))

            return (
                <div>
                    <Table selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                            {members}
                        </TableBody>
                    </Table>
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