(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[91],{7116:function(e,t,a){Promise.resolve().then(a.bind(a,2450))},2450:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return y}});var r=a(5862),n=a(7058),s=a(4231),i=a(7516),c=a(3938),l=a(3384);/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let u=(0,l.Z)("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);var o=a(9797),h=a(60),d=a(5339);/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let m=(0,l.Z)("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);var f=a(3713);/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let x=(0,l.Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),p=[{label:"Overview",href:"/admin",icon:u},{label:"Products",href:"/admin/products",icon:o.Z},{label:"Orders",href:"/admin/orders",icon:h.Z},{label:"Customers",href:"/admin/customers",icon:d.Z},{label:"Analytics",href:"/admin/analytics",icon:m}];function y(e){let{children:t}=e,a=(0,i.usePathname)(),l=(0,i.useRouter)(),[u,o]=(0,n.useState)(null),[h,d]=(0,n.useState)(!0);async function m(){await c.O.auth.signOut(),l.push("/auth")}return((0,n.useEffect)(()=>{c.O.auth.getSession().then(e=>{let{data:{session:t}}=e;t?o(t.user):l.push("/auth"),d(!1)})},[]),h)?(0,r.jsx)("div",{className:"min-h-screen bg-[#0a0a0a] flex items-center justify-center",children:(0,r.jsx)("p",{className:"luxury-meta",children:"Verifying Sovereign Access..."})}):(0,r.jsxs)("div",{className:"min-h-screen bg-[#0a0a0a] flex",children:[(0,r.jsxs)("aside",{className:"w-72 border-r border-[#1a1a1a] flex flex-col fixed top-0 left-0 bottom-0 z-40",children:[(0,r.jsxs)("div",{className:"p-8 border-b border-[#1a1a1a]",children:[(0,r.jsx)(s.default,{href:"/",children:(0,r.jsxs)("div",{className:"flex flex-col leading-none",children:[(0,r.jsx)("span",{className:"font-serif text-lg font-light tracking-[0.3em] uppercase text-zinc-100",children:"Shamim"}),(0,r.jsx)("span",{className:"font-serif text-[9px] tracking-[0.5em] uppercase text-[#c9a054]",children:"Forever"})]})}),(0,r.jsx)("p",{className:"luxury-meta mt-4",children:"Sovereign Executive Panel"})]}),(0,r.jsx)("nav",{className:"flex-1 p-6 space-y-1",children:p.map(e=>{let t=e.icon,n=a===e.href;return(0,r.jsxs)(s.default,{href:e.href,className:"flex items-center gap-4 px-4 py-3 transition-all duration-300 group ".concat(n?"text-[#c9a054] bg-[#c9a054]/5 border-l border-[#c9a054]":"text-zinc-500 hover:text-zinc-200 hover:bg-[#111111]"),children:[(0,r.jsx)(t,{size:14,strokeWidth:1.5}),(0,r.jsx)("span",{className:"text-[10px] tracking-[0.3em] uppercase",children:e.label}),n&&(0,r.jsx)(f.Z,{size:10,className:"ml-auto"})]},e.href)})}),(0,r.jsxs)("div",{className:"p-6 border-t border-[#1a1a1a]",children:[u&&(0,r.jsxs)("div",{className:"mb-4",children:[(0,r.jsx)("p",{className:"luxury-meta mb-1",children:"Signed in as"}),(0,r.jsx)("p",{className:"text-zinc-400 text-xs font-light truncate",children:u.email})]}),(0,r.jsxs)("button",{onClick:m,className:"flex items-center gap-3 text-zinc-600 hover:text-red-500/70 transition-colors duration-300 text-[9px] tracking-[0.3em] uppercase",children:[(0,r.jsx)(x,{size:12}),"Sign Out"]})]})]}),(0,r.jsx)("main",{className:"flex-1 ml-72 min-h-screen",children:t})]})}},3938:function(e,t,a){"use strict";a.d(t,{O:function(){return r}});let r=(0,a(1506).eI)("https://uvgtgeauhjbdatrmmaob.supabase.co","sb_publishable_VuaEqan3EBtGHbpTI0KdJg_OimrHkqM")},3384:function(e,t,a){"use strict";a.d(t,{Z:function(){return l}});var r=a(7058);/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),s=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.filter((e,t,a)=>!!e&&a.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let c=(0,r.forwardRef)((e,t)=>{let{color:a="currentColor",size:n=24,strokeWidth:c=2,absoluteStrokeWidth:l,className:u="",children:o,iconNode:h,...d}=e;return(0,r.createElement)("svg",{ref:t,...i,width:n,height:n,stroke:a,strokeWidth:l?24*Number(c)/Number(n):c,className:s("lucide",u),...d},[...h.map(e=>{let[t,a]=e;return(0,r.createElement)(t,a)}),...Array.isArray(o)?o:[o]])}),l=(e,t)=>{let a=(0,r.forwardRef)((a,i)=>{let{className:l,...u}=a;return(0,r.createElement)(c,{ref:i,iconNode:t,className:s("lucide-".concat(n(e)),l),...u})});return a.displayName="".concat(e),a}},3713:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(3384).Z)("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]])},9797:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(3384).Z)("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},60:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(3384).Z)("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]])},5339:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.390.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(3384).Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},7516:function(e,t,a){"use strict";var r=a(3568);a.o(r,"usePathname")&&a.d(t,{usePathname:function(){return r.usePathname}}),a.o(r,"useRouter")&&a.d(t,{useRouter:function(){return r.useRouter}})}},function(e){e.O(0,[92,451,231,158,660,744],function(){return e(e.s=7116)}),_N_E=e.O()}]);