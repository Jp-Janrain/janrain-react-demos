import React from 'react';
import Redirect from 'react-router/Redirect';
import SnackbarContent from 'material-ui/Snackbar/SnackbarContent';
import Button from 'material-ui/Button/Button';

export class ErrorMessageWithRedirect extends React.Component {
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const props = this.props
        if (this.state.open) {
            return (
                <SnackbarContent
                    message={props.message}
                    action={< Button color="secondary" dense onClick={this.handleClose} >Acknowledge</Button >}
                />
            );

        } else {
            return <Redirect to={{
                pathname: props.pathname ? props.pathname : '/',
                state: { from: props.location }
            }} />
        }

    }
}

