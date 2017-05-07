<template>
  <svg :viewBox="getViewBox(items, columns)" preserveAspectRatio="xMinYMid slice">
    <g stroke="#000" fill="none">
      <g v-for="item, lum in getItems(items, columns)">
        <path :stroke-width="lum" stroke-linecap="round" :d="getPathData(item)" />
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
       web: true
     }
   },

   methods: {

     getViewBox( data, columns ){
       let totalRows = Math.ceil(data.length / columns);
       return `-0.5 -0.5 800 ${totalRows * 100 + 100}`
     },

     getItems(data, columns) {
       let lums = {}
       let row = 0
       let allHours = data.map(i => i.hours || 0 )
       let max = Math.max(...allHours)

       for(let i = 0; i<data.length; i++){
         let size = data[i].hours / max * 100
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
         path.push(`M${item[k].x} ${item[k].y}z`)
       }
       return path.join('')
     }
   }
 }
</script>
