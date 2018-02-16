import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MembersListItem from './MembersListItem';

import { RELATIONSHIP_TYPES } from './_Config';
import List from 'material-ui/List/List';


const createMembersListItem = (member, status) => (
    <MembersListItem
        // key={}
        user={member}
        status={status}
        // Below test would work if members list returned uuids
        // canEdit={!isCurrentUser(user.uuid) && this.props.isHeadOf} />
        // Instead canEdit is always true
        canEdit={true} />
)

class MembersList extends PureComponent {
    render() {

        const members = {}
        const membersList = []
        Object.entries(RELATIONSHIP_TYPES).map(([relationshipType, relationshipLabel]) => {
            members[relationshipType] = []
            this.props.members.map((member, i) => {
                const user = member.user
                member.relations.map((relationship) => {
                    if (relationship.code === relationshipType) {
                        members[relationshipType].push(
                            createMembersListItem(user, relationship.status)
                        )
                    }
                })
            })
            membersList.push(
                <List>
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