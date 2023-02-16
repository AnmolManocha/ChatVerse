// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4uuAu93gQmtgr5kn7-S8J5B9ryOCVOmc',
  authDomain: 'am---chatverse.firebaseapp.com',
  projectId: 'am---chatverse',
  storageBucket: 'am---chatverse.appspot.com',
  messagingSenderId: '188602481686',
  appId: '1:188602481686:web:981e96dec05b5225c1c937',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
