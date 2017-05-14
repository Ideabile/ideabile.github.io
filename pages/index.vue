<template>
  <div>
    <div class="halftone">
      <halftone :img="img"></halftone>
    </div>
  </div>
</template>
<style scoped>
 .halftone svg{
   position: fixed;
   top: 0;
   left: 0;
   overflow: visible;
   z-index: -1;
 }
 a{
   color: #fff;
 }
 .details{
   font-size: 20px;
   position: absolute;
   top: 10px;
   right: 10px;
   background: #000;
   color: #fff;
   padding: 10px;
 }
</style>
<script>
 import Jimp from 'jimp'
 import halftone from '../components/halftone'
 export default {
   layout: 'landing',
   asyncData({res}){
     if(res) res.setHeader('Access-Control-Allow-Origin', '*')
     return new Promise( (resolve, rej) => {
       Jimp.read('http://avatars1.githubusercontent.com/u/651290?v=3&s=40', (err, img) => {
         resolve({
           img: img
         })
       })
     }).then(data => {
       return data
     }).catch(err => {
       return {}
     })
   },
   components: {
     halftone
   }
 }
</script>
