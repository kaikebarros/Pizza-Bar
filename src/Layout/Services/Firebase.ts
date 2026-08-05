import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBinUU91L2gyxe8A-Ao_8ePM_D-JO3-lnU",
  authDomain: "pizza-bar-65089.firebaseapp.com",
  projectId: "pizza-bar-65089",
  storageBucket: "pizza-bar-65089.firebasestorage.app",
  messagingSenderId: "172005630839",
  appId: "1:172005630839:web:88e1ecb66debe008123772",
  measurementId: "G-VYJLERK2QF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //banco para users, pedidos e produtos
export const storage = getStorage(app); //imagem e baners

export default app;
