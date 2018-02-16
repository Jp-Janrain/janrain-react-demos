import React from 'react';
import PropTypes from 'prop-types';

import MoreIconMenu from '../../Layout/MoreIconMenu';
import MemberMenuItemResendInvite from './MemberMenuItemResendInvite';
import MemberMenuItemEditInvite from './MemberMenuItemEditInvite';
import MemberMenuItemDeleteInvite from './MemberMenuItemDeleteInvite';

const MemberMenuPending = props => {
    return (
        <MoreIconMenu closeOnClick={false}>
            <MemberMenuItemResendInvite
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu} />
            <MemberMenuItemEditInvite
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu} />
            <MemberMenuItemDeleteInvite
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu} />
        </MoreIconMenu>
    );
};

MemberMenuPending.propTypes = {
    user: PropTypes.object.isRequired,
    closeMoreIconMenu: PropTypes.func.isRequired,
};

export default MemberMenuPending;