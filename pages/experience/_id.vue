<template>
  <div class="experiences">
    <div v-if="experience">
      <h1 v-html="experience.attributes.title"></h1>
      <experience v-bind:items="experience.attributes.details"/>
      <div v-html="experience.body"></div>
    </div>
    <div v-else>
      <h1>Experiences</h1>
      <ul>
        <li v-for="item in all">
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
   asyncData ( { route, store, error, env, params } ) {
     let data = {
       experience: null,
       all: env.content.experiences.reverse()
     }

     if(params.id){
       data.experience = env.content.experiences.filter( experience => {
         return experience.file.indexOf(params.id) > -1
       })[0]
     }

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
