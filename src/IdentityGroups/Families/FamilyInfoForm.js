
import React, { Component } from 'react'
import { updateFamilyInfo } from './FamiliesAPI';
import { flattenNestedKeys } from '../IdentityGroupsAPI';
import { FAMILY_INFO_FORM_ATTRIBUTES } from './_Config';
import ControlledForm from '../../Layout/ControlledForm'

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
            (data) => {
                this.props.postMessage("Family successfully updated")
                this.setState({ loading: false})
                this.props.handleUpdateInfo(data)
            },
            (errorMessage) => {
                this.props.postMessage("ERROR UPDATING FAMILY DETAILS: " + errorMessage)
                this.setState({ loading: false})
            }
        )
    }

    render() {
        const formAttributes = FAMILY_INFO_FORM_ATTRIBUTES
        const familyInfo = flattenNestedKeys(this.props.familyInfo)
        const fields = []
        // eslint-disable-next-line
        formAttributes.map((field) => {
            field.defaultValue = familyInfo[field.attribute] ? familyInfo[field.attribute] : ''
            fields.push(field)
        })

        return (
            <div>
                <ControlledForm
                    fieldDefinitions={fields}
                    onSave={this.handleSaveAction}
                    loading={this.state.loading} />
            </div>


        )
    }
}
