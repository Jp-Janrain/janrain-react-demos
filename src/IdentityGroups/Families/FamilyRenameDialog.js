import React from 'react'
import Dialog from 'material-ui/Dialog/Dialog';
import { TextField, FlatButton } from 'material-ui';


export const FamilyRenameDialog = (props) => {

    const renameDialogActions = [
        <FlatButton
            label="Cancel"
            secondary={true}
            onClick={props.handleCloseRenameDialog}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            disabled={false}
            onClick={props.handleRenameSubmit}
        />,
    ]

    return (

        <Dialog
            title="Rename Family"
            actions={renameDialogActions}
            modal={true}
            open={props.isOpen} >
            <TextField
                id="family_name_update"
                floatingLabelText="Family Name"
                defaultValue={props.familyInfo.familyName}
                fullWidth={true}
            /> <br />
            <TextField
                id="family_description_update"
                floatingLabelText="Description"
                defaultValue={props.familyInfo.description}
                fullWidth={true}
            /> <br />
        </Dialog>
    )
}