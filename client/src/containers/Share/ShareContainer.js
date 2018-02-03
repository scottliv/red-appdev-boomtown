import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { firebaseStorage } from './../../config/firebaseConfig';
import { uploadFile } from './fileUpload';
import Share from './Share';

class ShareContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            imageurl: ''
        };
        this.handleFunctions.imageurl = this.handleFunctions.imageurl.bind(
            this
        );
        this.handleFunctions.title = this.handleFunctions.title.bind(this);
        this.handleFunctions.description = this.handleFunctions.description.bind(
            this
        );
        this.handleFunctions.formSubmit = this.handleFunctions.formSubmit.bind(
            this
        );
    }

    handleFunctions = {
        title(e) {
            this.setState({ title: e.target.value });
        },
        description(e) {
            this.setState({ description: e.target.value });
        },
        imageurl(e) {
            const file = e.target.files[0];
            console.log(file);
            uploadFile(file, result => {
                if (result.progress) {
                    console.log(result.progress);
                    return;
                }
                if (result.downloadURL) {
                    this.setState({ imageurl: result.downloadURL });
                    // return result.downloadURL;
                }
                if (result.error) {
                    console.log(result.error);
                }
            });
        },
        formSubmit({ mutate }) {
            mutate({
                variables: {
                    title: this.state.title,
                    description: this.state.description,
                    imageurl: this.state.imageurl,
                    itemowner: this.props.authenticated.uid,
                    tags: this.props.tags
                }
            });
        }
    };

    render() {
        return <Share handleFunctions={this.handleFunctions} />;
    }
}

const mapStateToProps = state => ({
    userLoggedIn: state.auth.authenticated,
    tags: state.items.tags,
    error: state.items.error
});

const newItemMutation = gql`
    mutation newItem(
        $title: String
        $imageurl: String
        $description: String
        $itemowner: ID
        $tags: [TagInput]
    ) {
        addItem(
            newItem: {
                imageurl: $imageurl
                title: $title
                description: $description
                itemowner: $itemowner
                tags: $tags
            }
        ) {
            title
        }
    }
`;

export default graphql(newItemMutation)(
    connect(mapStateToProps)(ShareContainer)
);
