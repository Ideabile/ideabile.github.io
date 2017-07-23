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
 import GetApiUrl from './../../utils/GetApiUrl'

 export default{
   async asyncData ({ env, isClient, params }) {
     if(params.id === 'index') params.id = false
     let pathUrl = !params.id ? 'articles/all' : `articles/${params.id}`

     let { data } = await axios.get(GetApiUrl(env, isClient, pathUrl))

     return {
       discussUrl: 'https://ideabile.disqus.com/embed.js',
       now: new Date(),
       article: params.id ? data : null,
       all: !params.id ? data.articles.reverse() : null
     }
   },
   head () {
     if (this.article) return {
       title: this.article.attributes.title
     }

     return { title: 'Thoughts' }
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
