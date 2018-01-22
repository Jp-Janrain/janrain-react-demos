import React from 'react';
import Drawer from 'material-ui/Drawer';

import { AppDrawerLink } from './AppDrawerLink';
import AppBar from 'material-ui/AppBar/AppBar';
import { isLoggedIn } from '../Auth/AuthService';

const securedLink = (returnValue) => {
    return isLoggedIn() ? returnValue : null
}

export const AppDrawer = (props) => {
    return (
        <div>
            <Drawer
                docked={false}
                width={325}
                open={props.isOpen}
                onRequestChange={(open) => props.handleClose()} >
                <AppBar title="Choose a Demo" />
                {securedLink(<AppDrawerLink label="Families" path="/families" onClick={props.handleClose} />)}

                <AppDrawerLink label="Companies" path="/companies" onClick={props.handleClose} />
                <AppDrawerLink label="Things" path="/things" onClick={props.handleClose} />

            </Drawer>
        </div>
    );
}
