import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Redirect from 'react-router/Redirect';

export class UnAuthorized extends React.Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];

        if (this.state.open) {
            return (
                <Dialog
                    title="UnAuthorized"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose} >
                    You must Sign In before you can visit this page.
                </Dialog>
            );

        } else {
            return <Redirect to={{pathname: '/', state: { from: this.props.location }}} />
        }

    }
}