<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/home.css";
    import "../assets/editProfileView.css"
    import { onMounted, ref } from 'vue';
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from '@/components/bottomNavbarView.vue';
    import router from "@/router";

    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));
    
    let password = ref('');
    let userbio = ref('');
    const submitForm = async () => {
        const dataToSend = {
            username: username.value,
            password: password.value,
            bio: userbio.value
        };

        const response = await fetch('https://seng513project-production.up.railway.app/editProfile', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if(response.status==200){
            router.push("/profile/"+username.value);
        } else {
            alert("Unable to update account information");
        }
    };

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
    };

    onMounted(updateSessionData);
    window.addEventListener('storage', updateSessionData);

    defineExpose({loggedIn, username});

</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <header class = "header-section">
        <navbar></navbar>
    </header>

    <body>
        <div class="page-container">
            <div class ="back-arrow"><RouterLink :to="`/profile/${username}`"> <img src = "../components/icons/backArrow.svg" id = "arrow-img"> </RouterLink></div>
            <RouterLink :to="`/profile/${username}`"><p class = "back-text"> Back to User Profile</p></RouterLink>

            <form id="editProfile-form" @submit.prevent="submitForm">
                <div id="editProfile-header">
                    <h2 id = "editProfile-text">Edit Profile</h2>
                </div>
                <div class = "profile-break"></div>
                <div class="form-inputs">
                    <p>Username </p>
                    <input type="text" v-model="username" placeholder="Username" disabled="true">
                </div>
                <div class = "profile-break"></div>

                <div class="form-inputs">
                    <p>Password </p>
                    <input type="password" v-model="password" placeholder="Password">
                </div>
                <div class="form-inputs">
                    <p>Biography</p>
                    <input type="text" v-model="userbio" placeholder="Stuff about you!">
                </div>
                <div id="update">
                    <button type="submit" id = "update-btn">Update</button>
                </div>
            </form>

        </div>
    </body>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>