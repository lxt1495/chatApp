const controller = {}

controller.register = ({firstName, lastName, email, password, confirmedPassword}) => {
    view.clearErrorMessages()
    pass=true
    if(firstName === ''){
        view.setErrorMessage('first-name-error', 'Please input first name')
        pass=false
    }
    if(lastName === ''){
        view.setErrorMessage('last-name-error', 'Please input last name')
        pass=false
    }
    if(email === ''){
        view.setErrorMessage('email-error', 'Please input email')
        pass=false
    }
    if(password === ''){
        view.setErrorMessage('password-error', 'Please input password')
        pass=false
    }
    if(confirmedPassword === ''){
        view.setErrorMessage('confirmed-password-error', 'Please confirm password')
        pass=false
    }
    else if(password && confirmedPassword !== password){
        view.setErrorMessage('confirmed-password-error', 'Password did not match')
        pass=false
    }
    if(!pass) return
    const dataRegister = {
        firstName,
        lastName,
        email,
        password,
        confirmedPassword
    }
    model.register(dataRegister)
}

controller.login = ({email, password}) => {
    view.clearErrorMessages()
    pass=true
    if(email === ''){
        view.setErrorMessage('email-error', 'Please input email')
        pass=false
    }
    if(password === ''){
        view.setErrorMessage('password-error', 'Please input password')
        pass=false
    }
    if(!pass) return
    const dataLogin = {
        email,
        password
    }
    model.login(dataLogin)
}

controller.createConversation = ({title, email})=>{
    view.clearErrorMessages()
    pass=true
    if(title === ''){
        view.setErrorMessage('conversation-title-error', 'Please input title')
        pass=false
    }
    if(email === '' || !validateEmail(email)){
        view.setErrorMessage('conversation-email-error', 'Invalid email')
        pass=false
    }
    if(!pass) return
    model.addConversation({title,email})
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

