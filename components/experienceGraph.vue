<template>
  <svg :viewBox="getViewBox" preserveAspectRatio="xMinYMid slice">
    <g stroke="#000" fill="none">
      <g v-for="item in svgElements">
        <circle :cx="item.el.x" :cy="item.el.y" :r="item.el.size" fill="black"/>
        <foreignObject :x="item.el.x - 40" :y="item.el.y + 50" width="80" height="80">
          <p :xmlns="doct" style="text-align: center; font-size: 18px">{{ item.name }}</p>
        </foreignObject>
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
       doct: 'http://www.w3.org/1999/xhtml',
       width: 0,
       height: 0,
       columns: 5
     }
   },

   computed: {
     svgElements() {
       let items = this.items
       let columns = this.columns
       let max = this.getMaxHours(items)

       let row = 0

       for(let k in items){
         let item = items[k]
         let column = k % columns

         if(column === 0) row++
         item.el = this.getCircle(max, item.hours, column, row)
         items[k] = item
       }

       return items
     },

     getViewBox() {
       let totalRows = Math.ceil(this.items.length / this.columns);
       return `-0.5 -0.5 800 ${totalRows * 160 + 60}`
     }

   },

   methods: {
     getMaxHours(data) {
       return Math.max(...data.map(i => i.hours || 0))
     },
     getCircle(max, hours, column, row){
         let size = hours / max * 50 + 10
         let x = (column + 1) * 150 - 50
         let y = row * 160 - 60
         return {x, y, size}
     }
   }
 }
</script>
