import{r as e,o as t,c as r,a as s,b as o,d as n,I as a,A as i,f as u}from"./vendor.f8a32bda.js";const c={};let d;c.render=function(s,o){const n=e("router-view");return t(),r(n)};const p={},m=function(e,t){if(!t)return e();if(void 0===d){const e=document.createElement("link").relList;d=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in p)return;p[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":d,t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e()))},l={"./pages/About.vue":()=>m((()=>import("./About.f9eb0e87.js")),["/assets/About.f9eb0e87.js","/assets/About.3b584a50.css","/assets/vendor.f8a32bda.js"]),"./pages/Home.vue":()=>m((()=>import("./Home.077908e6.js").then((function(e){return e.H}))),["/assets/Home.077908e6.js","/assets/Home.48bd8313.css","/assets/vendor.f8a32bda.js","/assets/index.acdbca8a.js"]),"./pages/Redirect.vue":()=>m((()=>import("./Redirect.bbc62a78.js")),["/assets/Redirect.bbc62a78.js","/assets/Redirect.d84082d0.css","/assets/index.acdbca8a.js","/assets/vendor.f8a32bda.js"])},_=Object.keys(l).map((e=>{const t=e.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();let r;return r="/home"===t?"/":"/redirect"===t?"/:redirect":t,{path:r,component:l[e]}}));const f=n(c),h=s({history:o(),routes:_});f.use(h),f.use(a),f.use(i),f.use(u),f.mount("#app");export{m as _};