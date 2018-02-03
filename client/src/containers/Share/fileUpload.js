import { firebaseStorage } from './../../config/firebaseConfig';
import * as firebase from 'firebase';

const uploadFile = (imageFile, callback) => {
    const fileName = imageFile.name;
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
        .child(`images/${imageFile.name}`)
        .put(imageFile);

    uploadTask.on(
        'state_changed',
        snapshot => {
            const progress =
                snapshot.bytesTransferred / snapshot.totalBytes * 100;
            callback({ progress });
        },
        error => {
            callback({ error });
        },
        () => {
            const downloadURL = uploadTask.snapshot.downloadURL;
            callback({ downloadURL });
        }
    );
};

export { uploadFile };
