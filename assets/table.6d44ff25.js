import{z as e,p as s,e as t,F as a,S as o,x as l,r,o as d,c as i,l as n,C as c,w as p,v as u}from"./vendor.d3668fd6.js";import{c as m}from"./Home.ebc3d093.js";import"./index.266b10d2.js";import"./index.40697e53.js";const h=e({name:"Table",inheritAttrs:!1,setup(e,s){console.log("tableProps",e,s);return{list:s.attrs.list,handleCopy:e=>{m(e,void 0,((s,t)=>{s?a.alert(`Your URL is ${e}`,"Copy Failed"):o.success("Your URL Copied")}))},handleSave:e=>{const s=l(e),t=localStorage.getItem("list")||"[]",a=JSON.parse(t);a.some((e=>e.shorted===s.shorted))?o.info("Your URL is already saved"):(a.push(s),localStorage.setItem("list",JSON.stringify(a)),o.success("Your URL is saved in local"))}}}}),v=p();s("data-v-e96ed78e");const y={class:"table"},b=u("Copy"),f=u("Save");t();const C=v(((e,s,t,a,o,l)=>{const p=r("el-table-column"),u=r("el-button"),m=r("el-table");return d(),i("div",y,[n(m,{data:e.list,style:{width:"100%"}},{default:v((()=>[n(p,{label:"Your URL",width:"400",prop:"shorted"}),n(p,{label:"Action",width:"200"},{default:v((s=>[n(u,{type:"primary",onClick:c((t=>e.handleCopy(s.row.shorted)),["stop"])},{default:v((()=>[b])),_:2},1032,["onClick"]),n(u,{type:"primary",onClick:c((t=>e.handleSave(s.row)),["stop"])},{default:v((()=>[f])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])])}));h.render=C,h.__scopeId="data-v-e96ed78e";export default h;
