<script setup>
import "../assets/footer.css";
import "../assets/header.css";
import "../assets/catalog.css";
import navbar from "../components/navbarView.vue";
import bottomNavbar from '@/components/bottomNavbarView.vue';
import router from "@/router";
</script>

<script>
    

    export default {
        Name: "catalogView",
        data(){
            return{
                search: '',
                games: []
            }
        },
        computed: {
            filteredGames(){
                if(this.games.length > 0){
                    return this.games.filter(item => 
                        item.name.toLowerCase().includes(this.search.toLowerCase()))
                }
                else{
                    return null;
                }
            }
        },
        mounted(){
                let route = "https://seng513project-production.up.railway.app/game/getAllGames";
                fetch(route, {method: "GET"})
                .then(res => res.json())
                .then(data => this.games = data)
                .catch(err => console.log(err.message));
        },
        methods: {
            handleClick: function(e){
                console.log(e)
                router.push({ name: 'game', params: { id: e }})
            }
        }
    };
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
        <div id="search-bar">
            <!-- <ul>
                <li>Recommended</li>
                <li>Top Sellers</li>
                <li>Latest</li>
            </ul> -->
            <form>
                <div id="search-img">
                    <img src="../components/icons/magnifying-glass.svg"/>
                </div>
                <input type="text" placeholder="Search" id="search-input" v-model="search"/>
            </form>
        </div>
        <div id="games-container">
            <!-- <div v-for="item in filteredGames" :key="item.id" class="game-card">
                <a href="/game">
                <div id="game-img-container">
                    <img src="../components/icons/mario.jpg"/>
                </div>
                <hl class="game-title">{{item.title}}</hl>
                <h3 class="developer-name">{{item.developer}}</h3>
                <h3 class="game-genre">{{item.genre}}</h3>
                <p>App Store Price: {{ item.AppPrice }}</p>
                <p>Play Store Price: {{ item.Playprice }}</p>
            </a>
            </div> -->

            <div v-for="item in filteredGames" :key="item.id" class="newsItem" v-on:click=handleClick(item.id)>
                <!-- <a href={{ }}> -->
                    <img :src="'https://seng513project-production.up.railway.app' + item.thumbnail" alt="Image Unavailable"/>
                    <p>{{ item.name }}</p>
                    <p class="articleDesc">{{ item.description }}</p>
                <!-- </a> -->
            </div>
        </div>
    </div>
    </body>
    <footer class="footer-section">
    <bottomNavbar></bottomNavbar>
  </footer>
</template>
