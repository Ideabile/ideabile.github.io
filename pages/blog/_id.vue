<template>
  <div class="blog">
    <div v-if="id">
      <h1 v-html="attributes.title"></h1>
      <div v-html="body">
      </div>
      <div id="disqus_thread"></div>
      <script :src="discussUrl" :data-timestam="timestamp"></script>
    </div>
    <div v-else>
      <h1>Thoughts</h1>
      <ul>
        <li v-for="item in blog">
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
   async data ( { route, store, error, env, params } ) {
     let data = {
       attributes: { title: '', body: ''},
       body: '',
       id: params.id || false,
       blog: env.content.blog.reverse(),
       discussUrl: 'https://ideabile.disqus.com/embed.js',
       now: new Date()
     }
     let res
     let url = route.params.id ? `${experiencesBasePathUrl}${route.params.id}.md` : `${experiencesBasePathUrl}`

     try{
       res = await axios.get(url)
     }catch(err){
       if (!err.response || err.response.status !== 404) {
         return error({ statusCode: 500, message: 'Error' })
       }
       return error({ statusCode: 404, message: 'Not found' })
     }

     data = Object.assign({}, data, res.data)
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
