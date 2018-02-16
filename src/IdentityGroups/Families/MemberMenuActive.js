import React from 'react';
import PropTypes from 'prop-types';

import MoreIconMenu from '../../Layout/MoreIconMenu';
import { MenuItem } from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import Settings from 'material-ui-icons/Settings';
import { ListItemIcon, ListItemText } from 'material-ui/List';


const MemberMenuActive = props => {
    return (
        <MoreIconMenu closeOnClick={true}>
            <MenuItem onClick={this.handleMenuClose}>
                <ListItemIcon><Settings /></ListItemIcon>
                <ListItemText inset primary="Edit Permissions" />
            </MenuItem>
            <MenuItem onClick={this.handleMenuClose}>
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                <ListItemText inset primary="Remove User" />
            </MenuItem>
        </MoreIconMenu>
    );
};

MemberMenuActive.propTypes = {
    user: PropTypes.object.isRequired,
    closeMoreIconMenu: PropTypes.func.isRequired,
};

export default MemberMenuActive;
