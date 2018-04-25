import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isCurrentUser } from '../../Auth/AuthService'
import MembersListItem from './MembersListItem';

import { RELATIONSHIP_TYPES } from './_Config';
import List from 'material-ui/List/List';

class MembersList extends Component {

    createMembersListItem = (member, status) => (
        // eslint-disable-next-line
        <MembersListItem
            key={member.uuid}
            user={member}
            status={status}
            canEdit={!isCurrentUser(member.uuid) && this.props.isHeadOf ? true : false} />
    )

    render() {
        const members = {}
        const membersList = []
        // eslint-disable-next-line
        Object.entries(RELATIONSHIP_TYPES).map(([relationshipType, relationshipLabel]) => {
            members[relationshipType] = []
            // eslint-disable-next-line
            this.props.members.map((member, i) => {
                const user = member.user
                // eslint-disable-next-line
                member.relations.map((relationship) => {
                    if (relationship.code === relationshipType) {
                        members[relationshipType].push(
                            this.createMembersListItem(user, relationship.status)
                        )
                    }
                })
            })
            membersList.push(
                <List
                    key={relationshipLabel}>
                    {relationshipLabel + 's'}
                    {members[relationshipType]}
                </List>
            )
        })

        return (
            <div>
                {membersList}
            </div>
        );
    }
}

MembersList.propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
        relations: PropTypes.arrayOf(PropTypes.shape({
            // Relationship type code
            code: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })),
        user: PropTypes.object.isRequired,
    }), ),

};

export default MembersList;