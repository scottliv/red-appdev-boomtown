import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';

import { filterItems } from '../../redux/modules/items';

const menuItems = [
    {
        value: 1,
        primaryText: 'Household Items'
    },
    {
        value: 2,
        primaryText: 'Recreational Equipment'
    },
    {
        value: 3,
        primaryText: 'Electronics'
    },
    {
        value: 4,
        primaryText: 'Physical Media'
    },
    {
        value: 5,
        primaryText: 'Musical Instruments'
    }
];
class SelectFilter extends React.Component {
    handleChange = (event, index, selected) => {
        this.props.dispatch(filterItems(selected));
    };

    selectionRenderer = selected => {
        switch (selected.length) {
        case 0:
            return '';
        case 1:
            return `${this.props.tags[0]}`;
        default:
            return `${selected.length} tags selected`;
        }
    };

    menuItemGenerator(items) {
        return items.map(item => (
            <MenuItem
                checked={this.props.tags.indexOf(item.value) > -1}
                insetChildren
                key={item.id}
                value={item.value}
                primaryText={item.primaryText}
            />
        ));
    }

    render() {
        return (
            <SelectField
                value={this.props.tags}
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

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    items: state.items.items,
    filtered: state.items.filteredItems,
    tags: state.items.tags,
    error: state.items.error
});

export default connect(mapStateToProps)(SelectFilter);
