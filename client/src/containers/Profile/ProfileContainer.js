import React, { Component } from 'react';
import Profile from './Profile';

const ITEMS_URL = 'http://localhost:4000/items';
const USERS_URL = 'http://localhost:4000/users';

export default class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            user: {},
            userid: this.props.match.params.userid
        };
    }
    componentDidMount() {
        // Fetch JSON and attach to state
        const items = fetch(ITEMS_URL).then(r => r.json());
        const users = fetch(USERS_URL).then(r => r.json());

        Promise.all([items, users]).then(response => {
            // Turn user array into an object
            const [itemsList, userList] = response;
            const userTable = userList.reduce((obj, user) => {
                obj[user.id] = user;
                return obj;
            }, {});

            const currentUser = userTable.eEvh1WUF5nb5eeUksUQb3Ph0kOU2;

            // extract user data and item data into single objects
            const combinedItems = itemsList.reduce((obj, item) => {
                const user = this.state.userid;
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
