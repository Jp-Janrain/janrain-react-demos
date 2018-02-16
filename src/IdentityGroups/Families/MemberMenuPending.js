import React from 'react';
import PropTypes from 'prop-types';

import MoreIconMenu from '../../Layout/MoreIconMenu';
import MemberMenuItemResendInvite from './MemberMenuItemResendInvite';
import MemberMenuItemEditInvite from './MemberMenuItemEditInvite';
import DeleteIcon from 'material-ui-icons/Delete';
import { MenuItem } from 'material-ui';
import { ListItemIcon, ListItemText } from 'material-ui/List';

const MemberMenuPending = props => {
    return (
        <MoreIconMenu closeOnClick={false}>
            <MemberMenuItemResendInvite
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu} />
            <MemberMenuItemEditInvite
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu} />
            <MenuItem onClick={props.closeMoreIconMenu}>
                <ListItemIcon><DeleteIcon /></ListItemIcon>
                <ListItemText inset primary="Delete Invite" />
            </MenuItem>
        </MoreIconMenu>
    );
};

MemberMenuPending.propTypes = {
    user: PropTypes.object.isRequired,
    closeMoreIconMenu: PropTypes.func.isRequired,
};

export default MemberMenuPending;