import React from 'react';
import { FontIcon, CardHeader } from 'material-ui';
import { Card } from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';


export const ProfileCard = (props) => {
    const user = props.profile.user
    return (
        <Card>
            <CardHeader
                title={user.givenName + ' ' + user.familyName}
                avatar={<FontIcon ></FontIcon>}
            />
        </Card>
    )


}