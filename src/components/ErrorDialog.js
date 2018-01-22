import React from 'react';
import Dialog from 'material-ui/Dialog';
import Redirect from 'react-router/Redirect';

export class ErrorDialog extends React.Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        if (this.state.open) {
            return (
                <Dialog
                    title={this.props.title}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose} >
                    {this.props.text}
                </Dialog>
            );

        } else {
            return <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        }

    }
}