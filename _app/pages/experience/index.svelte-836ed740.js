import{S as o,i as c,s as a,j as p,m as u,o as m,x as f,u as x,v as d}from"../../chunks/vendor-d5647244.js";import{a as h,e as l}from"../../chunks/http.utils-7766b392.js";import{E as _}from"../../chunks/ExperienceSection-624ae9d9.js";import"../../chunks/routes-2be83f61.js";import"../../chunks/route.utils-e448ea58.js";import"../../chunks/paths-28a87002.js";import"../../chunks/Chips-96ad616d.js";import"../../chunks/SectionContainer-5044be4d.js";function j(t){let n,s;return n=new _({props:{data:t[0]}}),{c(){p(n.$$.fragment)},l(e){u(n.$$.fragment,e)},m(e,r){m(n,e,r),s=!0},p(e,[r]){const i={};r&1&&(i.data=e[0]),n.$set(i)},i(e){s||(f(n.$$.fragment,e),s=!0)},o(e){x(n.$$.fragment,e),s=!1},d(e){d(n,e)}}}const y=async({fetch:t})=>({props:{experiences:await h(t,l.experiences)||[]}});function $(t,n,s){let{experiences:e=[]}=n;return t.$$set=r=>{"experiences"in r&&s(0,e=r.experiences)},[e]}class q extends o{constructor(n){super();c(this,n,$,j,a,{experiences:0})}}export{q as default,y as load};