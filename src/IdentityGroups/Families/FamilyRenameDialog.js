import React from 'react'
import Dialog from 'material-ui/Dialog/Dialog';
import { TextField } from 'material-ui';
import Button from 'material-ui/Button';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DialogContent from 'material-ui/Dialog/DialogContent';



export const FamilyRenameDialog = (props) => {

    return (
        <Dialog open={props.isOpen} onClose={props.handleCloseRenameDialog}>
            <DialogTitle>Rename Family</DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <TextField
                            id="family_name_update"
                            label="Family Name"
                            defaultValue={props.familyInfo.familyName}
                            fullWidth={true}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            id="family_description_update"
                            label="Description"
                            defaultValue={props.familyInfo.description}
                            fullWidth={true}
                        />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions >
                <Button color="secondary" onClick={props.handleCloseRenameDialog} autoFocus>Cancel</Button>
                <Button color="primary" onClick={props.handleRenameSubmit} >Submit</Button>
            </DialogActions>
        </Dialog>
    )
}