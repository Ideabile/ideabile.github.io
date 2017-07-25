<template>
  <div class="experience">
    <h1 v-html="experience.attributes.title"></h1>
    <ul class="details">
      <li v-if="company"><span class="label">Company:</span> {{company}}</li>
      <li v-if="date"><span class="label">When:</span> {{date}}</li>
    </ul>
    <div class="graph">
      <donut v-for="data,category in donutsData" :innerLabel="category" :items="data" class="donut"/>
    </div>
    <div class="experience__body" v-html="experience.body"></div>
  </div>
</template>

<style scoped>
 .experience {
   position: relative;
 }
 .experience__body ul li{
   margin: -10px;
 }
 .details {
   margin: 10px 0 0 -40px;
 }
 .details li{
   margin: 0 10px 0 0;
   padding: 10px;
   display: inline-block;
   border: 2px solid #000;
 }
 .details .label{
   padding: 2px;
   margin: -10px -10px 10px -10px;
   display: block;
   background: #000;
   color: #fff;
 }
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
       let date = !this.experience.attributes.date ?
                    this.experience.attributes.year : this.experience.attributes.date

       if ( date.indexOf && date.indexOf(' - ') > -1 ){
         let D = date.split(' - ').map(d => {
           return d.split('-').slice(0, 2).join('-')
         })
         date = `${D[0]} - ${D[1]}`
       }

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
