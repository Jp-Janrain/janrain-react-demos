import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from 'material-ui/Menu/MenuItem';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';
import DraftsIcon from 'material-ui-icons/Drafts';
import Dialog from 'material-ui/Dialog/Dialog';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogActions from 'material-ui/Dialog/DialogActions';
import Button from 'material-ui/Button/Button';
import { flattenNestedKeys } from '../IdentityGroupsAPI';
import ControlledForm from '../../Layout/ControlledForm';


class MemberMenuItemEditInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogIsOpen: false,
            dialogIsLoading: false,
            dialogFormValue: {},
        }
    }
    closeDialog = () => {
        this.setState({ dialogIsOpen: false })
        this.props.closeMoreIconMenu()
    }
    openDialog = () => {
        this.setState({ dialogIsOpen: true })
    }
    updateInvite = () => {
        this.closeDialog()
        // TODO:
        // Using dialogFormValue submit change to API
    }
    onFormUpdate = (formValue) => {
        this.setState({dialogFormValue: formValue})
        // TODO:
        // Fix the fact that currently this is one state behind
    }

    render() {
        const { user } = this.props
        const userInfo = flattenNestedKeys(user)
        const fields = []
        Object.keys(userInfo).map((attributePath) => {
            fields.push({
                defaultValue: userInfo[attributePath],
                attributePath: attributePath,
                // TODO:
                // Handle assigning a value for field labels
            })
        })

        return (
            <div>
                <MenuItem onClick={this.openDialog}>
                    <ListItemIcon><DraftsIcon /></ListItemIcon>
                    <ListItemText inset primary="Edit Invite" />
                </MenuItem>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.closeDialog} >
                    <DialogTitle>Edit {user.givenName ? user.givenName + "'s " : ""} Invite</DialogTitle>
                    <DialogContent>
                        <div>
                            <ControlledForm
                                fieldDefinitions={fields}
                                hideDynamicButtons={true}
                                onUpdate={this.onFormUpdate}
                                loading={this.state.dialogIsLoading} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.updateInvite} raised color="primary"> Update Invite </Button>
                        <Button onClick={this.closeDialog} color="primary" autoFocus>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

MemberMenuItemEditInvite.propTypes = {
    user: PropTypes.object.isRequired
};

export default MemberMenuItemEditInvite;
