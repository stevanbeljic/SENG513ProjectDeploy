<script>
import "../assets/login.css";
import "../router/index.js";
import router from "../router/index.js";
    export default {
        methods: {
            async handleLogin() {
                console.log('Button clicked!');
                const route = "https://seng513project-production.up.railway.app/user/getAccount?username=" +
                this.username +
                "&password=" +
                this.password;
                console.log(route);
                console.log(this.username);
                console.log(this.password);
                const response = await fetch(route, {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(),
                });
                console.log(response);
                if(response.status==201){
                    const user_data = await response.json();
                    console.log(user_data);
                    sessionStorage.setItem("loggedIn", "true");
                    sessionStorage.setItem("loggedInAs", user_data[0].username);
                    sessionStorage.setItem("loggedInRole", user_data[0].role);
                    sessionStorage.setItem("loggedInId", user_data[0].id);
                    router.push("/");
                } else {
                    alert("Unauthorized credentials. Please try again or sign up below.");
                }
            },
        },
    };
</script>

<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <body>
        <div id="login-container">
            <form id="login-form" @submit.prevent="getFormValues">
                <div id="login-Header">
                    <h2 class="text-headers">Login</h2>
                </div>
                <div class="form-input">
                    <input type="text" v-model="username" placeholder="Username" required id="username-field">
                </div>
                <div class="form-input">
                    <input type="password" v-model="password" placeholder="Password" required id="password-field">
                    <a class="login-link" href="https://www.google.com/"><p>Forgot Password</p></a>
                </div>
                <div id="login-button">
                    <button @click="handleLogin" type="submit">Login</button>
                </div>

                <div id ="no-account">
                    <h3 class = "text-headers">Don't have an account?</h3>
                    <div id = "guestBtn">
                        <button>
                            <RouterLink to = "/" id ="routerGuestBtn">Continue as Guest</RouterLink>
                        </button>
                    </div>
                    <a class="login-link" href="./signup"><p>Sign Up</p></a>
                </div>
            </form>
        </div>
    </body>
</template>

