<template>
  <div class="page">
    <header>
      <_menu/>
    </header>
    <content>
      <div>
        <nuxt/>
      </div>
    </content>
    <footer class="transparent">
      <logo />
    </footer>
  </div>
</template>

<script>
 import _menu from './../components/menu.vue'
 import logo from '../components/logo.vue'

 export default {
   components: {
     _menu,
     logo
   }
 }
</script>
