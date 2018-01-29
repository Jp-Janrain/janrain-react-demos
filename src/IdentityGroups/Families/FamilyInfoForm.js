
import React, { Component } from 'react'
import { TextField } from 'material-ui'
import Button from 'material-ui/Button';
import { updateFamilyInfo } from './FamiliesAPI';
import { flattenNestedKeys } from '../IdentityGroupsAPI';
import { FAMILY_INFO_FORM_ATTRIBUTES } from './_Config';
import ControlledForm from '../../Layout/ControlledForm'
import { NotificationSnackbar } from '../../Layout/NotificationSnackbar';
import { ErrorMessageWithRedirect } from '../../Layout/ErrorMessageWithRedirect';

export class FamilyInfoForm extends Component {
    state = {
        loading: false,
        notifications: [],
    }
    handleSaveAction = (formValue) => {
        this.setState({ loading: true })
        updateFamilyInfo(
            this.props.familyInfo.uuid,
            formValue,
            this.handleUpdateFamilyInfoSuccess,
            this.handleUpdateFamilyInfoError
        )
    }
    handleUpdateFamilyInfoSuccess = (data) => {
        const notifications = this.state.notifications.concat("Family successfully updated")
        this.props.handleUpdateInfo(data)
        this.setState({ loading: false, notification })
    }
    handleUpdateFamilyInfoError = (errorMessage) => {
        const notifications = this.state.notifications.concat("ERROR UPDATING FAMILY DETAILS: " + errorMessage)
        this.setState({ loading: false, notifications })
    }
    render() {

        const formAttributes = FAMILY_INFO_FORM_ATTRIBUTES
        const familyInfo = flattenNestedKeys(this.props.familyInfo)

        const fields = []
        formAttributes.map((field) => {
            field.defaultValue = familyInfo[field.attribute] ? familyInfo[field.attribute] : ''
            fields.push(field)
        })

        const notifications = []
        if (this.state.notifications) {
            this.state.notifications.map((notification) => {
                notifications.push(<NotificationSnackbar message={notification} />)
            })
        }

        return (
            <div>
                {notifications}
                <ControlledForm
                    fieldDefinitions={fields}
                    onSave={this.handleSaveAction}
                    editingEnabled={this.props.canEdit}
                    loading={this.state.loading} />
            </div>


        )
    }
}
