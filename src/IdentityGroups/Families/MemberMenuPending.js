import React from 'react';
import PropTypes from 'prop-types';

import MoreIconMenu from '../../Layout/MoreIconMenu';
import MembersListMenuResendInvite from './MembersListMenuResendInvite';
import MembersListMenuEditInvite from './MembersListMenuEditInvite';
import DeleteIcon from 'material-ui-icons/Delete';
import { MenuItem } from 'material-ui';
import { ListItemIcon, ListItemText } from 'material-ui/List';

const MemberMenuPending = props => {
    return (
        <MoreIconMenu closeOnClick={false}>
            <MembersListMenuResendInvite
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu} />
            <MembersListMenuEditInvite
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