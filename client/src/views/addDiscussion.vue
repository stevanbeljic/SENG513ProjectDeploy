<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/addDiscussion.css";
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from "../components/bottomNavbarView.vue";
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import router from "@/router";

    const game = ref([]);
    const route = useRoute();
    let username = ref(sessionStorage.getItem('loggedInAs'));
    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let loggedInId = ref(sessionStorage.getItem('loggedInId'));

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
    };

    const fetchGame = async () => {
        const response = await fetch('https://seng513project-production.up.railway.app/game/getGameById?id='+route.params.gameid);
        const games = await response.json();
        game.value = games[0];
    };

    const postDiscussion = async () => {
        const title = document.getElementById('discussionTitle').value;
        const text = document.getElementById('discussionText').value;
        const user = username.value;


        if (!title || !text || !user) {
            alert("Title and text must be provided");
            return;
        }

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let postDate = `${year}-${month}-${day}`;

        const discussionData = new FormData();
        discussionData.append('title', title);
        discussionData.append('text', text);
        discussionData.append('user', loggedInId.value);
        discussionData.append('game', game.value.id);
        discussionData.append('date', postDate);

        const response = await fetch(`https://seng513project-production.up.railway.app/discussion/postDiscussion`, {
            method: 'POST',
            body: discussionData
        });
        let status = await response.status;
        if(status === 200){
            alert("Published");
            router.push("/allDiscussions/"+game.value.id);
            return;
        } else {
            alert("Failed to publish");
            return;
        }
    }

    onMounted(async () =>{
        updateSessionData();
        try {
            fetchGame();
        } catch (error) {
            console.log(error);
            alert("Unable to post at this time");
        }
    });

    defineExpose({ game , postDiscussion});
</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <header class = "header-section">
        <navbar></navbar>
    </header>

    <body id="addDiscBody">
        <div id="newDiscussionDiv">
            <span>
                <div id="gameDiv">
                    <h1 v-text="'Posting in '+game.name"></h1>
                    <img :src="'https://seng513project-production.up.railway.app' + game.thumbnail" alt="Image Unavailable"/>
                </div>
                <div id="discussionContent">
                    <form>
                        <input class="newDiscussionData" type="text" id="discussionTitle" placeholder="Enter a title">
                        <textarea class="newDiscussionData" rows="10" id="discussionText"  placeholder="What did you want to say..."></textarea>
                        <input class="newDiscussionData" id="submitDiscussion" type="submit" value="Post" @click.prevent.self @click="postDiscussion">
                    </form>
                </div>
            </span>
        </div>
    </body>

    

    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>