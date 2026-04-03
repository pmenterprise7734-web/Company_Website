import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD1tbnodRMywxNKeAeYteCkQeUdBuOj48M",
  authDomain: "enterprise-19bd6.firebaseapp.com",
  projectId: "enterprise-19bd6",
  storageBucket: "enterprise-19bd6.firebasestorage.app",
  messagingSenderId: "469842198028",
  appId: "1:469842198028:web:86147df2550a68f529f829"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)