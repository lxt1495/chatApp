const component = {}
component.registerPage = 
       `<div class="register-container">
        <div class="background-img"></div>
        <div class="form-wrapper">
            <div class="register-header">MinX Chat</div>
            <form id="register-form">
                <div class="name-wrapper">
                    <div class="input-wrapper">
                        <input type="text" name="firstName" placeholder="First name"/>
                        <div id="first-name-error" class="err"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" name="lastName" placeholder="Last name"/>
                        <div id="last-name-error" class="err"></div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input type="email" name="email" placeholder="Email"/>
                    <div id="email-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="Password"/>
                    <div id="password-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="confirmedPassword" placeholder="Confirm Password"/>
                    <div id="confirmed-password-error" class="err"></div>
                </div>
                <div class="register-form-action">
                    <div>
                        Already have an account? <span class="cursor-pointer" id="redirect-login">Login</span>
                    </div>
                    <button class="btn" type="submit">Register</button>
                </div>    
            </form>
        </div>
        </div>`

component.loginPage =    
       `<div class="login-container">
        <div class="background-img"></div>
        <div class="form-wrapper">
            <div class="login-header">MinX Chat</div>
            <form id="login-form">
                <div class="input-wrapper">
                    <input type="email" name="email" placeholder="Email"/>
                    <div id="email-error" class="err"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="Password"/>
                    <div id="password-error" class="err"></div>
                </div>
                <div class="login-form-action">
                    <div>
                        Don't have an account? <span id="redirect-register" class="cursor-pointer">Register</span>
                    </div>
                    <button class="btn" type="submit">Login</button>
                </div>    
            </form>
        </div>
        </div>`

component.welcomePage = "WelocomePage"

component.chatPage = 
        `<div class="chat-container">
        <div class="header">MinX Chat</div>
        <div class="main">
            <div class="conversation-detail">
                <div class="conversation-title">First Conversation</div>
                <div class="list-message"></div>
                <form id="send-message-form">
                    <input type="text" placeholder="Type a message" name="message">
                    <button class="btn">Send</button>
                </form>
            </div>
        </div>
        </div>`