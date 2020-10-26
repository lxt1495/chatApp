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
    const docId = model.currentConversation.id
    const dataToUpdate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }
    firebase.firestore().collection('Conversations').doc(docId).update(dataToUpdate)
    view.scrollToEndElm()
}

model.getConversations = async () => {
    const response = await firebase.firestore().collection('Conversations').where('users','array-contains',model.currentUser.email).get()
    model.conversations = getDataFromDocs(response.docs)
    if(model.conversations.length>0){
        model.currentConversation = model.conversations[0]
        view.showCurrentConversation()
        view.showListConversation()
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
                    for(i=0; i<model.conversations.length; i++){
                        if(model.conversations[i].id===dataChange.id) model.conversations[i] = dataChange
                    }
                   if(dataChange.id === model.currentConversation.id){
                       model.currentConversation = dataChange
                    //    view.showCurrentConversation()
                    view.addMessage(model.currentConversation.messages[model.currentConversation.messages.length-1])
                   }
                }
                else if(change.type === 'added'){
                    const dataChange = getDataFromDoc(change.doc)
                    model.conversations.push(dataChange)
                    view.addConversation(dataChange)
                }
            })
        })
}

model.addConversation = ({title, email}) => {
    const dataToAdd = {
        title,
        createdAt: new Date().toISOString(),
        message: [],
        users: [model.currentUser.email, email]
    }
    firebase.firestore().collection('Conversations').add(dataToAdd)
    view.setActiveScreen('chatPage', true)
}