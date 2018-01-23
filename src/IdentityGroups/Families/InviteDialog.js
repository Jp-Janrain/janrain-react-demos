import React from 'react'
import { Dialog, FlatButton, TextField, Checkbox } from 'material-ui';

export const InviteDialog = (props) => {

    const inviteDialogActions = [
        <FlatButton
            label="Cancel"
            secondary={true}
            onClick={props.closeAction}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            disabled={false}
            onClick={props.submitAction}
        />,
    ]

    return (
        <Dialog
            title="Invite A Family Member"
            actions={inviteDialogActions}
            modal={true}
            open={props.isOpen} >
            <TextField
                id="invitee_given_name"
                floatingLabelText="First Name"
                fullWidth={true} /> <br />
            <TextField
                id="invitee_family_name"
                floatingLabelText="Last Name"
                fullWidth={true} /> <br />
            <TextField
                id="invitee_email_address"
                floatingLabelText="Email Address"
                fullWidth={true} /> <br /> <br />
            Relations
            <Checkbox
                id='invitee_access_member'
                label='Member'
                checked={true}
                disabled={true} />
            <Checkbox
                id='invitee_access_admin'
                label='Admin' />
        </Dialog>
    )
}