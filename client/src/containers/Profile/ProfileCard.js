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

const ProfileCard = ({ items, currentUser, borrowed }) => {
    const itemKeys = Object.keys(items);
    console.log(borrowed);
    return (
        <div>
            <Card>
                <CardTitle />
                <CardText />
            </Card>
        </div>
    );
};

export default ProfileCard;
