import React, { Component } from 'react';
import ItemCardList from './ItemCardList';
import Items from './Items';
import styles from './styles';

const ITEMS_URL = 'http://localhost:4000/items';
const USERS_URL = 'http://localhost:4000/users';

export default class ItemsContainer extends Component {
    constructor() {
        super();
        this.state = {
            items: {}
        };
    }
    componentDidMount() {
        // Fetch JSON and attach to state
        const items = fetch(ITEMS_URL).then(r => r.json());
        const users = fetch(USERS_URL).then(r => r.json());

        Promise.all([items, users]).then(response => {
            // const userTable = {};
            const [itemsList, userList] = response;
            const userTable = userList.reduce((obj, user) => {
                obj[user.id] = user;
                return obj;
            }, {});

            const combinedItems = itemsList.reduce((obj, item) => {
                const itemOwner = item.itemowner;
                const itemBorrower = item.borrower;
                obj[item.id] = item;

                if (obj[item.id].itemowner === userTable[itemOwner].id) {
                    obj[item.id].itemowner = userTable[itemOwner];
                }

                if (
                    obj[item.id].borrower &&
                    obj[item.id].borrower === userTable[itemBorrower].id
                ) {
                    obj[item.id].borrower = userTable[itemBorrower];
                }
                return obj;
            }, {});

            this.setState({ items: combinedItems });
        });
    }
    render() {
        return <ItemCardList items={this.state.items} />;
    }
}
