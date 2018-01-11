import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
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
                <img src={item.imageurl} alt="" />
            </CardMedia>
            <CardHeader
                title={item.itemowner.fullname}
                subtitle={item.tags.forEach(tag => tag)}
                avatar={item.imageurl}
            />
            <CardTitle title={item.title} subtitle={item.tags} />
            <CardText>{item.description}</CardText>
        </Card>
    </div>
);

export default ItemCard;
