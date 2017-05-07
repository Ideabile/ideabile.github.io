<template>
  <div class="menu">
    <nuxt-link to="/blog">Thoughts</nuxt-link>
    <nuxt-link to="/experience">Experiences</nuxt-link>
    <nuxt-link to="/me">Me</nuxt-link>
  </div>
</template>
<script>
 export default {
   data(context){
     if(context && context.isClient){
       return {
         path: this.getPath()
       }
     }

     return {
       path: ''
     }
   },
   methods: {
     getPath(){
       return window.location.path.split('/').slice(1)
     }
   }
 }
</script>
<style>
 .menu {
   overflow: hidden;
 }
 .menu a {
   display: table;
   background: #000;
   padding: 10px;
   margin: 10px;
   font-size: 40px;
   color: #fff;
   border: 4px solid #000;
   animation: slide 1s forwards;
   transition: all 0.15s ease-in;
 }

 @keyframe slide{
   0%{ transfor: translateX(-100%); }
   1000%{ transfor: translateX(0); }
 }

 .menu a:hover{
   color: #000;
   border-color: #000;
   background: #fff;
   margin-left: 20px;
 }
</style>
