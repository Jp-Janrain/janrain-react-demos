import React from 'react';
import { CircularProgress, TableRowColumn } from 'material-ui';
import { Table } from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableRow from 'material-ui/Table/TableRow';

export const FamilyMembers = (props) => {
    if (props.isLoading) {
        return (
            <CircularProgress size={50} thickness={7} />
        )
    } else {
        const members = []
        members.push(props.familyMembers.map((familyMember) => {
            const user = familyMember.user
            return (
                <TableRow key={user.uuid}>
                    <TableRowColumn>{user.givenName + ' ' + user.familyName}</TableRowColumn>
                    <TableRowColumn>{user.primaryAddress.mobile} </TableRowColumn>
                </TableRow>
            )
        }))
        return (
            <Table selectable={false}>
                <TableBody displayRowCheckbox={false}>
                    {members}
                </TableBody>
            </Table>
        )
    }
}
