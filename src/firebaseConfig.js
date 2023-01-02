import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB06loH1BrqmaRJnuigCXQRF7_TCiSqxS8",
    authDomain: "fir-image-upload-1ecb7.firebaseapp.com",
    projectId: "fir-image-upload-1ecb7",
    storageBucket: "fir-image-upload-1ecb7.appspot.com",
    messagingSenderId: "810106220153",
    appId: "1:810106220153:web:89166a229f97365a366ea8"
};
 
//initializing firebase
const app = initializeApp(firebaseConfig);

//firebase storage reference
const storage = getStorage(app);

export default storage;
