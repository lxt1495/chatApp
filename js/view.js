const view = {}
view.setActiveScreen = (screenName)=>{
    switch(screenName){
        case 'welcomePage':
            document.getElementById("app").innerHTML = component.welcomePage
            break
        case 'registerPage':
            document.getElementById("app").innerHTML = component.registerPage
            redirectLogin = document.getElementById('redirect-login')
            funcRedirectLogin = ()=>{
                redirectLogin.removeEventListener("click",funcRedirectLogin,false)
                view.setActiveScreen('loginPage')
            }
            redirectLogin.addEventListener('click',funcRedirectLogin, false)
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
            funcRedirectRegister = ()=>{
                redirectRegister.removeEventListener("click",funcRedirectRegister,false)
                view.setActiveScreen('registerPage')
            }
            redirectRegister.addEventListener('click',funcRedirectRegister, false)
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
            model.getConversations()
            model.listenConversationChange()
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
    model.currentConversation.messages.forEach(view.addMessage)
}