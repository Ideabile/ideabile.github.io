<template>
  <svg :viewBox="getViewBox(items, columns)" preserveAspectRatio="xMinYMid slice">
    <g stroke="#000" fill="none">
      <g v-for="item, lum in lums">
        <path :stroke-width="lum" stroke-linecap="round" :d="getPathData(item)" />
        <text v-for="label in item" font-size="18" text-anchor="middle" width="80" :x="label.x" :y="(label.y * 1.2 + 65) " fill="black">{{ getItemLabel().name }}</text>
      </g>
    </g>
  </svg>
</template>
<style scoped>
 svg{
   width: 100%;
   height: 100%;
   transition: all 1s forward;
 }
</style>

<script>
 export default {

   props: {
     items: {
       default: []
     }
   },

   data(){
     return {
       width: 0,
       height: 0,
       columns: 5,
       lums: this.getItems(this.items, 5),
       web: true
     }
   },

   methods: {

     getItemLabel() {
       this.currentItem = this.currentItem || 0
       let item = this.items[this.currentItem]
       this.currentItem++
       if (this.currentItem === this.items.length) {
         this.currentItem = 0
       }
       return item
     },

     getViewBox( data, columns ) {
       let totalRows = Math.ceil(data.length / columns);
       return `-0.5 -0.5 800 ${totalRows * 100 + 200}`
     },

     getItems(data, columns) {
       let lums = {}
       let row = 0

       // Flat the Hours and get the max
       let allHours = data.map(i => i.hours || 0 )
       let max = Math.max(...allHours)

       for(let i = 0; i<data.length; i++){
         let size = data[i].hours / max * 80 + 10
         let step = i % columns;
         if(step === 0){
           row = row + 100
         }
         let x = ((i % columns) + 1) * 150  - 50
         let y = row

         lums[size] = lums[size] || []
         lums[size].push({ x, y })
       }

       return lums
     },

     getPathData(item){
       let path = [];

       for(let k in item){
         path.push(`M${item[k].x} ${item[k].y * 1.2}z`)
       }
       return path.join(' ')
     }
   }
 }
</script>
