import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { filterItems } from '../../redux/modules/items';

// const menuItems = [
//     {
//         value: 1,
//         primaryText: 'Household Items'
//     },
//     {
//         value: 2,
//         primaryText: 'Recreational Equipment'
//     },
//     {
//         value: 3,
//         primaryText: 'Electronics'
//     },
//     {
//         value: 4,
//         primaryText: 'Physical Media'
//     },
//     {
//         value: 5,
//         primaryText: 'Musical Instruments'
//     }
// ];
class SelectFilter extends React.Component {
    handleChange = (event, index, selected) => {
        this.props.dispatch(filterItems(selected));
    };

    selectionRenderer = selected => {
        switch (selected.length) {
        case 0:
            return '';
        case 1:
            return selected;
        default:
            return `${selected.length} tags selected`;
        }
    };

    menuItemGenerator(items) {
        return items.map(item => (
            <MenuItem
                checked={this.props.tags.indexOf(item.id) > -1}
                insetChildren
                key={item.id}
                value={item.id}
                primaryText={item.title}
            />
        ));
    }

    render() {
        const { tags } = this.props.data;
        console.log(tags);
        return (
            <SelectField
                value={this.props.tags}
                onChange={this.handleChange}
                multiple
                selectionRenderer={this.selectionRenderer}
                floatingLabelText="Filter by tag"
            >
                {this.menuItemGenerator(tags || [])}
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

const fetchTags = gql`
    query fetchTags {
        tags {
            id
            title
        }
    }
`;

export default graphql(fetchTags)(connect(mapStateToProps)(SelectFilter));
