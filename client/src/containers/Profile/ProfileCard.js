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

const ProfileCard = ({ items, currentUser }) => (
    <div>
        {currentUser ? (
            <Card>
                <CardTitle />
                <CardText>{currentUser.fullname}</CardText>
            </Card>
        ) : (
            ''
        )}
    </div>
);

export default ProfileCard;
