<template>
  <div class="experiences">
    <div v-if="id">
      <h1 v-html="attributes.title"></h1>
      <experience v-bind:items="attributes.details"/>
      <div v-html="body"></div>
    </div>
    <div v-else>
      <h1>Experiences</h1>
      <ul>
        <li v-for="item in experiences">
          <nuxt-link :to="'/experience/'+item.file">{{ item.attributes.title }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
 import axios from 'axios'
 import experience from './../../components/experienceGraph.vue'
 const experiencesBasePathUrl = 'http://localhost:3051/experiences'

 export default{
   components : {
     experience
   },
   async data ( { route, store, error, env, params } ) {
     let data = {
       attributes: { title: '', body: ''},
       body: '',
       id: params.id || false,
       experiences: env.content.experiences.reverse()
     }
     let res
     let url = route.params.id ? `${experiencesBasePathUrl}/${route.params.id}.md` : `${experiencesBasePathUrl}/resume`

     try{
       res = await axios.get(url)
     }catch(err){
       if (err.response.status !== 404) {
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
 .experiences{
   padding: 0 30px;
 }
 @media (max-width: 900px){
   .experiences{
     padding: 0 10px;
   }
 }
</style>
