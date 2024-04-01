<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/postview.css";
    import { onMounted, ref } from 'vue';
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from '@/components/bottomNavbarView.vue';
    import { useRoute } from 'vue-router';
    import router from "@/router";
    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));

    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
        console.log(loggedIn.value);
        console.log(username.value);
    };

onMounted(updateSessionData);

window.addEventListener('storage', updateSessionData);

defineExpose({loggedIn, username});
</script>

<script>
    export default {
        setup(){
            const route = useRoute();
            return {route};
        },
        mounted() {
            fetch("https://seng513project-production.up.railway.app/discussion/getDiscussionAndPosterById?id=" +  this.$route.params.discussionId, {method: "GET"})
            .then(res => res.json())
            .then(data => {
                this.game_name = data[0].name;
                this.game_id = data[0].id;
                this.discussion_title = data[0].title;
                this.discussion_description = data[0].description;
                this.poster = data[0].username
            })
            .catch(err => console.log(err.message));

            fetch("https://seng513project-production.up.railway.app/discussion/getDiscussionResponses?id=" +  this.$route.params.discussionId, {method: "GET"})
            .then(res => res.json())
            .then(data => {this.responses = data
            console.log(this.responses)})
            .catch(err => console.log(err.message));
        },
        data() {
            return{
                game_name: '',
                game_id: '',
                discussion_title: '',
                discussion_description: '',
                poster: '',
                responses: []
            }
        },
        methods: {
            backToGame: function(){
                router.push({ name: 'game', params: { id: this.game_id }})
            },
            addResponse: function(){
                router.push({ name: 'comment', params: { discussionId: this.$route.params.discussionId}});
            }
        }
    }
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
    <div id="discussionContent">
        <div id="backButton">
            <p v-on:click="backToGame" class="discussionTitle">◁ Back to <span>{{ game_name }}</span></p>
        </div>
        <div id="postTitle">
            <h1>{{ discussion_title }}</h1>
        </div>
        <div id="postContent">
            <p> {{ discussion_description }} </p>
        </div>
        <hr/>
        <div id="responseDiv">
            <h2>Replies</h2>
            <p v-if="loggedIn==true" v-on:click="addResponse" id="addResponse">+ Add a Response</p>
        </div>
        <div id="replies">
            <ul>
                <li class="replyItem" v-for="response in responses" v-bind:key="response.comment_ordinal">
                    <div class="replierName">
                        <p>{{ response.username }}</p>
                    </div>
                    <div class="replyMessage">
                        <p>{{ response.comment_text }}</p>
                    </div>
                </li>
                <!-- <li class="replyItem">
                    <div class="replierName">
                        <p>LuigiH8er27</p>
                    </div>
                    <div class="replyMessage">
                        <p>Ugh, Luigi in this Evil mario game is the absolute worst! Always lurking around with his creepy grin, waiting to strike.</p>
                    </div>
                </li>
                <li class="replyItem">
                    <div class="replierName">
                        <p>G0DG4mer</p>
                    </div>
                    <div class="replyMessage">
                        <p>LOL You must be a serious noob XD Let me teach you how to get past Luigi. First you need to pick up the red shell, not the green. Then, continously strike until he trips, then jump on his head and you win. Wasnt that hard...</p>
                    </div>
                </li>
                <li class="replyItem">
                    <div class="replierName">
                        <p>LikeAbO55</p>
                    </div>
                    <div class="replyMessage">
                        <p>Don't worry, it should be pretty easy once you learn how the AI works.</p>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
  </body>

  <footer class="footer-section">
    <bottomNavbar></bottomNavbar>
  </footer>
</template>