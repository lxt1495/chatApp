const model = {}

model.currentUser = {}
model.conversations = []
model.currentConversation = {}

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
            // view.setActiveScreen('welcomePage')
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

model.addMessage = (message) => {
    const docId='9FuDIkFq4G61IQUhtVcy'
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('Conversations').doc(docId).update(dataToUpdate)
}

model.getConversations = async () => {
    const response = await firebase.firestore().collection('Conversations').where('users','array-contains',model.currentUser.email).get()
    model.conversations = getDataFromDocs(response.docs)
    if(model.conversations.length>0){
        model.currentConversation = model.conversations[0]
        view.showCurrentConversation()
    }
}

model.listenConversationChange = async () => {
    let isFirstRun = true
    const response = await firebase.firestore().collection('Conversations').where('users','array-contains',model.currentUser.email)
        .onSnapshot((snapshot)=>{
            if(isFirstRun){
                isFirstRun = false
                return
            }
            const docChanges = snapshot.docChanges()
            docChanges.forEach(change=>{
                if(change.type === 'modified'){
                   const dataChange = getDataFromDoc(change.doc)
                   model.conversations.forEach(conversation=>{
                       if(conversation.id===dataChange.id) conversation = dataChange
                   })
                   if(dataChange.id === model.currentConversation.id){
                       model.currentConversation = dataChange
                    //    view.showCurrentConversation()
                    view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length-1])
                   }
                }
            })
        })

}