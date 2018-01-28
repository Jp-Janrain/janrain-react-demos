import React from 'react';
import Drawer from 'material-ui/Drawer';

import { isLoggedIn } from '../Auth/AuthService';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import { Link } from 'react-router-dom';

const securedLink = (returnValue) => {
    return isLoggedIn() ? returnValue : null
}

export const AppDrawer = (props) => {
    return (
        <div>
            <Drawer
                open={props.isOpen}
                onClose={props.handleClose} >
                <div style={{ width: 300 }}>
                    <List>
                        {securedLink(
                            <Link to="/families">
                                <ListItem button onClick={props.handleClose}>
                                    <ListItemText primary='Families' />
                                </ListItem>
                            </Link>)}
                        <Link to="/companies">
                            <ListItem button onClick={props.handleClose}>
                                <ListItemText primary='Companies' />
                            </ListItem>
                        </Link>

                    </List>
                </div>
            </Drawer>
        </div>
    );
}
