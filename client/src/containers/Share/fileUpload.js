import { firebaseStorage } from './../../config/firebaseConfig';
// const handleFile =(e) => {
//   const iconFile = e.target.files[0]

//   uploadFile(iconFile, result => {

//     if (result.progress) {
//       // Handle progress
//       return;
//     }

//     if (result.downloadURL) {
//       this.setState({ result.downloadURL });
//       return;
//     }

//     if (result.error) {
//       // Handle error
//     }
//   });
// }

const uploadFile = (imageFile, callback) => {
    const fileName = imageFile.name;
    const storageRef = firebaseStorage;
    const uploadTask = storageRef.child(`/icon/${fileName}`).put(imageFile);

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
