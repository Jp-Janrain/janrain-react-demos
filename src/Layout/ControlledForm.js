import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TextField } from 'material-ui'
import Button from 'material-ui/Button';
import LinearProgress from 'material-ui/Progress/LinearProgress';

class ControlledForm extends Component {
    constructor(props) {
        super(props)

        const formValue = {}
        props.fieldDefinitions.map((field) => {
            formValue[field.attributePath] = field.defaultValue
        });
        this.state = {
            editingEnabled: !this.props.loading,
            formValue: formValue,
            formHasChanged: false,
        }
        this.formValueInitialState = Object.assign({}, this.state.formValue)
    }
    handleResetForm = () => {
        this.setState({ formValue: this.formValueInitialState, formHasChanged: false })
    }
    handleUpdateField = (e, customValidation) => {
        // Provide handling for customValidations
        if (customValidation) { customValidation(e.target.value) }

        const formValue = Object.assign({}, this.state.formValue)
        formValue[e.target.id] = e.target.value
        this.setState({ formValue: formValue })

        if (this.state.formValue === this.formValueInitialState) {
            this.setState({ formHasChanged: false })
        } else {
            this.setState({ formHasChanged: true })
        }
    }
    handleSaveAction = () => {
        this.props.onSave(this.state.formValue)
    }
    render() {
        const actions = []
        if (this.state.formHasChanged && !this.props.loading) {
            actions.push(
                <Button color='primary' onClick={this.handleSaveAction} key='save' >Save</Button>,
                <Button color='secondary' onClick={this.handleResetForm} key='cancel' >Cancel</Button>)
        }
        const fields = []
        fields.push(this.props.fieldDefinitions.map((field) => {
            return (
                <TextField
                    key={field.attributePath}
                    id={field.attributePath}
                    label={field.label}
                    value={this.state.formValue[field.attributePath] ? this.state.formValue[field.attributePath] : ''}
                    disabled={!this.props.editingEnabled || this.props.loading}
                    fullWidth
                    onChange={(e) => { this.handleUpdateField(e, field.customValidation) }}
                />)
        }))
        return (
            <div>
                {fields}

                <div align="center">{actions}</div>
                {this.props.loading ? <LinearProgress/> : null}
            </div>

        )
    }
}

ControlledForm.propTypes = {
    fieldDefinitions: PropTypes.arrayOf(PropTypes.shape({
        attributePath: PropTypes.string.isRequired,
        label: PropTypes.string,
        customValidation: PropTypes.func
    })),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
}

export default ControlledForm