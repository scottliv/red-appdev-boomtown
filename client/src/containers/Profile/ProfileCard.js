import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import Gravatar from 'react-gravatar';

const ProfileCard = ({ items, currentUser, borrowed }) => (
    <div>
        <Card>
            <CardTitle
                title={currentUser.fullname}
                subtitle={currentUser.bio}
            />
            <CardText>
                {' '}
                <div>{`${Object.keys(items).length} Items Shared`}</div>
                <div>{`${borrowed.length} Items borrowed`}</div>{' '}
            </CardText>

            <Gravatar email={currentUser.email} />
        </Card>
    </div>
);

export default ProfileCard;
