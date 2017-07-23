<template>
  <div>
    <h1 v-html="experience.attributes.title"></h1>
    <ul>
      <li v-if="company">Company: {{company}}</li>
      <li v-if="date">From: {{date}}</li>
    </ul>
    <div class="graph">
      <donut v-for="data,category in donutsData" :innerLabel="category" :items="data" class="donut"/>
    </div>
    <div v-html="experience.body"></div>
  </div>
</template>

<style scoped>
 .graph{
   clear: both;
   overflow: hidden;
   text-align: center;
   margin: 20px 0 auto;
 }
 .donut{
   margin: 10px auto;
   display: inline-block;
 }
</style>

<script>
 import donut from './svg/donut.vue'
 export default {
   components: {
     donut
   },
   props: {
     experience: { default: () => {
       return {}
     } }
   },
   computed: {
     company () {
       const company = this.experience.attributes.company
       return company != 'me' ? company : null
     },
     date () {
       const date = !this.experience.attributes.date ?
                    this.experience.attributes.year : this.experience.attributes.date
       return date
     },
     donutsData () {
       if(!this.experience || !this.experience.attributes.details) return null
       let donutsData = {}
       this.experience.attributes.details.forEach(detail => {
         const C = detail.category ? detail.category.replace('_', ' ') : ''
         donutsData[C] = donutsData[C] || []
         donutsData[C].push({value: detail.hours, label: detail.name})
       })
       return donutsData
     }
   }
 }
</script>
