<template>
  <div>
    <div class="title">
      <a href="/">
        <h1>Mauro Mandracchia</h1>

        <div class="aka">
          <span>aka <span>ideabile</span></span>
        </div>

        <div class="passions">
          <span>web</span>
          <span>cloud apps</span>
          <span>mobile</span>
          <span>graphics</span>
        </div>
      </a>
    </div>
  </div>
</template>
<style scoped>
 .title{
   animation: slideLogo 1s forwards;
   margin-bottom: 10px;
 }

 h1{
   display: inline-block;
   clear: both;
   margin: 0 0 10px 0;
   background: black;
   color: white;
   padding: 10px 20px;
   z-index: 333;
   font-weight: normal;
   overflow: hidden;
 }

 #__nuxt[server-rendered] h1{
   transform: translateY(100%);
   display: none;
 }

 @keyframes slideLogo{
   0% { transform: translateY(100%); display: none; }
   1% { display: block; }
   100% { transform: translateY(0%); }
 }

 .aka span{
   padding: 0 10px;
 }

 .aka {
   display: block;
   float: right;
   font-size: 30px;
   margin-bottom: 15px;
 }

 @media(max-width: 600px){
   .aka {
     display: none;
   }
 }

 .aka > span{
   background: #fff;
   color: #000;
   border: 2px solid #000;
   padding-right: 0;
 }

 .aka > span > span{
   background: #000;
   color: #fff;
 }

 .passions {
   float: left;
   overflow: hidden;
 }

 .passions span{
   line-height: 50px;
   font-size: 30px;
   background: #000;
   color: #fff;
   margin: 0 10px 0 0;
   padding: 10px;
   display: inline-block;
   margin-bottom: 10px;
 }
</style>
