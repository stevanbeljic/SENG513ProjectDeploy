<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/discussion.css";
    import "../assets/viewAllDiscussions.css"
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from "../components/bottomNavbarView.vue";
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import router from "@/router";

    const game = ref([]);
    const route = useRoute();
    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');

    const fetchGame = async () => {
        const response = await fetch('https://seng513project-production.up.railway.app/game/getGameById?id='+route.params.gameid);
        const games = await response.json();
        game.value = games[0];
        game.value.discussions = await fetchDiscussion(game.value.id);
    };

    const fetchDiscussion = async (id) => {
        const response = await fetch('https://seng513project-production.up.railway.app/discussion/getDiscussionsByGame?id='+id);
        return await response.json();
    }

    const handleDiscussionClick = (id) =>{
        router.push({ name: 'discussionpost', params: { discussionId: id }})
    }

    const handleNewDiscussion = (id) => {
        if(loggedIn.value){
            router.push({ name: 'addDiscussion', params: {gameid: id} });
        } else {
            router.push('/login');
        }
    }

    onMounted(async () =>{
        try {
            await fetchGame();
        } catch (error) {
            console.log(error);
        }
    });

    defineExpose({handleDiscussionClick, game, handleNewDiscussion, loggedIn});
</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <header class = "header-section">
        <navbar></navbar>
    </header>

    <body>
        <div class="discussion-body-container">
            <div v-if="game" class="discussion-card">
                <div id="viewDiscGame" class="discussion-game-section">
                    <img :src="'https://seng513project-production.up.railway.app' + game.thumbnail" alt="Image Unavailable"/>
                    <h1 v-text="game.name+' - Discussions'"></h1>
                </div>
                <div class="discussion-list-section">
                    <div v-if="loggedIn" class="discussion-list-box" id="postButtonDiv"><button id="postButton" v-on:click="handleNewDiscussion(game.id)">Start a New Discussion</button></div>
                    <div v-if="game.discussions && game.discussions.length != 0">
                        <div class="discussion-list-box"  v-for="discussion in game.discussions" :key="discussion.discussion_id">
                            <div>
                                <h3 v-on:click="handleDiscussionClick(discussion.discussion_id)" v-text="discussion.title"></h3>
                            </div>
                            <div>
                                <button class="discussion-like-button">❤︎</button>
                            </div>
                        </div>
                    </div>
                    <div class="discussion-list-box" v-else>
                        <h3>Be the first to talk about {{ game.name }}!</h3>
                        <button class="discussion-like-button" v-on:click="handleNewDiscussion(game.id)">+</button>
                    </div>
                </div>
            </div>
        </div>
    </body>

    

    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>