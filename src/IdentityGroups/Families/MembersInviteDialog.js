import React from 'react'
import { Dialog, TextField, Checkbox } from 'material-ui';
import Button from 'material-ui/Button';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import FormGroup from 'material-ui/Form/FormGroup';
import FormControlLabel from 'material-ui/Form/FormControlLabel';

export const MembersInviteDialog = (props) => {

    const inviteDialogActions = [
        <Button
            color='secondary'
            onClick={props.closeAction}
        > Cancel</Button>,
        <Button
            color='primary'
            onClick={props.submitAction}
        > Submit</Button>
    ]

    return (
        <Dialog open={props.isOpen} onClose={props.closeAction}>
            <DialogTitle>Invite A Family Member</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <TextField
                            id="invitee_given_name"
                            label="First Name"
                            fullWidth={true} />
                    </ListItem>
                    <ListItem>
                        <TextField
                            id="invitee_family_name"
                            label="Last Name"
                            fullWidth={true} /></ListItem>
                    <ListItem>
                        <TextField
                            id="invitee_email_address"
                            label="Email Address"
                            fullWidth={true} /> <br /> <br /></ListItem>
                    Relations
                    <ListItem>
                        <FormGroup row>
                            <FormControlLabel label='Member' disabled
                                control={<Checkbox
                                    checked
                                    id='invitee_access_member' />}
                            />
                            <FormControlLabel label='Admin'
                                control={<Checkbox id='invitee_access_admin' />}
                            />
                        </FormGroup>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>{inviteDialogActions}</DialogActions>
        </Dialog>
    )
}