import React, { Component } from 'react';
import { CircularProgress } from 'material-ui'
import { FamilyInfoForm } from './FamilyInfoForm';

export class FamilyInfo extends Component {

    constructor() {
        super()
        this.state = {
            editingEnabled: false,
            renameDialogOpen: false,
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div align="center">
                    <CircularProgress size={50} thickness={7} />
                </div>)
        } else {
            return (
                <FamilyInfoForm
                    familyInfo={this.props.familyInfo}
                    canEdit={this.props.isHeadOf}
                    handleFamilyRename={this.props.handleFamilyRename}
                    handleUpdateInfo={this.props.handleUpdateInfo} />
            )
        }
    }
}
