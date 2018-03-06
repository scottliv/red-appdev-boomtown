import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import Gravatar from 'react-gravatar';
import styles from './styles';

const ItemCard = ({ item, userLoggedIn, toggle, fetchItems }) => {
    const itemId = item.id;
    let borrowerInfo = '';
    if (item.borrower && item.itemowner.id === userLoggedIn) {
        borrowerInfo = <CardTitle subtitle={'Lent to someone'} />;
    } else if (item.borrower && item.borrower.id === userLoggedIn) {
        borrowerInfo = <CardTitle subtitle={'You Are Borrowing'} />;
    } else if (item.borrower) {
        borrowerInfo = <CardTitle subtitle={'Unavailable'} />;
    }

    let renderBorrowButton = '';
    let returnButton = '';
    let renderReturnButton = false;
    if (item.itemowner.id !== userLoggedIn) {
        renderBorrowButton = (
            <RaisedButton
                label="Borrow"
                onClick={e => {
                    e.preventDefault();
                    toggle({
                        itemId,
                        itemName: item.title,
                        borrowerId: userLoggedIn
                    });
                }}
                secondary
            />
        );
    }
    if (item.borrower && item.borrower.id === userLoggedIn) {
        renderReturnButton = true;
        returnButton = (
            <RaisedButton
                label="Return"
                onClick={e => {
                    e.preventDefault();
                    toggle({ itemId, itemName: item.title, borrowerId: null });
                }}
                secondary
            />
        );
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

                <CardTitle
                    title={item.title}
                    subtitle={item.tags.map(tag => tag.title).join(' ')}
                />
                <CardText>{item.description}</CardText>
                {!item.borrower ? (
                    <CardActions>{renderBorrowButton}</CardActions>
                ) : (
                    ''
                )}
                {renderReturnButton ? (
                    <CardActions>{returnButton}</CardActions>
                ) : (
                    ''
                )}
            </Card>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    userLoggedIn: PropTypes.string.isRequired
};

export default ItemCard;
