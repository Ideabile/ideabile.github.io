<template>
  <svg :viewBox="getViewBox()" preserveAspectRatio="xMinYMid slice">
    <g v-if="web" stroke="#000" fill="none">
      <g v-for="item, lum in items">
        <path :stroke-width="lum" stroke-linecap="round" :d="getPathData(item)" />
      </g>
    </g>
    <g v-else stroke="none" fill="#000">
      <g v-for="item, lum in items">
        <circle v-for="circle in item" :cx="circle.x * 3" :cy="circle.y * 3" :r="lum * 1.2" />
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
 import Jimp from 'jimp'

 function getResizedSizes(w, h, max){
   let greater = w >= h ? w : h
   let scale = max / greater
   if (greater > max) return {
     height: h * scale,
     width: w * scale
   }

   return {
     height: h,
     width: w
   }
 }
 export default {

   props: ['url'],

   data(){
     return {
       width: 0,
       height: 0,
       web: true,
       items: []
     }
   },

   asyncData(context){
     if(context.isServer){
       this.getImg().then( (data) => {
        this.img = data.img
        resolve({
          width: data.img.bitmap.width || 0,
          height: data.img.bitmap.height || 0,
          items: this.getBrightnessData(this.img),
          web: true
        })
      })
     }
   },

   methods: {

     getImg(){
       return new Promise( (resolve, rej) => {
         Jimp.read(this.url, (err, img) => {
           console.log(err)
           resolve({
             img: img
           })
         })
       }).then(data => {
         return data
       }).catch(err => {
         return err
       })
     },

     getViewBox(){
       if(!this.img) return `-0.5 -0.5 0 0`
       return `-0.5 -0.5 ${this.img.bitmap.width} ${this.img.bitmap.height}`
     },

     setWindowSizes(w){
       if(this.width === w.innerWidth || this.height === w.innerHeight) return false;
       this.width = w.innerWidth
       this.height = w.innerHeight
     },

     getPathData(item){
       let path = [];

       for(let k in item){
         path.push(`M${item[k].x} ${item[k].y}z`)
       }
       return path.join('')
     },

     getRgba(data, i){
       return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] }
     },

     getLuminosity(rgba){
       return (( rgba.a - (rgba.r + rgba.g + rgba.b) / 3) / 200).toFixed(2)
     },

     isInvisible(rgba){ // Or white
       return (!rgba.a > 0 || (rgba.r === 255 && rgba.g === 255 && rgba.b === 255))
     },

     useScanMethod(img){
       let lums = {}
       img.scan(0, 0, img.bitmap.width, img.bitmap.height, (x, y, i) => {
         let rgba = this.getRgba(img.bitmap.data, i)
         if ( this.isInvisible(rgba) ) return
         let lum = this.getLuminosity(rgba);
         if(lum < 0.2) lum = 0.2;
         lums[lum] = lums[lum] || []
         lums[lum].push({ x, y });
       })
       return lums
     },

     getBrightnessData(img) {
       if(img.scan) return this.useScanMethod(img)

       let lums = {};
       let data = img.bitmap.data.data

       for(let i = 0; i<data.length; i+=4){

         let rgba = this.getRgba(data, i)

         if ( this.isInvisible(rgba) ) continue

         let lum = this.getLuminosity(rgba);
         let x = (i / 4) % img.bitmap.width
         let y = Math.floor((i / 4) / img.bitmap.width)

         lums[lum] = lums[lum] || []
         lums[lum].push({ x, y })

       }

       return lums
     }
   }
 }
</script>
