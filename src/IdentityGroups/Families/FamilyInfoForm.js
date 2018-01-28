// The Form behavior should be broken out into its own component that handles all forms

import React, { Component } from 'react'
import { TextField } from 'material-ui'
import Button from 'material-ui/Button';
import { updateFamilyInfo } from './FamiliesAPI';
import { flattenNestedKeys } from '../IdentityGroupsAPI';
import { FAMILY_INFO_FORM_ATTRIBUTES } from './_Config';

export class FamilyInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            familyInfo: flattenNestedKeys(props.familyInfo),
            editingEnabled: false,
        }
        this.familyInfoInitialState = Object.assign({}, this.state.familyInfo)
    }
    hasFormChanged = () => {
        if (!this.state.familyInfo === this.familyInfoInitialState) { return true }
        return
    }
    handleEditAction = () => {
        this.setState({ editingEnabled: true })
    }
    handleSaveAction = () => {
        updateFamilyInfo(
            this.props.familyInfo.uuid,
            this.state.familyInfo,
            this.handleUpdateFamilyInfoSuccess, this.handleUpdateFamilyInfoError
        )
        this.setState({ editingEnabled: false })
    }
    handleCancelAction = () => {
        this.setState({ familyInfo: this.familyInfoInitialState })
        this.setState({ editingEnabled: false })
    }
    handleUpdateField = (e) => {
        const familyInfo = Object.assign({}, this.state.familyInfo)
        familyInfo[e.target.id] = e.target.value
        this.setState({ familyInfo: familyInfo })
    }
    handleUpdateFamilyInfoSuccess = (data) => {
        this.props.handleFamilyRename(data)
        this.props.handleUpdateInfo(data)
        this.setState({ renameDialogOpen: false })
    }
    handleUpdateFamilyInfoError = (errorMessage) => {
        console.log("ERROR LOADING FAMILY DETAILS: " + errorMessage)
    }
    render() {

        const addressActions = []
        if (this.props.canEdit) {
            if (!this.state.editingEnabled) {
                addressActions.push(
                    <Button onClick={this.handleEditAction} key='edit' >Edit</Button>)
            } else {
                addressActions.push(
                    <Button primary={true} onClick={this.handleSaveAction} key='save' >Save</Button>,
                    <Button secondary={true} onClick={this.handleCancelAction} key='cancel' >Cancel</Button>)
            }
        }

        const formAttributes = FAMILY_INFO_FORM_ATTRIBUTES

        const fields = []
        fields.push(formAttributes.map((field) => {
            return (
                <TextField
                    key={field.attribute}
                    id={field.attribute}
                    label={field.label}
                    value={this.state.familyInfo[field.attribute] ? this.state.familyInfo[field.attribute] : ''}
                    disabled={!this.state.editingEnabled}
                    fullWidth
                    onChange={field.customValidation ? field.customValidation : this.handleUpdateField} />)
        }))

        return (
            <div>
                {fields}
                <div align="center">{addressActions}</div>
            </div>

        )
    }
}
