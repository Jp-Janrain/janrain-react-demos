import React from 'react';
import PropTypes from 'prop-types';

import MoreIconMenu from '../../Layout/MoreIconMenu';
import MemberMenuItemRemoveUser from './MemberMenuItemRemoveUser';


const MemberMenuActive = props => {
    return (
        <MoreIconMenu closeOnClick={false}>
            <MemberMenuItemRemoveUser
                user={props.user}
                closeMoreIconMenu={props.closeMoreIconMenu}
            />
        </MoreIconMenu>
    );
};

MemberMenuActive.propTypes = {
    user: PropTypes.object.isRequired,
    // closeMoreIconMenu: PropTypes.func.isRequired,
};

export default MemberMenuActive;
