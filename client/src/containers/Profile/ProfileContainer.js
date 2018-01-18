import React, { Component } from 'react';
import Profile from './Profile';

const ITEMS_URL = 'http://localhost:4000/items';
const USERS_URL = 'http://localhost:4000/users';

export default class ItemsContainer extends Component {
    constructor() {
        super();
        this.state = {
            items: {},
            user: {}
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

            const currentUser = userTable.eEvh1WUF5nb5eeUksUQb3Ph0kOU2;
            // console.log(currentUser);

            const combinedItems = itemsList.reduce((obj, item) => {
                const user = 'eEvh1WUF5nb5eeUksUQb3Ph0kOU2';
                const itemOwner = item.itemowner;
                const itemBorrower = item.borrower;
                if (user === item.itemowner) {
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
                }
                return obj;
            }, {});

            this.setState({ items: combinedItems, user: currentUser });
        });
    }
    render() {
        return (
            <Profile items={this.state.items} currentUser={this.state.user} />
        );
    }
}
