import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-EXAMPLEKEY1234567890', // Replace with your actual API key
  authDomain: 'your-project-id.firebaseapp.com', // Replace with your actual Auth domain
  projectId: 'your-project-id', // Replace with your actual Project ID
  storageBucket: 'your-project-id.appspot.com', // Replace with your actual Storage bucket
  messagingSenderId: '1234567890', // Replace with your actual Messaging sender ID
  appId: '1:1234567890:web:abcdef123456', // Replace with your actual App ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
