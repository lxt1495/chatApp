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
    }
}

view.clearErrorMessages = ()=>{
    Object.values(document.querySelectorAll('.err')).forEach(x=>x.innerText='')
}

view.setErrorMessage = (elementId, message)=>{
    document.getElementById(elementId).innerText = message
}