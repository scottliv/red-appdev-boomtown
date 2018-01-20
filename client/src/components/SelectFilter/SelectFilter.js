import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';

import { filterItems } from '../../redux/modules/items';

const menuItems = [
    {
        value: 'Electronics',
        primaryText: 'Electronics'
    },
    {
        value: 'Household Items',
        primaryText: 'Household Items'
    },
    {
        value: 'Musical Instruments',
        primaryText: 'Musical Instruments'
    },
    {
        value: 'Physical Media',
        primaryText: 'Physical Media'
    },
    {
        value: 'Recreational Equipment',
        primaryText: 'Recreational Equipment'
    }
];
class SelectFilter extends React.Component {
    handleChange = (event, index, selected) => {
        this.props.dispatch(filterItems(this.props.items, selected));
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
                key={item.key}
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
