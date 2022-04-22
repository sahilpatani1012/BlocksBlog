import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCBjNMsA1_ylyt5jYo2o6opV7Ec1fiDF6c",
  authDomain: "blocksblog-50527.firebaseapp.com",
  projectId: "blocksblog-50527",
  storageBucket: "blocksblog-50527.appspot.com",
  messagingSenderId: "277180351732",
  appId: "1:277180351732:web:c8e91783e7b4933e708aa1"
};

export const application = initializeApp(firebaseConfig);