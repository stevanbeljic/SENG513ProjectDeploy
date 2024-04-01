<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/home.css";
    import "../assets/friends.css";
    import { onMounted, ref } from 'vue';
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from '@/components/bottomNavbarView.vue';
    import router from "@/router";

    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
        console.log(loggedIn.value);
        console.log(username.value);
    };

    const friendsList = ref([]);
    const fetchFriendInfo = async () => {
            const route = "https://seng513project-production.up.railway.app/user/getFriends?username=" + username.value;
            console.log(route);
            console.log(username.value);
            const response = await fetch(route, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            });

            friendsList.value = await response.json();
            console.log(friendsList.value);
  };

  onMounted(async () => {
        updateSessionData();
        if(loggedIn.value != true){
            
            alert("Please login to view your Friends List");
            router.push("/");
        } else {
            try {
                await fetchFriendInfo();
            } catch (error){
                console.log(error);
            }
        }
    });

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
    <div class="friend-page-container">
        <div class = "top-section">
            <div>
                <img src = "../components/icons/user.svg" id = "friends-loggedin-user-icon">
            </div>
            <div>
                <h1 v-text="username+'\'s Friends'"></h1>
            </div>
        </div>
        <div class = "section-break">
            <button class ="friends-btn"><RouterLink to = "/friends">Friends</RouterLink> </button>
            <button class ="friends-btn" id ="request-btn"><RouterLink to = "/friendRequest">Requests</RouterLink></button>
            <button class ="friends-btn"> <RouterLink to = "/addFriend">Add A Friend</RouterLink></button>
        </div>
        <h2 id = "friends-title">Friends</h2>
        <div class = "friends-section">
            <ul>
                <li v-if="friendsList.length == 0">
                    <p class="friend">0 friends :(</p>
                </li>
                <li v-for="friend in friendsList" :key="friend.username">
                    <router-link :to="{ name: 'profile', params: { username: friend.username } }">
                        <div><img src = "../components/icons/user.svg" class = "friends-user-icon"></div>
                        <p class = "friend">{{ friend.username }}</p>
                    </router-link>
                </li>
            </ul>            
        </div>
    </div>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>