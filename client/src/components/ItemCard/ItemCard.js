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
import Gravatar from 'react-gravatar';
import styles from './styles';

const ItemCard = ({ item }) => (
    <div>
        <Card style={styles.itemCard}>
            <CardMedia
                overlay={
                    <CardTitle
                        title="Overlay title"
                        subtitle="Overlay subtitle"
                    />
                }
            >
                <img src={item.imageurl} alt={item.title} />
            </CardMedia>
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

            <CardTitle title={item.title} subtitle={item.tags} />
            <CardText>{item.description}</CardText>
        </Card>
    </div>
);

export default ItemCard;
