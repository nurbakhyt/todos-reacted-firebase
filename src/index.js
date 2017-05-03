import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBRB3wp61rdlrXtACHYXe5rZ_sISzWxTVM",
  authDomain: "todos-5f8a0.firebaseapp.com",
  databaseURL: "https://todos-5f8a0.firebaseio.com",
  projectId: "todos-5f8a0",
  storageBucket: "todos-5f8a0.appspot.com",
  messagingSenderId: "972592606400"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
