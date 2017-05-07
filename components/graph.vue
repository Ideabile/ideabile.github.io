<template>
  <svg :width="width" :height="height">
    <g v-for="column in columnsY">
      <text :x="column.x" :y="column.y" :font-family="axis.font" :font-size="axis.size" v-html="column.value"></text>
    </g>
    <g v-for="item in items">
      <circle :r="item.r" :cx="item.x" :cy="item.y" />
    </g>
  </svg>
</template>
<script>
 export default {
   data: ({ res }) => {
     return {
       width: 200,
       height: 200,
       axis: {
         font: 'Helvetica',
         size: '20',
         x: {
           title: 'Years',
           key: 'date'
         },
         y: {
           title: 'Skill',
           key: 'skills'
         }
       },
       items: [
         { skills: [ 'programming' ], languages: [ 'html' ], date: '10/01/1988 - 10/01/2011' }
       ]
     }
   },
   methods: {
     getLabelsColumns: function(axis){
       let res = []
       let key = this.axis[axis].key
       this.items.forEach((item, index) => {
         res.filter( uniqueValue => uniqueValue.trim().toLowerCase() !== item[key].trim().toLowerCase())
         res.push({value: 20, x: 100 * index, y: 100});
       })
     }
   },
   computed: {
     columnsX: function(){
       return this.getLabelsColumns('x');
     },
     columnsY: function(){
       return this.getLabelsColumns('y');
   }
 },
   mounted: function () {
     this.width = window.innerWidth
     this.height = window.innerHeight
   }
 }
</script>
