<script>
    import "../assets/login.css";
    import "../router/index.js";
    import router from "@/router";

    export default {
        data: function(){
            return{
                username: "",
                email: "",
                password: "",
                userDev: ""
            }
        },
        methods: {
            async handleSignUp() {
                if(this.username === "" || this.email === "" || this.password === ""){
                    alert("Unable to create account. Ensure you entered all required information."); 
                    return;
                }
                console.log("Username: " + this.username + " Email: " + this.email + " Password: " + this.password); 
                const body = {
                    username : this.username,
                    email : this.email,
                    password : this.password,
                    role: this.userDev
                }
                let route = "https://seng513project-production.up.railway.app/user/createAccount";
                const response = await fetch(route, {method: "POST",headers: {"Access-Control-Allow-Origin" : "*",
                                                        "Access-Control-Allow-Methods" : "POST",
                                                        "Content-Type" : "application/json"}, body: JSON.stringify(body)});
                console.log(response);
                if(response.status==201){
                    router.push("/login");
                } else {
                    alert("Unable to create account. Ensure you entered all required information.");
                }
                return;
            },
        },
    };
</script>

<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <body>
        <div id="page-container">
        <div id="login-container">
            <form id="login-form">
                <div id="login-Header">
                    <h2>Sign Up</h2>
                </div>
                <div class="form-input">
                    <input type="email" v-model="email" placeholder="Email" id="email-field">
                </div>
                <div class="form-input">
                    <input type="text" v-model="username" placeholder="Username" id="username-field">
                </div>
                <div class="form-input">
                    <input type="password" v-model="password" placeholder="Password" id="password-field">
                </div>
                <div class="form-input" id="user-class-selector">
                    <label for="userDev">Which user are you?</label>
                    <select v-model="userDev" name="userDev"  id="userDev">
                        <option value="registered" selected>Gamer</option> 
                        <option value="developer">Developer</option>
                    </select>
                </div>
                <div id="login-button">
                    <button  type="submit" @click.prevent.self @click="handleSignUp">Sign Up</button>
                    <a class="login-link" href="./login"><p>Already have an account? Sign in here</p></a>
                </div>
            </form>
        </div>
        </div>
    </body>
</template>
