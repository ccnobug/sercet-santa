(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{105:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(64),o=n.n(r),l=(n(84),n(4)),i=n(28),s=n(12),j=(n.p,n(52)),b=n.n(j),d=n(147),O=n(150),u=n(74),x=n(148),h=n(157),g=n(70),m=n.n(g),f=n(68),p=n.n(f),y=n(67),v=n.n(y),C=n(145),k=n(152),S=n(156),I=n(155),B=n(151),q=n(153),E=n(154),F=n(149),T=n(144),z=n(71),L=n.n(z),P=n(72),w=n.n(P),D=n(73),G=n.n(D),N=n(69),J=n.n(N),R=n(53),U=n.n(R),W=(n(105),n(1)),H=Object(u.a)({palette:{primary:{light:"#757ce8",main:"#3f50b5",dark:"#002884",contrastText:"#fff"},secondary:{light:"#ff7961",main:"#f44336",dark:"#ba000d",contrastText:"#000"}}});var M=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),o=Object(s.a)(r,2),j=o[0],u=o[1],g=Object(a.useState)({}),f=Object(s.a)(g,2),y=f[0],z=f[1],P=Object(a.useState)({}),D=Object(s.a)(P,2),N=D[0],R=D[1],M=Object(a.useState)(null),A=Object(s.a)(M,2),K=A[0],Q=A[1],V=Object(a.useState)(""),X=Object(s.a)(V,2),Y=X[0],Z=X[1],$=Object(a.useState)(!1),_=Object(s.a)($,2),ee=_[0],te=_[1],ne=Object(a.useState)(""),ae=Object(s.a)(ne,2),ce=ae[0],re=ae[1],oe=function(e){console.log(e),z(Object(i.a)(Object(i.a)({},y),{},Object(l.a)({},e.target.name,e.target.checked)))},le=function(e){return null!==K?y[e]?Object(W.jsxs)("td",{children:[" ",K[e]," ",Object(W.jsx)(C.a,{checked:y[e],name:e,onChange:oe})]}):Object(W.jsxs)("td",{children:[" *** ",Object(W.jsx)(C.a,{checked:y[e],name:e,onChange:oe})]}):Object(W.jsx)(v.a,{onClick:function(){!function(e){var t=Object(i.a)({},N);delete t[e],R(t)}(e)}})};return Object(W.jsx)(W.Fragment,{children:Object(W.jsx)(x.a,{theme:H,children:Object(W.jsxs)(O.a,{maxWidth:!1,style:{backgroundColor:"#2B4176",minHeight:"100vh",backgroundSize:"cover"},children:[Object(W.jsx)("h1",{style:{display:"flex",justifyContent:"center",alignItems:"center",top:"20px"},children:"Secret Santa Generator"}),Object(W.jsx)(B.a,{component:F.a,style:{marginBottom:"50px",marginTop:"50px"},children:Object(W.jsxs)(k.a,{sx:{minWidth:650},"aria-label":"a dense table",children:[Object(W.jsx)(q.a,{children:Object(W.jsxs)(E.a,{children:[Object(W.jsx)(I.a,{children:" Name"}),Object(W.jsx)(I.a,{children:"Email"}),K&&Object(W.jsx)(I.a,{children:" Secret Santa"})]})}),Object(W.jsx)(S.a,{children:Object.keys(N).map((function(e,t){return Object(W.jsxs)(E.a,{children:[Object(W.jsx)(I.a,{children:e}),Object(W.jsx)(I.a,{children:N[e]}),le(e)]},t)}))})]})}),Y&&Object(W.jsxs)(T.a,{severity:"info",style:{marginBottom:"10px"},children:["Please keep a note of your Unique ID: ",Y]}),Object(W.jsxs)("form",{style:{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"30px"},children:[Object(W.jsxs)("label",{children:["Name",Object(W.jsx)(p.a,{}),":",Object(W.jsx)("input",{type:"text",id:"name",value:n,required:!0,onChange:function(e){return t=e.target.value,void c(t);var t}})]}),Object(W.jsxs)("label",{children:["Email",Object(W.jsx)(J.a,{}),":",Object(W.jsx)("input",{type:"text",id:"email",value:j,required:!0,onChange:function(e){return t=e.target.value,void u(t);var t}})]}),Object(W.jsx)(h.a,{color:"primary","aria-label":"add",size:"small",style:{marginRight:"10px",marginLeft:"10px"},children:Object(W.jsx)(m.a,{onClick:function(){R(Object(i.a)(Object(i.a)({},N),{},Object(l.a)({},n,j))),c(""),u("")}})}),Object(W.jsx)(h.a,{color:"primary","aria-label":"restart",size:"small",style:{marginRight:"10px"},children:Object(W.jsx)(L.a,{onClick:function(){R({}),Q(null)}})}),Object(W.jsx)(d.a,{variant:"contained",onClick:function(){b.a.post("/generator",N).then((function(e){if(console.log(e),console.log("response"),console.log(N),console.log(K),console.log(U.a.isEmpty(e.data)),U.a.isEmpty(e.data))console.log("error"),te(!0);else{console.log(e.data),console.log("no error"),Q(e.data.pairing),Z(e.data.uid);var t={};for(var n in e.data)t[n]=!1;z(t),console.log(Y)}}))},style:{justifyContent:"center"},children:"Generate Now!"})]}),Object(W.jsxs)("form",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(W.jsxs)("label",{children:["Unique ID",Object(W.jsx)(w.a,{}),":",Object(W.jsx)("input",{type:"text",id:"uid",value:ce,required:!0,onChange:function(e){return t=e.target.value,void re(t);var t}})]}),Object(W.jsx)(h.a,{color:"primary","aria-label":"search",size:"small",style:{marginLeft:"10px"},children:Object(W.jsx)(G.a,{onClick:function(){console.log("search"),console.log(ce),b.a.post("/searchhistory",ce).then((function(e){console.log(e),console.log(N),console.log(K),R(e.data.data),Q(e.data.result),console.log(N),console.log(K);var t={};for(var n in e.data)t[n]=!1;z(t)}))}})})]}),ee&&Object(W.jsx)(T.a,{severity:"error",children:"Generate failed. Please try it again."}),Object(W.jsx)("br",{})]})})})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,158)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};o.a.render(Object(W.jsx)(c.a.StrictMode,{children:Object(W.jsx)(M,{})}),document.getElementById("root")),A()},84:function(e,t,n){}},[[112,1,2]]]);
//# sourceMappingURL=main.9ac0bbf8.chunk.js.map