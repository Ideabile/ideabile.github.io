webpackJsonp([3],{123:function(a,e,t){var n=t(23)(t(370),t(586),null,null);a.exports=n.exports},214:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(a){return a&&a.isClient?{path:this.getPath()}:{path:""}},methods:{getPath:function(){return window.location.path.split("/").slice(1)}}}},218:function(a,e,t){e=a.exports=t(61)(void 0),e.push([a.i,".menu{overflow:hidden}.menu a{display:table;background:#000;padding:10px;margin:10px;font-size:40px;color:#fff;border:4px solid #000;animation:slide 1s forwards;transition:all .15s ease-in}@keyframe slide{0%{transfor:translateX(-100%)}1000%{transfor:translateX(0)}}.menu a:hover{color:#000;border-color:#000;background:#fff;margin-left:20px}",""])},219:function(a,e,t){e=a.exports=t(61)(void 0),e.push([a.i,".title[data-v-4e787fbe]{animation:slideLogo 1s forwards;margin-bottom:10px}h1[data-v-4e787fbe]{display:inline-block;clear:both;margin:0 0 10px;background:#000;color:#fff;padding:10px 20px;z-index:333;font-weight:400;overflow:hidden}#__nuxt[server-rendered] h1[data-v-4e787fbe]{-ms-transform:translateY(100%);transform:translateY(100%);display:none}@keyframes slideLogo{0%{transform:translateY(100%);display:none}1%{display:block}to{transform:translateY(0)}}.aka span[data-v-4e787fbe]{padding:0 10px}.aka[data-v-4e787fbe]{display:block;float:right;font-size:30px;margin-bottom:15px}@media(max-width:600px){.aka[data-v-4e787fbe]{display:none}}.aka>span[data-v-4e787fbe]{background:#fff;color:#000;border:2px solid #000;padding-right:0}.aka>span>span[data-v-4e787fbe]{background:#000;color:#fff}.passions[data-v-4e787fbe]{overflow:hidden}.passions span[data-v-4e787fbe]{line-height:50px;font-size:30px;background:#000;color:#fff;margin:0 10px 0 0;padding:10px;display:inline-block;margin-bottom:10px}",""])},234:function(a,e,t){t(239);var n=t(23)(null,t(237),"data-v-4e787fbe",null);a.exports=n.exports},235:function(a,e,t){t(238);var n=t(23)(t(214),t(236),null,null);a.exports=n.exports},236:function(a,e){a.exports={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"menu"},[t("nuxt-link",{attrs:{to:"/blog"}},[a._v("Thoughts")]),t("nuxt-link",{attrs:{to:"/experience"}},[a._v("Experiences")]),t("nuxt-link",{attrs:{to:"/me"}},[a._v("Me")])],1)},staticRenderFns:[]}},237:function(a,e){a.exports={render:function(){var a=this,e=a.$createElement;a._self._c;return a._m(0)},staticRenderFns:[function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("div",{staticClass:"title"},[t("a",{attrs:{href:"/"}},[t("h1",[a._v("Mauro Mandracchia")]),t("div",{staticClass:"aka"},[t("span",[a._v("aka "),t("span",[a._v("ideabile")])])]),t("div",{staticClass:"passions"},[t("span",[a._v("web")]),t("span",[a._v("cloud apps")]),t("span",[a._v("mobile")]),t("span",[a._v("graphics")])])])])])}]}},238:function(a,e,t){var n=t(218);"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);t(62)("5cc73c51",n,!0)},239:function(a,e,t){var n=t(219);"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);t(62)("725795b1",n,!0)},370:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t(235),o=t.n(n),s=t(234),r=t.n(s);e.default={components:{_menu:o.a,logo:r.a}}},586:function(a,e){a.exports={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"page"},[t("header",[t("_menu")],1),t("content",[t("div",[t("nuxt")],1)]),t("footer",{staticClass:"transparent"},[t("logo")],1)])},staticRenderFns:[]}}});