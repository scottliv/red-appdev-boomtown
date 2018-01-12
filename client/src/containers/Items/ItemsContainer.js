import React, { Component } from 'react';
import Items from './Items';
import styles from './styles';

const ITEMS_URL = 'http://localhost:4000/items';
const USERS_URL = 'http://localhost:4000/users';

export default class ItemsContainer extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        // Fetch JSON and attach to state
        const items = fetch(ITEMS_URL).then(r => r.json());
        const users = fetch(USERS_URL).then(r => r.json());

        Promise.all([items, users]).then(response => {
            const userTable = {};
            const [itemsList, userList] = response;
            userList.forEach(user => {
                userTable[user.id] = user;
            });

            const combinedItems = itemsList.map(item => {
                const itemOwner = item.itemowner;

                if (itemOwner === userTable[itemOwner].id) {
                    item.itemowner = userTable[itemOwner];
                }
                console.log(item);
                return item;
            });

            this.setState({ items: combinedItems });
        });
    }
    render() {
        return <Items items={this.state.items} />;
    }
}
