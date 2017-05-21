export default function (context) {
  if(context.isServer && context.res){
    context.res.setHeader("Access-Control-Allow-Origin", "*");
    context.res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  }
}
