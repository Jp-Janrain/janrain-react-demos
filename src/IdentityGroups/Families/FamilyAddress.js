import React, { Component } from 'react';
import { TextField, CircularProgress, FlatButton, Dialog } from 'material-ui'
import { IG_ENDPOINT } from '../../Config';

export class FamilyAddresses extends Component {
    constructor() {
        super()
        this.state = {
            editingEnabled: false,
            renameDialogOpen: false,
        }
    }
    handleEditAction = () => {
        this.setState({ editingEnabled: true })
    }
    handleSaveAction = () => {
        this.setState({ editingEnabled: false })
    }
    handleCancelAction = () => {
        this.setState({ editingEnabled: false })
    }
    handleOpenRenameDialog = () => {
        this.setState({ renameDialogOpen: true })
    }
    handleCloseRenameDialog = () => {
        this.setState({ renameDialogOpen: false })
    }
    handleRenameSubmit = () => {
        const familyName = document.getElementById('family_name_update').value
        const description = document.getElementById('family_description_update').value
        const accessToken = window.localStorage.getItem('identitygroups_access_token')
        fetch(IG_ENDPOINT + '/family/' + this.props.familyDetails.uuid, {
            method: 'patch',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-type': 'application/json',
            },
            body: {
                familyName: familyName,
                description: description,
            }
        })
            .then(res => {
                if (!res.ok) { throw res }
                return res.json()
            })
            .then(data => {
                this.setState({ renameDialogOpen: false })
            })
            .catch(error => {
                error.text().then(errorMessage => {
                    console.log("ERROR LOADING FAMILY DETAILS: " + errorMessage)
                })
            })
    }
    render() {
        const props = this.props
        const familyDetails = props.familyDetails
        const address = familyDetails.familyAddress

        if (this.props.isLoading) {
            return (
                <div align="center">
                    <CircularProgress size={50} thickness={7} />
                </div>)
        } else {

            const addressActions = []
            if (this.props.isHeadOf) {
                if (!this.state.editingEnabled) {
                    addressActions.push(
                        <FlatButton label="Edit" onClick={this.handleEditAction} key='edit' />,
                        <FlatButton label="Rename" onClick={this.handleOpenRenameDialog} key='rename' />)
                } else {
                    addressActions.push(
                        <FlatButton label='Save' primary={true} onClick={this.handleSaveAction} key='save' />,
                        <FlatButton label='Cancel' secondary={true} onClick={this.handleCancelAction} key='cancel'/>)
                }
            }

            const renameDialogActions = [
                <FlatButton
                    label="Cancel"
                    secondary={true}
                    onClick={this.handleCloseRenameDialog}
                />,
                <FlatButton
                    label="Submit"
                    primary={true}
                    disabled={false}
                    onClick={this.handleRenameSubmit}
                />,
            ]

            return (
                <div>
                    <TextField
                        id="family_address_address1"
                        floatingLabelText="Address 1"
                        defaultValue={address.address1 ? address.address1 : null}
                        disabled={!props.editingEnabled}
                        fullWidth={true}
                    /> <br />
                    <TextField
                        id="family_address_address2"
                        floatingLabelText="Address 2"
                        defaultValue={address.address2 ? address.address2 : null}
                        disabled={!props.editingEnabled}
                        fullWidth={true}
                    /> <br />
                    <TextField
                        id="family_address_city"
                        floatingLabelText="City"
                        defaultValue={address.city ? address.city : null}
                        disabled={!props.editingEnabled}
                        fullWidth={true}
                    /> <br />
                    <TextField
                        id="family_address_country"
                        floatingLabelText="Country"
                        defaultValue={address.country ? address.country : null}
                        disabled={!props.editingEnabled}
                        fullWidth={true}
                    /> <br />
                    <TextField
                        id="family_address_zip"
                        floatingLabelText="Zip"
                        defaultValue={address.zip ? address.zip : null}
                        disabled={!props.editingEnabled}
                        fullWidth={true}
                    /> <br />
                    <TextField
                        id="family_address_phone"
                        floatingLabelText="Phone"
                        defaultValue={address.phone ? address.phone : null}
                        disabled={!props.editingEnabled}
                        fullWidth={true}
                    /> <br />
                    <TextField
                        fullWidth={true}
                        id="family_address_email"
                        floatingLabelText="Email"
                        defaultValue={address.email ? address.email : null}
                        disabled={!props.editingEnabled}
                    /> <br />
                    <div align="center">{addressActions}</div>
                    <Dialog
                        title="Rename Family"
                        actions={renameDialogActions}
                        modal={true}
                        open={this.state.renameDialogOpen} >
                        <TextField
                            id="family_name_update"
                            floatingLabelText="Family Name"
                            defaultValue={familyDetails.familyName ? familyDetails.familyName : null}
                            fullWidth={true}
                        /> <br />
                        <TextField
                            id="family_description_update"
                            floatingLabelText="Description"
                            defaultValue={familyDetails.description ? familyDetails.description : null}
                            fullWidth={true}
                        /> <br />
                    </Dialog>
                </div>
            )
        }
    }
}
