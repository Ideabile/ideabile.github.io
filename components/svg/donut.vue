<template>
  <div>
    <svg :width="widthSvg" :height="heightSvg" :viewbox="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :transform="mainTransform">
        <g v-for="path in paths.shapes">
          <path :d="path" :fill="getRandomColor()" />
        </g>
        <g v-for="path in paths.labels">
          <foreignObject :x="getCentroidLabel(path.centroid.x)" :y="path.centroid.y" :width="labelWidth">
            <p class="line__label" :style="lineLabel(path.centroid)">{{ path.label }}</p>
          </foreignObject>
          <path :d="path.line" fill="transparent" stroke="black" />
        </g>
        <foreignObject x="0" y="0" :width="width" :height="height">
          <p class="donut__label" :style="`width: ${width}px; height: ${height}px;`">{{ innerLabel }}</p>
        </foreignObject>
      </g>
    </svg>
  </div>
</template>
<style scoped>
 .donut__label{
   text-align: center;
   font-size: 24px;
   display: table-cell;
   vertical-align: middle;
 }
 .line__label {
   line-height: 1em;
   vertical-align: bottom;
   padding: 0;
   margin: 0;
 }
 @media print{
   .donut__label {
     font-size: 20px;
   }
 }
</style>
<script>
 const colors = [
  "#4BB488",
  "#EC6086",
  "#2E4999",
  "#79BF84",
  "#EFE409",
  "#53BFD2",
  "#3B4294",
  "#ED6E61",
  "#F9EB97",
  "#8ECCBA",
  "#ACC90E",
  "#6256A1",
  "#8D4393",
  "#F5C364",
  "#B3D38D",
  "#9796C9",
  "#50B264",
  "#D54B35",
  "#C78E44",
  "#88C064",
  "#ABB5DD",
  "#F08281",
  "#574B99"
 ].reverse()
 let currentColor = 0
 export default {
   props: {
     outerRadius: { default: 80 },
     innerRadius: { default: 60 },
     marginWidth: { default: 120 },
     marginHeight: { default: 20 },
     labelWidth: { default: 100 },
     labelFontSize: { default: 14},
     innerLabel: { default: 'Programming' },
     items: { default: () => {
       return [
         {label: '', value: 20},
         {label: '', value: 40},
         {label: '', value: 50},
       ]
     } }
   },
   data () {
     const size = this.outerRadius * 2
     return {
       total: this.items.reduce((p, c) => p + c.value, 0),
       widthSvg: size + this.marginWidth * 2,
       heightSvg: size + this.marginHeight * 2,
       width: size,
       height: size
     }
   },
   computed: {
     viewBox () {
       return `0 0 ${this.widthSvg} ${this.heightSvg}`
     },

     mainTransform () {
       return `translate(${this.widthSvg / 2 - this.outerRadius}, ${this.heightSvg / 2 - this.outerRadius})`
     },

     paths () {
       let startAngle = 0
       const paths = {
         shapes: [],
         labels: []
       }
       this.items.forEach((item) => {
         const sectorAngle = this.items.length === 1 ?  Math.PI * 1.99 : this.scale(item.value)
         const args = [
           startAngle,
           startAngle + sectorAngle,
           this.outerRadius,
           this.innerRadius
         ]
         const arc = this.arc(...args)
         const centroid = this.centroid(...args)
         const line = this.line(centroid, this.outerRadius)
         paths.shapes.push(arc)
         paths.labels.push({ line, centroid, label: item.label })
         startAngle += sectorAngle
       })
       return paths
     }
   },
   methods: {
     lineLabel (centroid) {
       return [
         `text-align: ${centroid.x < this.outerRadius ? 'left' : 'right'};`,
         `font-size: ${this.labelFontSize}px;`,
         `width: ${this.labelWidth}px;`
         ].join('')
     },

     getRandomColor () {
       const color = colors[currentColor]
       currentColor = currentColor === colors.length - 1 ? 0 : currentColor + 1
       return color
     },

     scale (value) {
       return value * Math.PI * 2 / this.total
     },

     getCentroidLabel (x) {
       const M = this.labelFontSize + this.labelWidth
       return x < this.outerRadius ?
              x - M :
              x + this.labelFontSize
     },

     centroid (startAngle, endAngle, outerRadius, innerRadius = 0) {
       const radius = (outerRadius + innerRadius) / 2
       const angle = ((startAngle + endAngle) - Math.PI) / 2
       return {
         x: Math.cos(angle) * radius + outerRadius,
         y: Math.sin(angle) * radius + outerRadius
       }
     },

     line (Center, outerRadius) {
       const M = this.labelFontSize
       if(Center.x < outerRadius){
        return `M${Center.x},${Center.y} L${Center.x - M},${Center.y + M} L${Center.x - this.labelWidth - M},${Center.y + M}`
       }

       return `M${Center.x},${Center.y} L${Center.x + M},${Center.y + M} L${Center.x + this.labelWidth + M},${Center.y + M}`
     },

     arc (startAngle, endAngle, outerRadius, innerRadius = 0) {
       const sinAlpha = Math.sin(startAngle);
       const cosAlpha = Math.cos(startAngle);
       const sinBeta = Math.sin(endAngle);
       const cosBeta = Math.cos(endAngle);

       const largeArc = endAngle - startAngle > Math.PI;

       const P = {
         x: outerRadius + (outerRadius * sinAlpha),
         y: outerRadius - (outerRadius * cosAlpha)
       };

       const Q = {
         x: outerRadius + (outerRadius * sinBeta),
         y: outerRadius - (outerRadius * cosBeta)
       };

       const R = {
         x: outerRadius + (innerRadius * sinBeta),
         y: outerRadius - (innerRadius * cosBeta)
       };

       const S = {
         x: outerRadius + (innerRadius * sinAlpha),
         y: outerRadius - (innerRadius* cosAlpha)
       }

       return `M${P.x},${P.y} A${outerRadius},${outerRadius} 0 ${largeArc ? '1,1' : '0,1'} ${Q.x},${Q.y} L${R.x},${R.y} A${innerRadius},${innerRadius} 0 ${largeArc ? '1,0' : '0,0'} ${S.x},${S.y} Z`;
     }
   }
 }
</script>
