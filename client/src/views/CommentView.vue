<script setup>
    import "../assets/footer.css";
    import "../assets/header.css";
    import "../assets/comment.css";
    import { onMounted, ref } from 'vue';
    import navbar from "../components/navbarView.vue";
    import bottomNavbar from "../components/bottomNavbarView.vue";
    import router from "@/router";
    import { useRoute } from 'vue-router';
    
    onMounted(updateSessionData);
    window.addEventListener('storage', updateSessionData);
    defineExpose({loggedIn, username, userId});
</script>
<script>
    let loggedIn = ref(sessionStorage.getItem('loggedIn') === 'true');
    let username = ref(sessionStorage.getItem('loggedInAs'));
    let userId = ref(sessionStorage.getItem('loggedInId'));
    const updateSessionData = () => {
        loggedIn.value = sessionStorage.getItem('loggedIn') === 'true';
        username.value = sessionStorage.getItem('loggedInAs');
        userId.value = sessionStorage.getItem('loggedInId');
        console.log(loggedIn.value);
        console.log(username.value);
        console.log(userId.value);
    };  
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
                console.log(data[0])
            })
            .catch(err => console.log(err.message));
        },
        data() {
            return{
                game_name: '',
                game_id: '',
                discussion_title: '',
                discussion_description: '',
                poster: '',
                comment: '',
            }
        },
        methods: {
            backToGame: function(){
                router.push({ name: 'game', params: { id: this.game_id }})
            },

            submitNewComment: async function(){
                
                const body = {
                    comment: this.comment,
                    discussion_id: this.$route.params.discussionId,
                    poster_id: userId.value
                }
                console.log(body)
                const response = await fetch('https://seng513project-production.up.railway.app/discussion/addDiscussionResponse', {method: 'POST', headers: {"Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "POST","Content-Type" : "application/json"}, body: JSON.stringify(body)})
                console.log(response);
                if(response.status==200){
                    this.backToGame();
                }
            }
        }
    }
</script>
<template>
    <head>
        <link href='https://fonts.googleapis.com/css?family=Kanit' rel='stylesheet'>
        <link href="https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap" rel="stylesheet">
    </head>
    <header class ="header-section">
        <navbar></navbar>
    </header>
    <body>
        <div class="comment-body-container">
            <div class="comment-header-section">
                <button id="comment-back-button" v-on:click="backToGame">◁ Back to {{game_name}}</button>
                <h1>{{ discussion_title }}</h1>
                <h4>Posted in <u>{{game_name}}</u></h4>
            </div>
            <div class="comment-user-section">
                <p>Replying to <u>{{poster}}</u>'s comment</p>
                <div class="comment-message-box">
                    <p>{{discussion_description}}</p>
                </div>
            </div>

            <div class="reply-section">
                <h3>Your Comment</h3>
                <form>
                    <textarea id="reply-message" placeholder="Enter comment" v-model="comment"></textarea> <br>
                    <input type="button" id="reply-button" value="Reply" v-on:click="submitNewComment">
                </form>
            </div>
        </div>
    </body>
    <footer class="footer-section">
        <bottomNavbar></bottomNavbar>
    </footer>
</template>