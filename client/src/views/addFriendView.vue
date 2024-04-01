<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/home.css";
    import "../assets/friends.css";
    import "../assets/addFriend.css";
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from '@/components/bottomNavbarView.vue';
    import "../assets/friendRequest.css"
    import { onMounted, ref } from 'vue';
    import router from "@/router";

    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));
    let friendUser = ref('');

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
    };

    const sendRequest = async () => {
        if(friendUser.value == null || friendUser.value == ""){
            return;
        }
        if(username.value===friendUser.value){
            alert("Invalid friend request.");
            window.location.reload();
            return;
        }
        const response = await fetch(`https://seng513project-production.up.railway.app/user/sendRequest?username=${username.value}&friendUser=${friendUser.value}`, {
            method: 'POST',
        });
        let status = await response.status;
        if(status==409){
            alert("Already friends with "+friendUser.value);
        }
        else if(status !== 200){
            alert("Unable to send friend request to "+friendUser.value+". Try again later.");
        }
        window.location.reload();
    };

    onMounted(async () => {
        updateSessionData();
        if(loggedIn.value != true){
            router.push("/");
            alert("Please login to view your Friends List");
        }
    });
    window.addEventListener('storage', updateSessionData);

    defineExpose({sendRequest});

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
                <h1 v-text="username+'\'s Requests'"></h1>
            </div>
        </div>
        <div class = "section-break">
            <button class ="friends-btn"><RouterLink to = "/friends">Friends</RouterLink> </button>
            <button class ="friends-btn" id ="request-btn"><RouterLink to = "/friendRequest">Requests</RouterLink></button>
            <button class ="friends-btn"> <RouterLink to = "/addFriend">Add A Friend</RouterLink></button>
        </div>
        <div id = "addFriendDiv">
            <form id="addFriend-form" @submit.prevent="getFormValues">
                <div id="addFriend-header">
                    <h2 id = "addFriend-text">Add Friend</h2>
                </div>
                <div class = "profile-break"></div>
                <div class="addFriendForm-inputs">
                    <p>Username </p>
                    <input type="text" v-model="friendUser" placeholder="Username" id="friendUser">
                </div>

                <div id="search">
                    <button type="submit" id = "search-btn" @click="sendRequest()">Add</button>
                </div>
            </form>
        </div>
    </div>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>