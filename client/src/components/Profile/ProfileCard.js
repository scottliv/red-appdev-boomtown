import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Gravatar from 'react-gravatar';

const ProfileCard = ({ items, currentUser, borrowed }) => (
    <div>
        <Card
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                width: '800px',
                height: '225px'
            }}
            containerStyle={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%'
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
                <Gravatar
                    email={currentUser.email}
                    style={{ borderRadius: '50%' }}
                    size={175}
                />
            </div>
        </Card>
    </div>
);

ProfileCard.propTypes = {
    items: PropTypes.object.isRequired,
    userLoggedIn: PropTypes.string.isRequired,
    borrowed: PropTypes.array.isRequired
};

export default ProfileCard;
