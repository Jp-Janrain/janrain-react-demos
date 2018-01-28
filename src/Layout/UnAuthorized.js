import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Redirect from 'react-router/Redirect';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';

export class UnAuthorized extends React.Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <Button
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        if (this.state.open) {
            return (
                <Dialog
                    actions={actions}
                    open={this.state.open}
                    onClose={this.handleClose} >
                    <DialogTitle> Unauthorized </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You must Sign In before you can visit this page.
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            );

        } else {
            return <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        }

    }
}