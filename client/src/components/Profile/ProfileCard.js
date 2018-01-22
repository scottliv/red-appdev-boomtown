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
        <Card
            style={{ maxWidth: '600px', margin: '0 auto' }}
            containerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '3rem'
            }}
        >
            <CardTitle
                title={currentUser.fullname}
                subtitle={currentUser.bio}
            />
            <div className="profile-card-container">
                <CardText>
                    {' '}
                    <div>{`${Object.keys(items).length} Items Shared`}</div>
                    <div>{`${borrowed.length} Items borrowed`}</div>{' '}
                </CardText>
                <Gravatar email={currentUser.email} />
            </div>
        </Card>
    </div>
);

export default ProfileCard;
