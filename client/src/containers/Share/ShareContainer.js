import React, { Component } from 'react';
import { graphql, gql, compose } from 'react-apollo';
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
                    return;
                }
                if (result.downloadURL) {
                    return result.downloadURL;
                }
                if (result.error) {
                    console.log(result.error);
                }
            });
        }
    };

    render() {
        return <Share />;
    }
}

export default ShareContainer;
