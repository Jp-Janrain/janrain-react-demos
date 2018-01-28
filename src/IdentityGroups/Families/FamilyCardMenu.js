import React from 'react'
import { MoreIconMenu } from '../../Layout/MoreIconMenu';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextFields from 'material-ui-icons/TextFields';
import ListItemIcon from 'material-ui/List/ListItemIcon';
import ListItemText from 'material-ui/List/ListItemText';

export const FamilyCardMenu = (props) => (
    <MoreIconMenu>
        <MenuItem onClick={props.handleOpenRenameDialog}>
            <ListItemText primary="Rename" />
        </MenuItem>
    </MoreIconMenu>
)