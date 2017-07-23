<template>
  <div>
    <h1 class="page-title">Curriculum Vitae</h1>
    <div class="info">
      <div class="contacts">
        <h3>Contacts</h3>
        <p class="address">
          Esmoreitstraat, 9hs<br/>
          NL-1055BX Amsterdam
        </p>
        <p class="phone">
          (+31) 621 994 742
        </p>
        <p class="email">
          info@ideabile.com
        </p>
        <p class="urls">
          ideabile.com<br/>
          linkedin.com/in/ideabile<br/>
          github.com/M3kH<br/>
          github.com/Ideabile<br/>
        </p>
      </div>
      <div class="me">
        <img src="/me.png" alt="Me" />
      </div>
    </div>

    <div class="edu">
      <div class="left">
        <h3>Education</h3>
        <ul>
          <li>2007 - Scientific High School E. Fermi, Agrigento</li>
          <li>2007 - <strike>Attending "Informatica Umanistica" at the University of Pisa</strike></li>
        </ul>
      </div>
      <div class="right">
        <h3>Languages</h3>
        <ul>
          <li>
            Italian<br/>
            Native
          </li>
          <li>
            Spanish <br/>
            Advanced level speaking and writing
          </li>
          <li>
            English <br/>
            Professional working level speaking and writing
          </li>
        </ul>
      </div>
    </div>

    <div class="summary">
      <h3>Languages</h3>
      <ul class="cloud-tag">
        <li v-for="language in summary.programming">{{ language }}</li>
      </ul>
      <h3>Skills</h3>
      <ul class="cloud-tag">
        <li v-for="skill in summary.skills">{{ skill }}</li>
      </ul>
      <h3>Software</h3>
      <ul class="cloud-tag">
        <li v-for="software in summary.software">{{ software }}</li>
      </ul>
    </div>

    <div class="experiences">
      <div v-for="item in experiences">
        <experience :experience="item" />
        <hr/>
      </div>
    </div>

    <div class="more" v-if="!all">
      <button v-on:click="showAllExperiences">
        <span class="web-only">Load More</span>
        <span class="print-only">
          Find other {{ totalExperiences - 2 }} projects that I've worked on @ ideabile.com/cv
        </span>
      </button>
    </div>
  </div>
</template>

<style>
 h1, h2, h3{
   font-variant: small-caps;
   letter-spacing: 0.2em;
   line-height: 1em;
 }

 .edu {
   clear: both;
   overflow: hidden;
   border-bottom: 2px solid #ccc;
 }

 .edu > div {
   width: 50%;
   float: left;
 }

 .aka{
   display: none !important;
 }

 h1.page-title{
   background: #555;
   color: #fff;
   display: inline-block;
   padding: 0 10px;
   margin: 0;
   font-size: 40px;
 }

 .contacts{
   fonts-size: 8px;
   float: left;
 }
 .contacts .address{ font-style: italic; }
 .contacts p { margin-bottom: -15px; }
 .contacts h3{ margin-bottom: -10px; }

 .info {
   position: absolute;
   top: -10px;
   right: -10px;
 }

 .me { float: right; }
 .me img{
   padding: 10px;
   border: 2px dashed #ccc;
   margin: 20px;
   width: 180px;
 }

 .cloud-tag{
   margin: 0;
   padding: 0;
   text-align: center;
   padding-bottom: 20px;
   border-bottom: 2px solid #F3F3F3;
 }
 .cloud-tag li{
   display: inline-block;
   padding: 10px;
   border: 2px #ccc solid;
   margin: 10px 5px;
 }

 .summary h3{
   margin-bottom: 0;
   text-align: center;
 }

 .experiences{
   line-height: 0.9em;
   padding: 0 30px;
 }
 .experiences h1{
   font-size: 40px;
 }

 .more {
   margin: 20px;
 }

 .more button{
   font-size: 20px;
   font-family: 'VT323', monospace;
   display: block;
   padding: 10px;
   background: transparent;
   width: 100%;
   border: 2px dashed #ccc
 }

 .more button span.print-only{
   display: none;
 }

 hr{
   border: 0;
   border-bottom: 2px solid #ccc;

 }
 @media print {
   .more button {
     font-size: 10px;
   }
   .more button span.web-only{
     display: none;
   }
   .more button span.print-only{
     display: block;
   }
   body{
     /* font-family: Helvetica; */
     font-size: 12px;
   }

   .contacts {
     margin-top: 10px;
     font-size: 12px;
   }

   .me img {
     width: 100px;
   }

   h1{
     font-size: 26px;
   }
   h1.title{
     margin-bottom: -40px;
   }

   h1.page-title{
     font-size: 20px;
     margin-top: -20px;
   }

   .cloud-tag li{
     font-size: 10px;
     margin: 4px;
     padding: 4px;
   }
   .summary{
     margin-bottom: 300px;
   }
   .experiences{
     paddexperiences.lengthing: 0;
     font-size: 12px;
   }
   .experiences h1 {
     font-size: 20px;
   }
   .experiences h2{
     font-size: 16px;
   }
   .experiences svg {
     width: 200px;
     height: auto;
   }
 }
</style>
<script>
 import axios from 'axios'
 import experience from './../components/experience'
 import GetApiUrl from './../utils/GetApiUrl'

 function get (env, isClient, path) {
   return axios.get(GetApiUrl(env, isClient, path))
 }

 let allExps

 export default {

   layout: 'cv',

   components : {
     experience
   },

   async asyncData ({env, isClient}) {
     const args = [env, isClient]
     get = get.bind(this, ...args)

     let experiences = await get('experiences/all')
     let totalExperiences = experiences.data.experiences.length

     allExps = experiences.data.experiences
     experiences = allExps.reverse()
                          .filter(
                            exp => exp.attributes.company != 'me'
                          )
                          .slice(0, 3)

     let skills = await get('summary/skills')
     skills = skills.data

     let programming = await get('summary/programming-languages')
     programming = programming.data

     let software = await get('summary/software')
     software = software.data

     return {
       all: false,
       allExps,
       totalExperiences,
       experiences,
       summary: {
         skills,
         programming,
         software
       }
     }

   },

   methods: {
     async request (env, isClient, path) {
       return await axios.get(env, isClient, path).data
     },
     async showAllExperiences () {
       this.experiences = this.allExps
       this.all = true
     }
   }
 }
</script>

