import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const menuItems = [
    {
        value: 1,
        primaryText: 'Electronics'
    },
    {
        value: 2,
        primaryText: 'Household Items'
    },
    {
        value: 3,
        primaryText: 'Musical Instruments'
    },
    {
        value: 4,
        primaryText: 'Physical Media'
    },
    {
        value: 5,
        primaryText: 'Recreational Equipment'
    }
];
export default class SelectFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    selectionRenderer = value => {
        switch (value.length) {
        case 0:
            return '';
        case 1:
            return menuItems[value[0]].primaryText;
        default:
            return `${value.length} items selected`;
        }
    };

    menuItemGenerator(items) {
        return items.map(item => (
            <MenuItem
                checked={this.state.value.indexOf(item.value) > -1}
                insertChildren
                key={item.key}
                value={item.value}
                primaryText={item.primaryText}
            />
        ));
    }

    render() {
        return (
            <SelectField
                value={this.state.value}
                onChange={this.handleChange}
                multiple
                selectionRenderer={this.selectionRenderer}
                floatingLabelText="Filter by tag"
            >
                {this.menuItemGenerator(menuItems)}
            </SelectField>
        );
    }
}
