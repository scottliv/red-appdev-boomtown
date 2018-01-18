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
import Profile from '../../containers/Profile';
import Gravatar from 'react-gravatar';
import styles from './styles';

const ItemCard = ({ item }) => (
    <div>
        <Card style={styles.itemCard}>
            <CardMedia
                overlayContentStyle={{ textTransform: 'uppercase' }}
                overlay={
                    item.borrower ? (
                        <CardTitle
                            subtitle={`Lent To ${item.borrower.fullname}`}
                        />
                    ) : (
                        ''
                    )
                }
            >
                <img src={item.imageurl} alt={item.title} />
            </CardMedia>
            <Link to="/profile/">
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
        </Card>
    </div>
);

export default ItemCard;
