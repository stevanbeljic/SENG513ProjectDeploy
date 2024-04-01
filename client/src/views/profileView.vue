<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/home.css";
    import navbar from "../components/navbarView.vue";
    import "../assets/profileView.css";
    import bottomNavbar from '@/components/bottomNavbarView.vue';
    import { onMounted, ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import router from "@/router";

    let route = useRoute();

    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));
    let userBio = ref('');
    let profileUsername = ref('');

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
    };

    const userData = ref([]);
    const fetchUserInfo = async () => {
        const response = await fetch('https://seng513project-production.up.railway.app/viewProfile/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: profileUsername.value })
        });
        const data = await response.json();
        userData.value = data;
        profileUsername.value = data[0].username;
        userBio.value = data[0].bio;
    }

    const topGames = ref([]);
    const fetchTopGames = async() => {
        const response = await fetch('https://seng513project-production.up.railway.app/user/topGames?username='+profileUsername.value);
        topGames.value = await response.json();
    }

    const logout = () => {
        router.push("/");
        sessionStorage.setItem("loggedIn", "false");
        sessionStorage.setItem("loggedInAs", null);
        sessionStorage.setItem("loggedInRole", "guest");
    }

    onMounted(async () => {
        updateSessionData();
        const route = useRoute();
        profileUsername.value = route.params.username;

        if(loggedIn.value != true){
            router.push("/login");
        } else {
            try {
                await fetchUserInfo();
                await fetchTopGames();
            } catch (error){
                console.log(error);
            }
        }
    });

    watch(() => route.params.username, async (newUsername) => {
        profileUsername.value = newUsername;
        await fetchUserInfo();
    });

    window.addEventListener('storage', updateSessionData);
    defineExpose({loggedIn, username, userBio, logout, profileUsername, topGames});

</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <header class = "header-section">
        <navbar></navbar>
    </header>
    <body>
    <div id="profile-div">
        <div class="profileSubDiv">
                <img src = "../components/icons/user.svg" id ="users-icon">
            <div class="userEditDiv">
                <div class = "profileItem" id="usernameDiv" v-text="profileUsername"></div>
                <div v-if="profileUsername===username" class = "profileItem"> <RouterLink to="/editProfile">
                    <button class ="edit-btn">Edit Profile</button>
                </RouterLink></div>
            </div>
        </div>
        <div class="profileSubDiv">
            <div id="profileViewBioLogoutDiv">
                <div class="profileItem" id="bioDiv" v-text="userBio"></div>
                <button v-if="profileUsername===username" class="logout-btn" @click="logout">Logout </button>
            </div>
        </div>
        <div class = "profile-break"></div>
        <h1 v-if="topGames.length!=0" id = "myTopGames">My Top Games</h1>
        <div class = "profile-break"></div>

        <div id = "top-games" v-if="topGames.length!=0">
            <ul>
                <li v-for="game in topGames" :key="game.id">
                    <div class="topGamesImage">
                        <img :src="'https://seng513project-production.up.railway.app' + game.thumbnail" alt="Image Unavailable" id ="marioIcon">
                    </div>
                    <div class="topGamesImageTitle">
                        <h3 v-text="game.name"></h3>
                    </div>
                    <div class="topGamesGenres">
                        <p v-text="game.genre"></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </body>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>