import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle
} from 'material-ui/Toolbar';

import logo from '../../images/boomtown-logo.svg';

const items = [
    <MenuItem key={1} value={1} primaryText="Electronics" />,
    <MenuItem key={2} value={2} primaryText="Household Items" />,
    <MenuItem key={3} value={3} primaryText="Musical Instruments" />,
    <MenuItem key={4} value={4} primaryText="Physical Media" />,
    <MenuItem key={5} value={5} primaryText="Recreational Equipment" />
];

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <Toolbar
                style={{
                    width: '100vw',
                    height: '60px',
                    position: 'fixed',
                    left: 0,
                    zIndex: 100,
                    backgroundColor: '#fff'
                }}
            >
                <ToolbarGroup firstChild>
                    <a href="/">
                        <img
                            src={logo}
                            alt="Boomtown"
                            className="header-logo"
                        />
                    </a>
                    <SelectField
                        value={this.state.value}
                        onChange={this.handleChange}
                        multiple
                        floatingLabelText="Filter by tag"
                    >
                        {items}
                    </SelectField>
                </ToolbarGroup>
                <ToolbarGroup>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <RaisedButton label="My Profile" primary />
                    <RaisedButton label="Logout" primary />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

// export default HeaderBar;
