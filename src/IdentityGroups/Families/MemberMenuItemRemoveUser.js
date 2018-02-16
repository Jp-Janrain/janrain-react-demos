import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from 'material-ui/Menu/MenuItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import DeleteIcon from 'material-ui-icons/Delete';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogActions from 'material-ui/Dialog/DialogActions';
import Button from 'material-ui/Button/Button';


class MemberMenuItemRemoveUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogIsOpen: false
        }
    }
    closeDialog = () => {
        this.setState({ dialogIsOpen: false })
        this.props.closeMoreIconMenu()
    }
    openDialog = () => {
        this.setState({ dialogIsOpen: true })
    }
    resendInvite = () => {
        this.closeDialog()
        // Make API call to resend invite email is currently unsupported behavior
    }

    render() {
        const { user } = this.props
        return (
            <div>
                <MenuItem onClick={this.openDialog}>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText inset primary="Remove User" />
                </MenuItem>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.closeDialog} >
                    <DialogTitle>Please Confirm</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you wish to remove {user.givenName + ' ' + user.familyName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.resendInvite} raised color="primary"> Remove User </Button>
                        <Button onClick={this.closeDialog} color="primary" autoFocus>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

MemberMenuItemRemoveUser.propTypes = {
    user: PropTypes.shape({
        givenName: PropTypes.string.isRequired,
        familyName: PropTypes.string.isRequired,
    })
};

export default MemberMenuItemRemoveUser;
