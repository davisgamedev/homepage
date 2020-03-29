/*!
      
LICENSES AND ATTRIBUTION:

=========================================================
* Newspaper Design Modified from: 
* Silke V - Newspaper Style Design
* https://codepen.io/silkine/pen/jldif
=========================================================


=========================================================
* Now UI Kit PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
=========================================================


      */
(this["webpackJsonpmaterial-kit-react"]=this["webpackJsonpmaterial-kit-react"]||[]).push([[0],{100:function(e,t,a){},111:function(e,t,a){},112:function(e,t,a){},113:function(e,t,a){"use strict";a.r(t);a(88);var n=a(0),r=a.n(n),i=a(12),l=a.n(i),o=a(20),c=a(30),u=(a(93),a(22)),s=a(163),m=a(160);function d(){return r.a.createElement(s.a,{open:!1,autoHideDuration:1e6,anchorOrigin:{vertical:"top",horizontal:"center"}},r.a.createElement(m.a,{severity:"warning"},"Debug logging is enabled!!"))}window.addEventListener("keydown",(function(e){e.key}),!1);var h=!0;function f(){var e=document.getElementById("header");if(e){var t=e.offsetHeight;return 145!==t&&h&&(h=!1,setTimeout((function(){"%c Please update HeaderHeight.knownHeight to: %c".concat(t,"%c to prevent a scroll jitter on load;"),h=!0}),500)),t}return 145}function p(){var e=Object(n.useState)(f()),t=Object(u.a)(e,2),a=t[0],r=t[1];return Object(n.useEffect)((function(){function e(){r(f())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a}function v(){b(!0),function(){window.SuppressScrollTimeout&&clearTimeout(window.SuppressScrollTimeout);window.SuppressScrollTimeout=setTimeout((function(){return b(!1)}),500)}()}function E(){return window.SuppressRouteChangeHandler}function b(e){window.SuppressRouteChangeHandler=e}window.SuppressRouteChangeHandler=window.SuppressRouteChangeHandler||!1;var g=function(){};function j(e,t){return e<t.bottom&&e>t.top}window.addEventListener("scroll",(function(){return g()}));var O,w={},y=[],C=!1,k={id:null};setTimeout((function e(){Array.from(document.getElementsByClassName("section")).forEach((function(e,t){w[e.id]={index:t,id:e.id,top:e.offsetTop,bottom:e.offsetTop+e.offsetHeight},y.push(e.id)})),k=w[k.id||y[0]],C=!0,window.addEventListener("resize",e)}),500);var x=Object(c.f)((function(e){var t,a,n,i,l=e.location,o=e.history,c=!1,u=0,s=void 0,m=p();function d(){return a?a.offsetTop:0}function h(){var e=l.pathname.split("/").filter((function(e){return e}));if(k=C?w[y[0]]:{id:""},e){e.length>1&&(s=e[e.length-1]);var t=document.getElementById(e[0]);t&&"section"===t.className?k=C?w[e[0]]:{id:e[0]}:s=e[0]}}function f(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];if(c){c=!1;var t=d();"%cDone autoscrolling!\n            Currentposition: ".concat(window.scrollY,"\n            Desiredposition: ").concat(i,"\n            Knownheight: ").concat(n,"\n            Recalculatedheight: ").concat(t,"\n            ")}else if(e&&C){var a=window.scrollY-m+3*window.innerHeight/4;j(a,k)||y.forEach((function(e){j(a,w[e])&&(v(),k=w[e],o.push("/"+k.id))}))}if(s){var r=document.getElementById(s);if(r){var l=r.getElementsByTagName("button")[0];l.focus(),l.click()}s=null}}function b(){a=document.getElementById(k.id),n=d(),i=n-m,setTimeout((function(){"%cScrolling to ".concat(i,", which is ").concat(i-window.scrollY," lower."),window.scrollTo({behavior:"smooth",top:i})}),100)}function x(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];O=k.id,h(),E()||(f(!1),(c=e||O!==k.id)&&b())}return g=function(){c&&Math.abs(n-d())>5&&x(!0),t&&clearTimeout(t),t=setTimeout(f,200),c||(window.scrollY<u,u=window.scrollY)},r.a.useEffect(x,[l]),r.a.createElement("span",{id:"RouteUpdateHandler"})})),P=a(6),S=a(7),T=a(8),R=a(9),N=a(156),B=(a(98),a(27)),A=a(154),D=(a(99),a(164)),I=a(153),G=a(78),q=[{route:"/",name:"Headlines"},{route:"/audio",name:"Audio Projects"},{route:"/games",name:"Game Projects"},{route:"/web",name:"Web Projects"},{route:"/graphics",name:"Graphics Projects"},{route:"/contact",name:"Write to the Editor"}];var z=Object(c.f)((function(e){function t(e){return"Page ".concat(e+1," \u2014 ").concat(q[e].name)}var a=r.a.useState(t(0)),n=Object(u.a)(a,2),i=n[0],l=n[1];r.a.useEffect((function(){var a=q.findIndex((function(t){return t.route===e.location.pathname}));l(t(a<0?0:a))}));var o,c,s=q.map((function(t,a){return r.a.createElement(D.a,{className:"dropdown-link",onClick:function(){j(),e.history.push(t.route)},key:"".concat(a+1,": ").concat(t.name)},r.a.createElement(B.a,{to:t.route},t.name))})),m=r.a.useState(null),d=Object(u.a)(m,2),h=d[0],f=d[1],p=!1;function v(e,t){return e.clientX<t.x||e.clientX>t.w||e.clientY<t.y||e.clientY>t.h}function E(e){e.w=e.right+e.x,e.h=e.bottom+e.y,e.y-=10}var b=function(e){if(!p){var t=document.getElementById("dropdown-menu").getElementsByTagName("div")[2];o=t.getBoundingClientRect(),c=document.getElementById("dropdown-btn").getBoundingClientRect(),E(o),E(c),p=!0}v(e,c)&&v(e,o)&&j()},g=function(e){f(e.currentTarget),window.addEventListener("mousemove",b)},j=function(){f(null),window.removeEventListener("mousemove",b),p=!1};return r.a.createElement("div",{className:"dropdown"},r.a.createElement(I.a,{id:"dropdown-btn",className:"dropbtn hoverable",onMouseEnter:g,onClick:g},i,r.a.createElement(A.a,{className:"fa fa-caret-down"})),r.a.createElement(G.a,{id:"dropdown-menu",className:"dropdown-content",anchorEl:h,open:Boolean(h),onClose:j,style:{padding:0}},s))})),W=a(77),H=a(155),M={xs:500,sm:825,md:975,lg:1400,xl:1520},L=Object(W.a)({breakpoints:{values:M}});function F(){var e=window.innerWidth;return{small:e<=M.sm,extraSmall:e<=M.xs}}function J(){var e=r.a.useState(F()),t=Object(u.a)(e,2),a=t[0],n=t[1];return r.a.useEffect((function(){function e(){n(F())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),a}function Y(e){return r.a.createElement(H.a,{theme:L},e.children)}function V(){var e=J().small;return r.a.createElement(U,null,e?r.a.createElement(Q,null):r.a.createElement(X,null))}var U=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){var n;return Object(P.a)(this,a),(n=t.call(this,e)).props=e,n}return Object(S.a)(a,[{key:"dispatchResizeOnMount",value:function(){var e=window.document.createEvent("UIEvents");e.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(e)}},{key:"componentDidMount",value:function(){setTimeout(this.dispatchResizeOnMount,100)}},{key:"render",value:function(){return r.a.createElement("span",null,this.props.children)}}]),a}(r.a.Component);function X(){return r.a.createElement("div",{className:"headerContainer",id:"header"},r.a.createElement("div",{className:"headerWrapper"},r.a.createElement(B.a,{to:""},r.a.createElement("div",{id:"mainTitle",className:"title"},"The Davis Report")),r.a.createElement(N.a,{container:!0,className:"subtitle"},r.a.createElement(N.a,{item:!0,xs:4,className:"navbar"},r.a.createElement(z,null)),r.a.createElement(N.a,{item:!0,xs:4},r.a.createElement(_,null)),r.a.createElement(N.a,{item:!0,xs:4,style:{textAlign:"right"}},r.a.createElement("div",{className:"price-block"},r.a.createElement("p",null,r.a.createElement("b",null,"5\xa2 \xa0"),"| Rochester, NY",r.a.createElement("br",null),"ISSUED: 03-28-2020"))))))}function Q(e){var t=J().extraSmall;return r.a.createElement("div",{className:"headerContainer",id:"header"},r.a.createElement("div",{className:"headerWrapper "+(t?"extraSmall":"small")},r.a.createElement(B.a,{to:""},r.a.createElement("div",{className:"title",id:"mainTitle"},"The Davis Report")),r.a.createElement("div",{className:"subtitle"},r.a.createElement("div",{className:"navbar"},r.a.createElement(z,null)))))}function _(){var e=new Date;return r.a.createElement("div",{className:"date"},e.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}))}var K=a(157),Z=Object(K.a)({sectionTitle:{textAlign:"left",flexGrow:1,fontFamily:"Playfair Display, serif",fontWeight:"400",textTransform:"uppercase",fontSize:"36px",marginBottom:20,borderBottom:"1px solid black"},smallTitle:{textAlign:"right",flexGrow:1,fontFamily:"Roboto, serif",fontWeight:"100",textTransform:"capitalize",fontSize:"20px",margin:20,borderBottom:"1px solid grey"},grid:{flexGrow:1,flexDirection:"row"}}),$=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={id:e.props.id},e}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:this.props.id,className:"section"},r.a.createElement(ee,this.props))}}]),a}(r.a.Component);function ee(e){var t=e.title,a=Z(),n=J().small;return r.a.createElement("div",null,r.a.createElement("h2",{className:n?a.smallTitle:a.sectionTitle},t),r.a.createElement(N.a,{container:!0,spacing:3,className:a.grid+" sectionRow",direction:"row",justify:"flex-start",alignItems:"stretch",wrap:"wrap"},e.children))}var te=a(146),ae=a(162),ne=a(148),re=a(149),ie=a(159),le=(a(100),a(158)),oe=r.a.forwardRef((function(e,t){return r.a.createElement(te.a,Object.assign({ref:t},e,{id:"grow"}))})),ce=function(){return r.a.createElement("div",{className:"skelContainer"},new Array(9).fill(null).map((function(e,t){return r.a.createElement(le.a,{key:t,className:"skel",variant:"text",animation:"wave"})})))},ue=function(){return r.a.createElement("p",null,"It seems the full documentation has not been migrated yet. Please check again soon!")},se=Object(c.f)((function(e){var t=r.a.useState(!1),a=Object(u.a)(t,2),n=a[0],i=a[1],l=J().extraSmall,o=e.sectionId?"/"+e.sectionId:null,c=e.parentId?"/"+e.parentId:null,s=o+c;function m(){i(!1),v(),e.history.push(o)}return r.a.createElement(I.a,{className:"container collapsed "+(l?"extraSmall":""),onClick:function(){n||(i(!0),v(),e.history.push(s))}},r.a.createElement("div",{className:"innerContainer"},e.children,e.empty?r.a.createElement(ce,null):null),r.a.createElement(ae.a,{className:"container expanded "+(l?"extraSmall":""),onClose:m,open:n,maxWidth:"md",fullWidth:!0,scroll:"body",transitionDuration:{enter:500,exit:250},TransitionComponent:oe},r.a.createElement(ne.a,{onClickAway:m},r.a.createElement(re.a,{className:"paperContainer",elevation:3,variant:l?"outlined":"elevation"},e.children,e.todo?r.a.createElement(ue,null):null,r.a.createElement("p",{className:"footer"},"If you would like to request more information on this project, please feel free to ",r.a.createElement(B.a,{className:"generalLink",onClick:function(){i(!1),setTimeout((function(){e.history.push("/contact")}),100)},to:"/contact"},"contact me!"))))))})),me={sm:4,md:3,lg:2,className:"column"},de={sm:8,md:5,lg:4,className:"column double"},he={sm:12,md:7,lg:8,className:"column triple"};function fe(e){var t,a=J().extraSmall,n=me;return e.double&&(n=de),e.triple&&(n=he),e.id&&e.getParentComp().current&&(t=e.getParentComp().current.props.id),r.a.createElement(N.a,Object.assign({item:!0,className:"column",xs:a?12:6},n,{id:e.id}),r.a.Children.map(e.children,(function(a){return r.a.createElement(se,{parentId:e.id,sectionId:t,empty:e.todo},a)})),r.a.createElement(ie.a,null))}r.a.Component;var pe=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"directx-middleware-engine"},"DirectX Middleware Engine"),r.a.createElement("h2",{id:"flashbang-api"},"FlashBang API"))}}]),a}(r.a.Component),ve=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"return-to-otter-space"},"Return to Otter Space"),r.a.createElement("h2",{id:"junior-animation-and-interactive-experience"},"Junior Animation and Interactive Experience"),r.a.createElement("p",null,r.a.createElement("img",{src:"https://res.cloudinary.com/dyzmnhqpr/image/upload/v1585425860/otterspace-ship_httiiq.png",alt:"test image"})))}}]),a}(r.a.Component),Ee=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"procedural-planets---processing"},"Procedural Planets - Processing"),r.a.createElement("h2",{id:"an-exploration-in-procedural-generation"},"an exploration in Procedural Generation"))}}]),a}(r.a.Component),be=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"envative-estimator"},"Envative Estimator"),r.a.createElement("h2",{id:"estimating-project-budgets-for-customers"},"estimating project budgets for customers"))}}]),a}(r.a.Component),ge=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"gaurdian-alarm-web-app"},"Gaurdian Alarm Web App"),r.a.createElement("h2",{id:"support-and-device-management-portal"},"support and device management portal"))}}]),a}(r.a.Component),je=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"gulp-content--equals"},"Gulp Content- Equals"),r.a.createElement("h2",{id:"file-comparison-and-branching-in-gulp-tasks"},"file comparison and branching in gulp tasks"))}}]),a}(r.a.Component),Oe=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"gulp-html-to-react-class"},"Gulp HTML to React Class"),r.a.createElement("h2",{id:"file-conversion-tool"},"file conversion tool"))}}]),a}(r.a.Component),we=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).domRef=r.a.createRef(),e.getParentComp=function(){return e.domRef},e.Posts=[{id:"FlashBang",el:r.a.createElement(pe,null),todo:!0},{id:"Return-To-Otter-Space",el:r.a.createElement(ve,null),todo:!0},{id:"Planets-Processing",el:r.a.createElement(Ee,null),todo:!0},{id:"Estimator",el:r.a.createElement(be,null),todo:!0},{id:"Gaurdian-Alarm",el:r.a.createElement(ge,null),todo:!0},{id:"gulp-contentequals",el:r.a.createElement(je,null),todo:!0},{id:"gulp-htmltoreactclass",el:r.a.createElement(Oe,null),todo:!0}],e}return Object(S.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement($,{id:"projects",ref:this.domRef,title:"featured projects"},this.Posts.map((function(t,a){return r.a.createElement(fe,{key:t.id+a,id:t.id,getParentComp:e.getParentComp,todo:t.todo,double:!!t.double},t.el)})))}}]),a}(r.a.Component),ye=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"untitled-submarine-game"},"Untitled Submarine Game"),r.a.createElement("h2",{id:"ambience-for-an-underwater-game"},"Ambience for an underwater game"))}}]),a}(r.a.Component),Ce=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"java-processing-autocomposer"},"Java Processing Autocomposer"),r.a.createElement("h2",{id:"an-experminent-in-procedural-composition"},"An Experminent in Procedural Composition"))}}]),a}(r.a.Component),ke=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"jump-the-rope-minigame"},"Jump The Rope Minigame"),r.a.createElement("h2",{id:"directx-graphics-and-audio-showcase"},"DirectX Graphics and Audio Showcase"))}}]),a}(r.a.Component),xe=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"pain-train-the-final-heist"},"Pain Train: The Final Heist"),r.a.createElement("h2",{id:"western-space-jazz-for-a-mobile-arg"},"Western Space Jazz For a Mobile ARG"),r.a.createElement("p",null,r.a.createElement("img",{src:"https://res.cloudinary.com/dyzmnhqpr/image/upload/v1585177799/sample.jpg",alt:"test image"})))}}]),a}(r.a.Component),Pe=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).domRef=r.a.createRef(),e.getParentComp=function(){return e.domRef},e.Posts=[{id:"FlashBang",el:r.a.createElement(pe,null),todo:!0},{id:"Return-To-Otter-Space",el:r.a.createElement(ve,null),todo:!0},{id:"Pain-Train",el:r.a.createElement(xe,null),todo:!0},{id:"Jump-The-Rope",el:r.a.createElement(ke,null),todo:!0},{id:"Aquatic-Game",el:r.a.createElement(ye,null),todo:!0},{id:"Autocomposer",el:r.a.createElement(Ce,null),todo:!0}],e}return Object(S.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement($,{id:"audio",ref:this.domRef,title:"audio projects"},this.Posts.map((function(t,a){return r.a.createElement(fe,{key:t.id+a,id:t.id,getParentComp:e.getParentComp,todo:t.todo},t.el)})))}}]),a}(r.a.Component),Se=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"victorian-mobile-arg"},"Victorian Mobile ARG"),r.a.createElement("h2",{id:"belle-of-the-ball-part-3"},"Belle of the Ball Part 3"))}}]),a}(r.a.Component),Te=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"victorian-board-game"},"Victorian Board Game"),r.a.createElement("h2",{id:"belle-of-the-balle-part-1"},"Belle of the Balle Part 1"))}}]),a}(r.a.Component),Re=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"victorian-web-game"},"Victorian Web Game"),r.a.createElement("h2",{id:"belle-of-the-ball-part-2"},"Belle of the Ball Part 2"))}}]),a}(r.a.Component),Ne=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"yars3d"},"Yars3D"),r.a.createElement("h2",{id:"a-remake-of-yars-revenge-in-opengl"},"A Remake of Yar's Revenge in OpenGL"))}}]),a}(r.a.Component),Be=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"queens-fodder"},"Queen's Fodder"),r.a.createElement("h2",{id:"rhythmic-turnbased-game"},"Rhythmic Turnbased Game"))}}]),a}(r.a.Component),Ae=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"koc-demos"},"KoC Demos"),r.a.createElement("h2",{id:"class-materials-for-instructing-java-game-design"},"Class materials for instructing Java game design"))}}]),a}(r.a.Component),De=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).domRef=r.a.createRef(),e.getParentComp=function(){return e.domRef},e.Posts=[{id:"Return-To-Otter-Space",el:r.a.createElement(ve,null),todo:!0},{id:"Yars-3d",el:r.a.createElement(Ne,null),todo:!0},{id:"Belle-of-the-Ball-Board-Game",el:r.a.createElement(Te,null),todo:!0},{id:"Queens-Fodder",el:r.a.createElement(Be,null),todo:!0},{id:"Belle-of-the-Ball-Web-Game",el:r.a.createElement(Re,null),todo:!0},{id:"Belle-of-the-Ball-ARG",el:r.a.createElement(Se,null),todo:!0},{id:"KoC-Demos",el:r.a.createElement(Ae,null),todo:!0}],e}return Object(S.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement($,{id:"games",ref:this.domRef,title:"game projects"},this.Posts.map((function(t,a){return r.a.createElement(fe,{key:t.id+a,id:t.id,getParentComp:e.getParentComp,todo:t.todo},t.el)})))}}]),a}(r.a.Component),Ie=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"react-newspaper-website"},"React Newspaper Website"),r.a.createElement("h2",{id:"meta-project-documentation"},"meta project documentation"))}}]),a}(r.a.Component),Ge=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).domRef=r.a.createRef(),e.getParentComp=function(){return e.domRef},e.Posts=[{id:"Estimator",el:r.a.createElement(be,null),todo:!0},{id:"Gaurdian-Alarm",el:r.a.createElement(ge,null),todo:!0},{id:"gulp-contentequals",el:r.a.createElement(je,null),todo:!0},{id:"gulp-htmltoreactclass",el:r.a.createElement(Oe,null),todo:!0},{id:"react-newspaper",el:r.a.createElement(Ie,null),todo:!0}],e}return Object(S.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement($,{id:"web",ref:this.domRef,title:"web projects"},this.Posts.map((function(t,a){return r.a.createElement(fe,{key:t.id+a,id:t.id,getParentComp:e.getParentComp,todo:t.todo},t.el)})))}}]),a}(r.a.Component),qe=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"warpdrive-webgl-animation"},"WarpDrive WebGL Animation"),r.a.createElement("h2",{id:"an-exploration-in-vanilla-webgl"},"an exploration in vanilla webgl"))}}]),a}(r.a.Component),ze=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"procedural-planets---threejs"},"Procedural Planets - ThreeJS"),r.a.createElement("h2",{id:"procedural-textures-with-threejs"},"procedural textures with ThreeJS"))}}]),a}(r.a.Component),We=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(e){return Object(P.a)(this,a),t.call(this,e)}return Object(S.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",{id:"procedural-planets---web"},"Procedural Planets - Web"),r.a.createElement("h2",{id:"3d-math-on-2d-html-canvas"},"3D math on 2D HTML canvas"))}}]),a}(r.a.Component),He=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,i=new Array(n),l=0;l<n;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).domRef=r.a.createRef(),e.getParentComp=function(){return e.domRef},e.Posts=[{id:"Jump-The-Rope",el:r.a.createElement(ke,null),todo:!0},{id:"Warpdrive",el:r.a.createElement(qe,null),todo:!0},{id:"Planets-Processing",el:r.a.createElement(Ee,null),todo:!0},{id:"Planets-ThreeJS",el:r.a.createElement(ze,null),todo:!0},{id:"Planets-Canvas",el:r.a.createElement(We,null),todo:!0}],e}return Object(S.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement($,{id:"graphics",ref:this.domRef,title:"graphics projects"},this.Posts.map((function(t,a){return r.a.createElement(fe,{key:t.id+a,id:t.id,getParentComp:e.getParentComp,todo:t.todo},t.el)})))}}]),a}(r.a.Component),Me=a(35),Le=a(70),Fe=a(165),Je=a(76),Ye=a.n(Je);a(111);function Ve(){return r.a.createElement($,{id:"contact",title:"contact"},r.a.createElement(Ue,null))}var Ue=function(e){Object(R.a)(a,e);var t=Object(T.a)(a);function a(){var e;Object(P.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={formData:{name:"",email:"",company:"",cc:"",bcc:"",message:""},submitted:!1,success:!1,snack:!1},e.placeholder="I'd like to get in touch!",e.handleChange=function(t){var a=e.state.formData;a[t.target.name]=t.target.value,e.setState({formData:a})},e.handleSubmit=function(){e.setState({submitted:!0},(function(){setTimeout((function(){return e.setState({submitted:!1})}),5e3)}));var t=e.state.formData;""===t.message&&(t.message=e.placeholder);Ye.a.send("default_service","contact_request",t,"user_QNXlqNxwDbbIQF0pexwx9").then((function(t){e.setState({success:!0}),e.open()}),(function(t){console.error(t),e.setState({success:!1}),e.open()}))},e}return Object(S.a)(a,[{key:"open",value:function(){this.setState({snack:!0})}},{key:"close",value:function(){this.setState({snack:!1})}},{key:"render",value:function(){var e=this.state,t=e.formData,a=e.submitted,n=e.success,i=e.snack,l=window.innerWidth<=M.sm,o=window.innerWidth<=M.xs,c=this.close.bind(this);return r.a.createElement(Me.ValidatorForm,{ref:"form",onSubmit:this.handleSubmit,id:"emailForm",className:o?"extraSmall":""+l?"small":"'"},r.a.createElement(N.a,{item:!0,xs:12,id:"emailGrid"},r.a.createElement(N.a,{container:!0,direction:"row",className:"nameInputs",spacing:4},r.a.createElement(N.a,{item:!0,xs:4},r.a.createElement(Me.TextValidator,{label:"Name",onChange:this.handleChange,name:"name",value:t.name,validators:["required"],errorMessages:["this field is required"],required:!0,variant:"outlined"})),r.a.createElement(N.a,{item:!0,xs:4},r.a.createElement(Me.TextValidator,{label:"Email",onChange:this.handleChange,name:"email",value:t.email,validators:["required","isEmail"],errorMessages:["this field is required","email is not valid"],required:!0,variant:"outlined"})),r.a.createElement(N.a,{item:!0,xs:4},r.a.createElement(Me.TextValidator,{onChange:this.handleChange,name:"company",variant:"outlined",label:"Company",value:t.company,required:!0,validators:["required"],errorMessages:["this field is required"]}))),r.a.createElement(N.a,{container:!0,direction:"row",className:"emailInputs",spacing:4},r.a.createElement(N.a,{item:!0,xs:6},r.a.createElement(Me.TextValidator,{onChange:this.handleChange,name:"cc",validators:["isEmail"],errorMessages:["not a valid email"],value:t.cc,variant:"outlined",label:"CC"})),r.a.createElement(N.a,{item:!0,xs:6},r.a.createElement(Me.TextValidator,{onChange:this.handleChange,name:"bcc",validators:["isEmail"],errorMessages:["not a valid email"],value:t.bcc,variant:"outlined",label:"BCC"}))),r.a.createElement(N.a,{container:!0,spacing:8},r.a.createElement(N.a,{item:!0,xs:12},r.a.createElement(Le.a,{onChange:this.handleChange,name:"message",multiline:!0,rows:"5",variant:"outlined",label:"Message",placeholder:this.placeholder,value:t.message}))),r.a.createElement(N.a,{container:!0,spacing:4},r.a.createElement(N.a,{item:!0,xs:12,id:"contactSubmitContainer"},r.a.createElement(I.a,{color:"primary",variant:"outlined",type:"submit",disabled:a,id:"contactSubmit"},a?"Email Submitted!":!a&&"Submit")))),r.a.createElement(s.a,{open:i,autoHideDuration:6e3,onClose:c,anchorOrigin:{vertical:"bottom",horizontal:"right"}},n?r.a.createElement(m.a,{onClose:c,severity:"success"},r.a.createElement(Fe.a,null,"Success"),"Email sent successfuly!"):r.a.createElement(m.a,{onClose:c,severity:"error"},r.a.createElement(Fe.a,null,"Something went wrong!"),"Email could not be sent!")))}}]),a}(r.a.Component),Xe=Object(K.a)({content:{display:"inline-block",margin:"0 2% 0 2%",textAlign:"center"}});function Qe(e){var t=Xe();return r.a.createElement("div",{className:t.content},r.a.createElement(we,null),r.a.createElement(Pe,null),r.a.createElement(De,null),r.a.createElement(Ge,null),r.a.createElement(He,null),r.a.createElement(Ve,null))}function _e(e){var t=p();return r.a.createElement("div",{style:{minHeight:t}})}a(112);var Ke=Object(o.a)();window.updatedPath=!1;var Ze=Object(c.f)((function(e){var t=e.location,a=e.history;if(window.updatedPath)return null;var n=t.pathname.split("/").filter((function(e){return e})).reduce((function(e,t){return e+("homepage"!==t?"/"+t:"")}),"");return n!==t.pathname&&a.push(n),window.updatedPath=!0,null}));l.a.render(r.a.createElement(c.b,{history:Ke},r.a.createElement(Y,null,r.a.createElement(Ze,null),r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/",component:function(e){var t=r.a.useState({isOpen:!1,wasOpen:!1}),a=Object(u.a)(t,2),n=a[0],i=n.isOpen,l=n.wasOpen,o=a[1];function c(){o({isOpen:!1,wasOpen:!0})}return setTimeout((function(){l||o({isOpen:!0,wasOpen:!0})}),1e3),r.a.createElement("div",null,r.a.createElement(V,null),r.a.createElement(x,null),r.a.createElement(_e,null),r.a.createElement(Qe,null),r.a.createElement(d,null),r.a.createElement(s.a,{open:i,autoHideDuration:5e3,onClose:c,anchorOrigin:{vertical:"bottom",horizontal:"right"}},r.a.createElement(m.a,{severity:"info",onClick:c},"New project docs are being migrated daily. Check back again soon!")))}})))),document.getElementById("root"))},87:function(e,t,a){e.exports=a(113)},88:function(e,t,a){},93:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[87,1,2]]]);
//# sourceMappingURL=main.19e173ec.chunk.js.map