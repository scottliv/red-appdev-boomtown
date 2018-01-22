import React from 'react';
import Moment from 'moment';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Gravatar from 'react-gravatar';

import Profile from '../../containers/Profile';
import styles from './styles';

const ItemCard = ({ item, userLoggedIn }) => {
    console.log(userLoggedIn);
    let borrowerInfo = '';
    if (item.borrower && item.itemowner.id === userLoggedIn) {
        borrowerInfo = (
            <CardTitle subtitle={`Lent To ${item.borrower.fullname}`} />
        );
    } else if (item.borrower) {
        borrowerInfo = <CardTitle subtitle={'Unavailable'} />;
    }

    return (
        <div>
            <Card style={styles.itemCard}>
                <CardMedia
                    overlayContentStyle={{ textTransform: 'uppercase' }}
                    overlay={borrowerInfo}
                >
                    <img src={item.imageurl} alt={item.title} />
                </CardMedia>
                <Link to={`/profile/${item.itemowner.id}`}>
                    <CardHeader
                        title={item.itemowner.fullname}
                        subtitle={Moment(item.created).fromNow()}
                        avatar={
                            <Gravatar
                                style={{ borderRadius: '50%' }}
                                email={item.itemowner.email}
                            />
                        }
                    />
                </Link>

                <CardTitle title={item.title} subtitle={item.tags} />
                <CardText>{item.description}</CardText>
                {!item.borrower ? (
                    <CardActions>
                        <RaisedButton label="Borrow" secondary />
                    </CardActions>
                ) : (
                    ''
                )}
            </Card>
        </div>
    );
};

export default ItemCard;
