const model = {}

model.register = ({firstName, lastName, email, password, confirmedPassword}) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
        console.log(user)
    // update profile
        firebase.auth().currentUser.updateProfile({
            displayName: firstName+' '+lastName
        })
    // send email verification
        firebase.auth().currentUser.sendEmailVerification()
    })
    .catch((error)=>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage, 'Error')
    })
}

model.login = ({email, password}) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res)=>{
        if(!res.user.emailVerified){
            alert('please verify email!')
        }
        else{
            alert('login successful!')
            view.setActiveScreen('welcomePage')
        }
    })
    .catch((error)=>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage, 'Error')
        // ...
    });
}

model.signOut = () => {
    firebase.auth().signOut().
    then(function() {
        // Sign-out successful.
    })
    .catch(function(error) {
        // An error happened.
    });
}