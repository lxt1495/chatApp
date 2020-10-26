const view = {}
view.setActiveScreen = (screenName, fromCreate = false)=>{
    switch(screenName){
        case 'welcomePage':
            document.getElementById("app").innerHTML = component.welcomePage
            break
        case 'registerPage':
            document.getElementById("app").innerHTML = component.registerPage
            redirectLogin = document.getElementById('redirect-login')
            redirectLogin.addEventListener('click',()=> view.setActiveScreen('loginPage'), false)
            const registerForm = document.getElementById('register-form')
            registerForm.addEventListener('submit', (event)=>{
                event.preventDefault();
                const dataRegister ={
                    firstName: registerForm.firstName.value,
                    lastName: registerForm.lastName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    confirmedPassword: registerForm.confirmedPassword.value
                }
                controller.register(dataRegister)
            })
            break;
        case 'loginPage':
            document.getElementById('app').innerHTML = component.loginPage
            redirectRegister = document.getElementById('redirect-register')
            redirectRegister.addEventListener('click',()=>view.setActiveScreen('registerPage'), false)
            const loginForm = document.getElementById('login-form')
            loginForm.addEventListener('submit', (event)=>{
                event.preventDefault();
                const dataLogin ={
                    email: loginForm.email.value,
                    password: loginForm.password.value,
                }
                controller.login(dataLogin)
            })
            break;
        case 'chatPage':
            document.getElementById('app').innerHTML = component.chatPage
            const sendMessageForm = document.getElementById('send-message-form')
            sendMessageForm.addEventListener('submit', (e)=>{
                e.preventDefault();
                const message = sendMessageForm.message.value
                const messageSend = {
                    owner: model.currentUser.email,
                    content: message,
                    createdAt: new Date().toISOString()
                }
                if(message.trim()!==''){
                    model.addMessage(messageSend)
                    sendMessageForm.message.value = ""
                }
            })
            if(!fromCreate){
                model.getConversations()
                model.listenConversationChange()
            }
            else{
                view.showCurrentConversation()
                view.showListConversation()
            }
            document.querySelector('.create-conversation button').addEventListener('click',()=>{
                view.setActiveScreen('createConversationScreen')
            },false)
            break
        case 'createConversationScreen':
            document.getElementById('app').innerHTML = component.createConverationScreen
            document.getElementById("return-chat").addEventListener("click",()=>{
                view.setActiveScreen('chatPage', true)
            },false)
            const createConversationForm = document.getElementById('create-conversation-form')
            createConversationForm.addEventListener('submit',(e)=>{
                e.preventDefault()
                const dataConversation = {
                    title: createConversationForm.title.value,
                    email: createConversationForm.email.value
                }
                controller.createConversation(dataConversation)
            },false)
            break
    }
}

view.clearErrorMessages = ()=>{
    Object.values(document.querySelectorAll('.err')).forEach(x=>x.innerText='')
}

view.setErrorMessage = (elementId, message)=>{
    document.getElementById(elementId).innerText = message
}

view.addMessage = (message) => {
    const messageWrapper = document.createElement('div')
    messageWrapper.classList.add('message')
    if(model.currentUser.email===message.owner){
        messageWrapper.classList.add('message-mine')
        messageWrapper.innerHTML = `<div class="message-content">${message.content}</div>`
    }
    else{
        messageWrapper.classList.add('message-other')
        messageWrapper.innerHTML = 
       `<div class="owner">${message.owner}</div>
        <div class="message-content">${message.content}</div>`
    }
    document.querySelector('.list-message').appendChild(messageWrapper)
}

view.showCurrentConversation = () => {
    document.querySelector('.list-message').innerHTML=''
    document.querySelector('.conversation-title').textContent = model.currentConversation.title
    if(model.currentConversation.messages)
        model.currentConversation.messages.forEach(view.addMessage)
    view.scrollToEndElm()
}

view.showListConversation = () => {
    model.conversations.forEach(conversation=>view.addConversation(conversation))
}

view.addConversation = (conversation) => {
    let newConversation = document.createElement('div')
    newConversation.classList.add('conversation')
    if(conversation.id === model.currentConversation.id)
        newConversation.classList.add('current')
    newConversation.innerHTML = 
        `<div class="left-conversation-title">
            ${conversation.title}
        </div>
        <div class="num-of-user">
            ${conversation.users.length} Users
        </div>`
    document.querySelector('.list-conversation').appendChild(newConversation)
    newConversation.addEventListener('click',()=>{
        document.querySelector('.current').classList.remove('current')
        newConversation.classList.add('current')
        model.currentConversation = model.conversations.find(elm=>elm.id===conversation.id)
        view.showCurrentConversation()
    },false)
}

view.scrollToEndElm = () => {
    const elm = document.querySelector('.list-message')
    elm.scrollTop = elm.scrollHeight
}