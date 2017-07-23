<template>
  <div class="cv">
    <logo />
    <div>
      <nuxt/>
    </div>
  </div>
</template>
<style>
 .cv{
   font-size: 20px;
 }
</style>
<script>
 import logo from '../components/logo.vue'

 export default {
   components: {
     logo
   }
 }
</script>
