window.onload = ()=>{
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAWC9O5u6tja44A8miOW1rh_wpgPD6YicY",
    authDomain: "chat-app-79ec8.firebaseapp.com",
    databaseURL: "https://chat-app-79ec8.firebaseio.com",
    projectId: "chat-app-79ec8",
    storageBucket: "chat-app-79ec8.appspot.com",
    messagingSenderId: "456568767060",
    appId: "1:456568767060:web:cea898126d53b3010fe3c1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.app().name)
    view.setActiveScreen('registerPage')
}