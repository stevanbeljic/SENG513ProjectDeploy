<script setup>
  import bottomNavbar from '@/components/bottomNavbarView.vue';
  import { onMounted, ref } from 'vue';
  import "../assets/footer.css";
  import "../assets/header.css";
  import "../assets/home.css";
  import navbar from "../components/navbarView.vue";
  import router from "@/router";

  let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
  let username = ref(sessionStorage.getItem('loggedInAs'));

  const updateSessionData = () => {
    loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
    username.value = sessionStorage.getItem('loggedInAs');
  };

  const newsData = ref([]);
  const trendingGame = ref([]);
  const trendingDiscussions = ref([]);

  const fetchNewsData = async () => {
    const response = await fetch('https://seng513project-production.up.railway.app/homeDashboard');
    const data = await response.json();
    newsData.value = data;
  };

  const fetchTrendingGame = async () => {
    const response = await fetch('https://seng513project-production.up.railway.app/game/trendingGame');
    const data = await response.json();
    trendingGame.value = await data;
  }

  const fetchTrendingDiscussions = async() => {
    const response = await fetch('https://seng513project-production.up.railway.app/discussion/trendingDiscussions');
    const data = await response.json();
    trendingDiscussions.value = await data;
  }

  const handleDiscussionClick = (id) =>{
        console.log(id);
        router.push({ name: 'discussionpost', params: { discussionId: id }})
    }

  onMounted(async () => {
    updateSessionData();
    try {
      await fetchTrendingGame();
      await fetchNewsData();
      await fetchTrendingDiscussions();
    } catch (error){
      console.log(error);
    }
  });

  window.addEventListener('storage', updateSessionData);
  defineExpose({loggedIn, username, handleDiscussionClick});

</script>

<template>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@100&display=swap" rel="stylesheet">
  </head>
  <header class="header-section">
    <navbar></navbar>
  </header>

  <body>
    <div id="dashboardDiv">
      <div id="topHalfDiv">
        <div id="trendingDiv">
            <div class="subTitleDiv">
              <h2>Trending Release🔥</h2>
            </div>
            <router-link id="routerLink" :to="'/game/' + trendingGame.id">
              <div id="trendingContentDiv">
                <img :src="'https://seng513project-production.up.railway.app' + trendingGame.thumbnail" alt="Image Unavailable"/>
                <div id="gameDescDiv">
                  <h3 v-text="trendingGame.name"></h3>
                  <p id="publisher" v-text="trendingGame.publisher"></p>
                  <p id="gameDescription" v-text="trendingGame.description"></p>
                  <div id="genreDiv">
                    <p class="genre" v-text="trendingGame.genre"></p>
                  </div>
                  <div id="info">
                    <p class="tags" id="price" v-text="'App Store: $'+trendingGame.appstoreprice"></p>
                    <p class="tags" id="price" v-text="'Play Store: $'+trendingGame.playstoreprice"></p>
                  </div>
                </div>
              </div>
            </router-link>
        </div>
        <div id="recentDiscussionsDiv">
          <div class="subTitleDiv">
            <h2>Recent Discussions</h2>
            <ul>
              <li v-for="d in trendingDiscussions" :key="d.discussion_id">
                <h3 v-text="d.title" v-on:click="handleDiscussionClick(d.discussion_id)"></h3>
                <a>❤︎</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="bottomHalfDiv">
        <div id="newsDiv">
          <h2>Recent News in Gaming 📰</h2>
          <div id="newsContent">
            <div class="newsItem" v-for="item in newsData" :key="item.title">
              <a :href="item.articleLink" target="_blank">
                <img :src="item.imageLink">
                <p>{{ item.title }}</p>
                <p class="articleDesc">{{ item.deck }}</p>
              </a>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </body>

  
  <footer class="footer-section">
    <bottomNavbar></bottomNavbar>
  </footer>
  
</template>
