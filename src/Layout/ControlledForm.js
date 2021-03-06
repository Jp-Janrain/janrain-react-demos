import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';

import { TextField } from 'material-ui'
import Button from 'material-ui/Button';
import LinearProgress from 'material-ui/Progress/LinearProgress';

class ControlledForm extends Component {
    constructor(props) {
        super(props)

        const formValue = {}
        // eslint-disable-next-line
        props.fieldDefinitions.map((field) => {
            formValue[field.attributePath] = field.defaultValue
        });
        this.state = {
            formValue: formValue,
            formHasChanged: false,
            formValueInitial: formValue,
        }
    }

    handleResetForm = () => {
        this.setState({ formValue: this.state.formValueInitial, formHasChanged: false })
    }

    handleUpdateField = (e, customValidation) => {
        // Provide handling for customValidations
        if (customValidation) { customValidation(e.target.value) }

        const formValue = Object.assign({}, this.state.formValue)
        formValue[e.target.id] = e.target.value
        this.setState({
            formValue: formValue,
            formHasChanged: !_.isEqual(formValue, this.state.formValueInitial),
        })
        if (this.props.onUpdate) this.props.onUpdate(formValue)
    }

    handleCancelAction = () => {
        this.handleResetForm()
        if (this.props.onCancel) this.props.onCancel(this.state.formValueInitial)
    }

    handleSaveAction = () => {
        this.setState({
            formValueInitial: this.state.formValue,
            formHasChanged: false,
        })
        this.props.onSave(this.state.formValue)
    }

    render() {
        const { props, state } = this
        const actions = []
        if (this.state.formHasChanged && !props.loading && !props.hideDynamicButtons) {
            actions.push(
                <Button color='primary' raised onClick={this.handleSaveAction} key='save' >Save</Button>,
                <Button color='secondary' onClick={this.handleCancelAction} key='cancel' >Cancel</Button>)
        }
        const fields = []
        fields.push(props.fieldDefinitions.map((field) => {
            return (
                <TextField
                    key={field.attributePath}
                    id={field.attributePath}
                    label={field.label ? field.label : field.attributePath}
                    value={state.formValue[field.attributePath]}
                    disabled={props.loading}
                    fullWidth
                    onChange={(e) => { this.handleUpdateField(e, field.customValidation) }}
                />)
        }))
        return (
            <div>
                {fields}
                <br /><br />
                <div align="center">{actions}</div>
                {props.loading ? <LinearProgress /> : null}
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
    onSave: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
    hideDynamicButtons: PropTypes.bool,
}

export default ControlledForm