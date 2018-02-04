import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from 'material-ui/Menu/MenuItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import SendIcon from 'material-ui-icons/Send';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogActions from 'material-ui/Dialog/DialogActions';
import Button from 'material-ui/Button/Button';


class MembersListMenuResendInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogIsOpen: false
        }
    }
    handleDialogState = () => {
        this.setState({ dialogIsOpen: !this.state.dialogIsOpen })
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <MenuItem onClick={this.handleDialogState}>
                    <ListItemIcon><SendIcon /></ListItemIcon>
                    <ListItemText inset primary="Resend Invite" />
                </MenuItem>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.handleDialogState} >
                    <DialogTitle>Please Confirm</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you wish to resend an invite to {user.givenName + ' ' + user.familyName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogState} raised color="primary"> Resend Invite </Button>
                        <Button onClick={this.handleDialogState} color="primary" autoFocus>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

MembersListMenuResendInvite.propTypes = {
    user: PropTypes.shape({
        givenName: PropTypes.string.isRequired,
        familyName: PropTypes.string.isRequired,
    })
};

export default MembersListMenuResendInvite;
