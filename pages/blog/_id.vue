<template>
  <div class="blog">
    <div v-if="article">
      <h1 v-html="article.attributes.title"></h1>
      <div v-html="article.body">
      </div>
      <div id="disqus_thread"></div>
      <script :src="discussUrl" :data-timestamp="now"></script>
    </div>
    <div v-else>
      <h1>Thoughts</h1>
      <ul>
        <li v-for="item in all">
          <nuxt-link :to="'/blog/'+item.file">{{ item.attributes.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
 import axios from 'axios'
 const experiencesBasePathUrl = 'http://localhost:3051/articles/'

 export default{
   asyncData ( { route, store, error, env, params } ) {
     let data = {
       article: null,
       all: env.content.blog.reverse(),
       discussUrl: 'https://ideabile.disqus.com/embed.js',
       now: new Date()
     }


     if(params.id){
       data.article = env.content.blog.filter( article => {
         return article.file.indexOf(params.id) > -1
       })[0]
     }

     return data
   }
 }
</script>

<style scoped>
 .blog{
   padding: 0 30px;
 }
 @media (max-width: 900px){
   .blog{
     padding: 0 10px;
   }
 }
</style>
