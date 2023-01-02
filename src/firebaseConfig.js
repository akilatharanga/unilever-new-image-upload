import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyB06loH1BrqmaRJnuigCXQRF7_TCiSqxS8",
//     authDomain: "fir-image-upload-1ecb7.firebaseapp.com",
//     projectId: "fir-image-upload-1ecb7",
//     storageBucket: "fir-image-upload-1ecb7.appspot.com",
//     messagingSenderId: "810106220153",
//     appId: "1:810106220153:web:89166a229f97365a366ea8"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAdEVUx-9ubIBVf9LwUWtXqgsL-ET1i5zU",
    authDomain: "shop-images-upload-6ad3d.firebaseapp.com",
    projectId: "shop-images-upload-6ad3d",
    storageBucket: "shop-images-upload-6ad3d.appspot.com",
    messagingSenderId: "1088905181424",
    appId: "1:1088905181424:web:442833f31dafd7b40eaa35"
  };
 
//initializing firebase
const app = initializeApp(firebaseConfig);

//firebase storage reference
const storage = getStorage(app);

export default storage;
