<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/home.css";
    import "../assets/friends.css";
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from '@/components/bottomNavbarView.vue';
    import "../assets/friendRequest.css"
    import { onMounted, ref } from 'vue';
    import router from "@/router";

    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
    };

    const confirmRequest = async (friendUsername) => {
        const response = await fetch(`https://seng513project-production.up.railway.app/user/confirmRequest?username=${username.value}&friendUsername=${friendUsername}`, {
            method: 'POST',
        });
        let status = await response.status;
        if(status === 200){
            window.location.reload();
        } else {
            alert("Unable to add ", friendUsername ,"'s request");
        }
    };

    const rejectRequest = async (friendUsername) => {
        const response = await fetch(`https://seng513project-production.up.railway.app/user/rejectRequest?username=${username.value}&friendUsername=${friendUsername}`, {
            method: 'POST',
        });

        let status = await response.status;
        if(status === 200){
            window.location.reload();
        } else {
            alert("Unable to delete ", friendUsername ,"'s request");
        }
    };

    const revokeRequest = async (friendUsername) => {
        const response = await fetch(`https://seng513project-production.up.railway.app/user/rejectRequest?username=${friendUsername}&friendUsername=${username.value}`, {
            method: 'POST',
        });

        let status = await response.status;
        if(status === 200){
            window.location.reload();
        } else {
            alert("Unable to delete ", friendUsername ,"'s request");
        }
    };

    const incomingFriendsRequestList = ref([]);
    const fetchIncomingFriendRequests = async () => {
            const route = "https://seng513project-production.up.railway.app/user/getIncomingFriendRequests?username=" + username.value;
            const response = await fetch(route, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            });

            incomingFriendsRequestList.value = await response.json();
    };

    const outgoingFriendsRequestList = ref([]);
    const fetchOutgoingFriendRequests = async () => {
            const route = "https://seng513project-production.up.railway.app/user/getOutgoingFriendRequests?username=" + username.value;
            const response = await fetch(route, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(),
            });

            outgoingFriendsRequestList.value = await response.json();
    };

  onMounted(async () => {
        updateSessionData();
        if(loggedIn.value != true){
            router.push("/");
            alert("Please login to view your Friends List");
        } else {
            try {
                await fetchIncomingFriendRequests();
                await fetchOutgoingFriendRequests();
            } catch (error){
                console.log(error);
            }
        }
    });

  window.addEventListener('storage', updateSessionData);

  defineExpose({loggedIn, username, confirmRequest, rejectRequest, revokeRequest});


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
        <h2 class = "friend-req-title">Incoming Friend Requests</h2>

        <div class = "request-section">
            <ul>
                <li v-if="incomingFriendsRequestList.length == 0">
                    <p class="friendReq1">No Incoming Request</p>
                </li>
                <li v-for="friend in incomingFriendsRequestList" :key="friend.username">
                    <div><img src = "../components/icons/user.svg" class = "friends-user-icon"></div>
                    <p class = "friendReq1">{{ friend.username }}</p>
                    <div>
                        <button class = "confirm" @click="confirmRequest(friend.username)">Confirm</button>
                        <button class = "deny" @click="rejectRequest(friend.username)">Reject</button>
                    </div>
                </li>
            </ul>
        </div>

        <h2 class = "friend-req-title">Outgoing Friend Requests</h2>
        <div class = "request-section">
            <ul id="outgoingList">
                <li v-if="outgoingFriendsRequestList.length == 0">
                    <p class="friendReq1">No Outgoing Request</p>
                </li>
                <li class="outgoingFriendReq" v-for="friend in outgoingFriendsRequestList" :key="friend.username">
                    <div><img src = "../components/icons/user.svg" class = "friends-user-icon"></div>
                    <p class = "friendReq1">{{ friend.username }}</p>
                    <button class = "deny" @click="revokeRequest(friend.username)">Cancel</button>
                </li>
            </ul>
        </div>
    </div>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>