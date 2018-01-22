import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import { FamilyAddresses } from './FamilyAddress';
import { TextField, FlatButton, CircularProgress, Dialog } from 'material-ui';
import { FamilyMembers } from './FamilyMembers';
import { PG_ENDPOINT } from '../Config';


export class FamilyDetails extends Component {
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
        const accessToken = window.localStorage.getItem('privategroups_access_token')
        fetch(PG_ENDPOINT + '/family/' + this.props.familyDetails.uuid, {
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
        const addressActions = []

        if (this.props.isHeadOf) {
            if (!this.state.editingEnabled) {
                addressActions.push(
                    <FlatButton label="Edit" onClick={this.handleEditAction} />,
                    <FlatButton label="Rename" onClick={this.handleOpenRenameDialog} />)
            } else {
                addressActions.push(
                    <FlatButton label='Save' primary={true} onClick={this.handleSaveAction} />,
                    <FlatButton label='Cancel' secondary={true} onClick={this.handleCancelAction} />)
            }
        }

        const addressTab = []
        if (this.props.isLoadingDetails) {
            addressTab.push(
                <div align="center">
                    <CircularProgress size={50} thickness={7} />
                </div>)
        } else {
            addressTab.push(
                <FamilyAddresses
                    familyDetails={this.props.familyDetails}
                    editingEnabled={this.state.editingEnabled} />

            )
            addressTab.push(<div align="center">{addressActions}</div>)
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
                <Tabs >
                    <Tab
                        icon={<FontIcon className="material-icons">people</FontIcon>}
                        label="Members">
                        <FamilyMembers
                            isLoading={props.isLoadingMembers}
                            familyMembers={this.props.familyMembers}
                            isHeadOf={props.isHeadOf} />
                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">phone</FontIcon>}
                        label="Contact Info" >
                        {addressTab}
                    </Tab>
                    <Tab
                        icon={<FontIcon className="material-icons">devices_other</FontIcon>}
                        label="Devices" >
                    </Tab>
                </Tabs>
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
            </div >
        )
    }
}

