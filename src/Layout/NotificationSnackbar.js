import React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';


export class NotificationSnackbar extends React.Component {
  state = {
    open: true,
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          onClose={this.handleClose}
          transition= {Fade}
          autoHideDuration={6000}
          SnackbarContentProps={{'aria-describedby': 'message-id'}}
          message={<span id="message-id">{this.props.message}</span>}
          action={<IconButton onClick={this.handleClose} color='inherit'><CloseIcon/></IconButton>}
          />
      </div>
    )

  }
}
