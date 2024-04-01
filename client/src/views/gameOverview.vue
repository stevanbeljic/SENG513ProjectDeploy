<script setup>
import "../assets/footer.css";
import "../assets/gameOverview.css";
import "../assets/header.css";
import "../assets/home.css";
import navbar from "../components/navbarView.vue";
import bottomNavbar from '@/components/bottomNavbarView.vue';
import { useRoute } from 'vue-router';
import { ref } from "vue";
import router from "@/router";
</script>
<script>
    let loggedInId = ref(sessionStorage.getItem('loggedInId'));
    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let added = ref([]);
    
    const updateSessionData = async () => {
        const route = useRoute();
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        loggedInId.value = sessionStorage.getItem('loggedInId');
        const response = await fetch("https://seng513project-production.up.railway.app/game/existsTopGame?userid="+loggedInId.value+"&gameid="+route.params.id, {method: "GET"});
        
        added.value = false;
        if (response.status == 200){
            const data = await response.json();
            if (data.length > 0){
                added.value = true;
            }
        }
        return;
    };

    export default {
        setup(){
            const route = useRoute();
            return {route};
        },
        mounted() {
            updateSessionData();

            let bRoute = "https://seng513project-production.up.railway.app/game/getGameById?id="+ this.$route.params.id; 
            fetch(bRoute, {method: "GET"})
            .then(res => res.json())
            .then(data => this.game = data[0])
            .catch(err => console.log(err.message));

            fetch("https://seng513project-production.up.railway.app/discussion/getDiscussionsByGame?id="+ this.$route.params.id, {method: "GET"})
            .then(res => res.json())
            .then(data => {this.discussions = data
            console.log(data)})
            .catch(err => console.log(err.message));
        },
        data() {
            return{
                game: '',
                discussions: []
            }
        },
        methods: {
            handleDiscussionClick: function(id){
                console.log(id)
                router.push({ name: 'discussionpost', params: { discussionId: id }})
            },

            handleViewAll: function(id){
                router.push({ name: 'allDiscussions', params: {gameid: id} });
            },

            addToTopGames: async function(gameid){
                const response = await fetch("https://seng513project-production.up.railway.app/game/addTopGame?userid="+loggedInId.value+"&gameid="+gameid, {method: "POST"});
                if (response.status == 200){
                    alert("Added game");
                    window.location.reload();
                    return;
                } else {
                    alert("Unable to add to Top Games");
                    return;
                }
            }
        }

    }
</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    </head>
    <header class = "header-section">
        <navbar></navbar>
    </header>
    <div class="body-container">
        <div class="game-overview">
            <div id="cover-image">
                <img :src="'https://seng513project-production.up.railway.app' + game.thumbnail" alt="Image Unavailable"/>
            </div>
            <div id="game-information">
                <div id="game-details">
                    <div id="basic-details">
                        <div id="game-publisher">
                            <h1 id="game-name">{{ game.name }}</h1>
                            <p id="publisher-name">By: {{ game.publisher }}</p>
                        </div>
                        <div>
                            <h3 id="game-categories">{{ game.genre }}</h3>
                        </div>
                    </div>
                    <div id="advanced-details">
                        <div class="store-info">
                            <a href="https://www.apple.com/ca/app-store/">
                                <img id="app-store" src="../components/icons/app-store-icon.jpg"/>
                            </a>
                            <p>${{ game.appstoreprice }}</p>
                        </div>
                        <div class="store-info">
                            <a href="https://play.google.com/store/games?hl=en&gl=US">
                                <img id="play-store" src="../components/icons/playstore-icon.svg"/>
                            </a>
                            <p>${{ game.playstoreprice }}</p>
                        </div>
                    </div>
                </div>
                <div id="game-description">
                    <p>{{ game.description }}</p>
                    <button v-if="loggedIn && !added" id="addToTopGames" v-on:click="addToTopGames(game.id)" >Add to your Top Games</button>
                    <button v-else-if="loggedIn && added" id="addedToTopGames" disabled="true" v-on:click="addToTopGames(game.id)" >In your Top Games</button>
                </div>
            </div>
        </div>
        <div class="discussion-list-section" id="overview-discussion-section">
            <h1 id="discussion-label">Discussions Board</h1>
            <div class="discussion-list-box" v-for="discussion in discussions.slice(0, 5)" :key="discussion.discussion_id">
                <div v-on:click="handleDiscussionClick(discussion.discussion_id)" class="discussionTitle"><h3>{{ discussion.title }}</h3></div>
                <div><button class="discussion-like-button">❤︎</button></div>
            </div>
            <div class="discussion-view-all-section">
                <button class="discussion-view-all-button" v-on:click="handleViewAll(game.id)">↪ VIEW ALL</button>
            </div>
        </div>
    </div>
    <footer class="footer-section">
    <bottomNavbar></bottomNavbar>
  </footer>
</template>