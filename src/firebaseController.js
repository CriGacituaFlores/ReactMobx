import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC5-XTNDgm-ehTvc_xJ1PVxbFX1NsQPa5w",
  authDomain: "administracion-9090a.firebaseapp.com",
  databaseURL: "https://administracion-9090a.firebaseio.com",
  projectId: "administracion-9090a",
  storageBucket: "administracion-9090a.appspot.com",
  messagingSenderId: "452171096444"
};

firebase.initializeApp(config);

const database = firebase.database();

const alimentos = database.ref('alimentos/');
const bebidas = database.ref('bebidas/');

const datos = {alimentos, bebidas};

export default datos;
