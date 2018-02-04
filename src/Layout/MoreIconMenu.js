import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        const {state, props} = this
        return (
            <div>
                <IconButton
                    onClick={this.handleOpen}>
                    <MoreVertIcon />
                </IconButton>
                <Popover
                    id="user-menu"
                    anchorEl={state.anchorEl}
                    open={Boolean(state.anchorEl)}
                    onClose={this.handleClose}
                    onClick={props.closeOnClick !== false ? this.handleClose : null}
                >
                    {this.props.children}
                </Popover>
            </div>
        )
    }
}

MoreIconMenu.propTypes = {
    children: PropTypes.node.isRequired,
    closeOnClick: PropTypes.bool,
}