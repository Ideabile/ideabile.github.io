<template>
  <div class="experiences">
    <div v-if="experience">
      <experience :experience="experience" />
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
 import experience from './../../components/experience.vue'
 import donut from './../../components/svg/donut.vue'
 import GetApiUrl from './../../utils/GetApiUrl'

 export default{
   components : {
     experience
   },
   async asyncData ({ env, isClient, params }) {
     if(params.id === 'index') params.id = false
     let pathUrl = !params.id ? 'experiences/all' : `experiences/${params.id}`

     let { data } = await axios.get(GetApiUrl(env, isClient, pathUrl))

     return {
       experience: params.id ? data : null,
       all: !params.id ? data.experiences.reverse() : null
     }
   }
 }
</script>

<style>
 .experiences{
   padding: 0 30px;
 }
 .experiences svg{
   width: 360px;
   height: auto;
 }
 @media (max-width: 900px){
   .experiences{
     padding: 0 10px;
   }
 }
</style>
