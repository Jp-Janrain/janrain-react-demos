import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton/IconButton';
import Popover from 'material-ui/Popover/Popover';
import MoreVertIcon from 'material-ui-icons/MoreVert';



export class MoreIconMenu extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
    handleOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget })
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    render() {
        return (
            <div>
                <IconButton
                    onClick={this.handleOpen}>
                    <MoreVertIcon />
                </IconButton>
                <Popover
                    id="user-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    onClick={this.handleClose}
                >
                    {this.props.children}
                </Popover>
            </div>
        )
    }
}