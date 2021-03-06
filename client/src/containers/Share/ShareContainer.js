import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router-dom';
import placeholderImage from './../../images/item-placeholder.jpg';

import { uploadFile } from './fileUpload';
import ShareCard from './ShareCard';
import ShareForm from './Share';

class ShareContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            title: 'Title',
            description: 'Super Cool Item Description',
            imageurl: placeholderImage,
            imageUploaded: false
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
            uploadFile(file, result => {
                if (result.progress) {
                    console.log(result.progress);
                }
                if (result.downloadURL) {
                    this.setState({
                        imageurl: result.downloadURL,
                        imageUploaded: true
                    });
                }
                if (result.error) {
                    console.log(result.error);
                }
            });
        },
        formSubmit(e) {
            e.persist();
            this.props
                .mutate({
                    variables: {
                        title: this.state.title,
                        description: this.state.description,
                        imageurl: this.state.imageurl,
                        itemowner: this.props.authenticated.uid,
                        tags: this.props.tags.map(tag => ({ id: tag }))
                    },
                    update: (proxy, { data: { createNewItem } }) => {
                        const data = proxy.readQuery({ query: fetchItems });

                        data.items.push(createNewItem);
                        proxy.writeQuery({ query: fetchItems, data });
                    }
                })
                .then(res => {
                    this.setState({ submitted: true });
                });
        }
    };

    render() {
        if (this.state.submitted) return <Redirect to={{ pathname: '/' }} />;

        const item = {
            title: this.state.title,
            description: this.state.description,
            imageurl: this.state.imageurl,
            itemowner: {
                id: this.props.authenticated.id,
                email: this.props.authenticated.email
            },
            tags: this.props.tags.map(tag => ({ id: tag }))
        };
        return (
            <div className={'share-container'}>
                <ShareCard item={item} />
                <ShareForm
                    tags={this.props.tags}
                    handleFunctions={this.handleFunctions}
                    imageUploaded={this.state.imageUploaded}
                />;
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
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
        createNewItem(
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

const fetchItems = gql`
    query fetchItems {
        items {
            id
            title
            created
            itemowner {
                id
                fullname
                email
            }
            tags {
                id
                title
            }
            borrower {
                id
            }
            imageurl
            description
            available
        }
    }
`;

export default compose(
    withApollo,
    graphql(newItemMutation),
    graphql(fetchItems),
    connect(mapStateToProps)
)(ShareContainer);
