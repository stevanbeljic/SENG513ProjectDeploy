<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/discussion.css";
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from "../components/bottomNavbarView.vue";
    import { onMounted, ref } from "vue";
    import router from "@/router";


    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    const fetchedGames = ref([]);
    const fetchAllGames = async () => {
        const response = await fetch('https://seng513project-production.up.railway.app/game/getAllGames');
        const games = await response.json();
        for (let game of games) {
            game.discussions = await fetchDiscussion(game.id);
        }

        fetchedGames.value = games;
    };

    const fetchDiscussion = async (id) => {
        const response = await fetch('https://seng513project-production.up.railway.app/discussion/getDiscussionsByGame?id='+id);
        return await response.json();
    }

    const handleDiscussionClick = (id) =>{
        console.log(id);
        router.push({ name: 'discussionpost', params: { discussionId: id }})
    }

    const handleViewAll = (id) => {
        router.push({ name: 'allDiscussions', params: { gameid: id}});
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
            fetchAllGames();
        } catch (error) {
            console.log(error);
        }
    });

    defineExpose({handleDiscussionClick, handleViewAll, handleNewDiscussion});
</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <header class = "header-section">
        <navbar></navbar>
    </header>
    <div class="discussion-body-container">
        <div v-for="game in fetchedGames" :key="game.id" class="discussion-card">
            <div class="discussion-game-section">
                <img :src="'https://seng513project-production.up.railway.app' + game.thumbnail" alt="Image Unavailable"/>
                <h1 v-text="game.name"></h1>
            </div>
            <div class="discussion-list-section">
                <div v-if="game.discussions.length != 0">
                    <div class="discussion-list-box"  v-for="discussion in game.discussions.slice(0, 3)" :key="discussion.discussion_id">
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
            <div class="discussion-view-all-section">
                <button class="discussion-view-all-button" v-on:click="handleViewAll(game.id)">↪ View all</button>
            </div>
        </div>
    </div>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>