import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { filterItems } from '../../redux/modules/items';

class SelectFilter extends React.Component {
    handleChange = (event, index, selected) => {
        this.props.dispatch(filterItems(selected));
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
        return (
            <SelectField
                value={this.props.tags}
                onChange={this.handleChange}
                multiple
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
