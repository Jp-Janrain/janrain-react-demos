import React from 'react';
import Link from 'react-router-dom/Link';
import MenuItem from 'material-ui/MenuItem/MenuItem';


export const AppDrawerLink = (props) => {
    return (
        <MenuItem
            primaryText={props.label}
            onClick={props.onClick}
            containerElement={
                <Link to={props.path} />
            }
        />
    )
}