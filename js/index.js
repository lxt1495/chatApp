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
  firebase.auth().onAuthStateChanged(res=>{
    console.log(res)
    if(res){
      if(res.emailVerified){
        model.currentUser = {
          displayName: res.displayName,
          email: res.email
        }
        view.setActiveScreen('chatPage')
      }
      else{
        view.setActiveScreen('loginScreen')
        alert('Please verify email!')
      }
    }
    else{
      view.setActiveScreen('registerPage')
    }
  })
}

fireStoreQueries = async () => {
  // GET ONE DOCUMENT:
    /*
    const response = await firebase.firestore().collection('Users').doc('2DLtzKT6jRhdQXwDJQ9D').get()
    const user = getDataFromDoc(response)
    console.log(user)
    */
  // GET MANY DOCUMENTS:
    /*
    // const response = await firebase.firestore().collection('Users').where('address','=','Ha Noi').get()
    // const response = await firebase.firestore().collection('Users').where('age','<',20).get()
    const response = await firebase.firestore().collection('Users').where('phone','array-contains',123).get()
    const users = getDataFromDocs(response.docs)
    console.log(users)
    */
  // ADD NEW DOCUMENTS:
    /*
    const data = {
      name: 'Nguyen Van C',
      age: 22
    }
    firebase.firestore().collection('Users').add(data)
    */
  // UPDATE DOCUMENT:
    /*
    const data = {
      name: 'Nguyen Van C',
      age: firebase.firestore.FieldValue.delete(),
      phone: firebase.firestore.FieldValue.arrayUnion('789')
      // phone: firebase.firestore.FieldValue.arrayRemove('789')
    }
    firebase.firestore().collection('Users').doc('2DLtzKT6jRhdQXwDJQ9D').update(data)
    */
  // DELETE DOCUMENT:
    /*
    firebase.firestore().collection('Users').doc('zy6xvTrs7vzCT2xYboXy').delete()
    */
}

getDataFromDoc = (res)=>{
  const data = res.data()
  data.id = res.id
  return data
}

getDataFromDocs = (docs)=>{
  return docs.map(getDataFromDoc)
}