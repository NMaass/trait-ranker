(this["webpackJsonptrait-ranker"]=this["webpackJsonptrait-ranker"]||[]).push([[0],{146:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),i=n(41),s=n.n(i),a=n(7),o=n(16),u=n(11),l=n(179),j=n(180),b=n(181),d=n(182),O=n(183),h=n(184),f=n(185),x=n(186),g=n(187),m=n(188),p=n(2),v={Artistry:Object(p.jsx)(l.p,{}),"Musical Skill":Object(p.jsx)(j.e,{}),Leadership:Object(p.jsx)(l.e,{}),Excellence:Object(p.jsx)(b.e,{}),"Self Control":Object(p.jsx)(b.i,{}),"Physical Appearance":Object(p.jsx)(l.c,{}),Independence:Object(p.jsx)(l.a,{}),Flexibility:Object(p.jsx)(l.s,{}),"Personal Space":Object(p.jsx)(b.j,{}),Rest:Object(p.jsx)(l.o,{}),Kindness:Object(p.jsx)(d.d,{}),Recreation:Object(p.jsx)(b.k,{}),Strength:Object(p.jsx)(b.d,{}),Wisdom:Object(p.jsx)(b.f,{}),Empathy:Object(p.jsx)(b.b,{}),Trust:Object(p.jsx)(O.a,{}),Spontaneity:Object(p.jsx)(h.a,{}),Adventure:Object(p.jsx)(l.n,{}),Integrity:Object(p.jsx)(b.h,{}),Generosity:Object(p.jsx)(b.l,{}),Patience:Object(p.jsx)(b.a,{}),Perseverance:Object(p.jsx)(l.m,{}),Mercy:Object(p.jsx)(l.g,{}),Romance:Object(p.jsx)(l.h,{}),Athleticism:Object(p.jsx)(l.k,{}),"Constructive Criticism":Object(p.jsx)(b.g,{}),Productivity:Object(p.jsx)(l.f,{}),Nature:Object(p.jsx)(j.c,{}),Peace:Object(p.jsx)(j.f,{}),Determination:Object(p.jsx)(f.b,{}),Resourcefulness:Object(p.jsx)(x.b,{}),Authority:Object(p.jsx)(d.c,{}),Hope:Object(p.jsx)(l.i,{}),Challenge:Object(p.jsx)(l.d,{}),Decisiveness:Object(p.jsx)(l.b,{}),Comfort:Object(p.jsx)(l.q,{}),Joy:Object(p.jsx)(h.c,{}),Fairness:Object(p.jsx)(x.a,{}),Affection:Object(p.jsx)(f.f,{}),Confidence:Object(p.jsx)(j.a,{}),Respect:Object(p.jsx)(f.d,{}),Discipline:Object(p.jsx)(j.b,{}),Frugality:Object(p.jsx)(f.e,{}),Suffering:Object(p.jsx)(d.a,{}),"Child-likeness":Object(p.jsx)(f.a,{}),Optimism:Object(p.jsx)(g.a,{}),Ambition:Object(p.jsx)(m.a,{}),Craftsmanship:Object(p.jsx)(f.i,{}),Vulnerability:Object(p.jsx)(j.d,{}),Family:Object(p.jsx)(b.c,{}),Boldness:Object(p.jsx)(l.j,{}),Caution:Object(p.jsx)(d.b,{}),Confrontation:Object(p.jsx)(l.d,{}),Charisma:Object(p.jsx)(f.c,{}),Ingenuity:Object(p.jsx)(x.b,{}),Teachability:Object(p.jsx)(f.j,{}),Pessimism:Object(p.jsx)(f.h,{}),Loyality:Object(p.jsx)(l.r,{}),"Self-Improvement":Object(p.jsx)(l.l,{}),Creativity:Object(p.jsx)(f.g,{}),Realism:Object(p.jsx)(h.b,{})},y=["Adventure","Ambition","Athleticism","Boldness","Caution","Charisma","Confrontation","Craftsmanship","Creativity","Decisiveness","Discipline","Empathy","Flexibility","Frugality","Independence","Ingenuity","Musical Skill","Loyality","Optimism","Patience","Peace","Perseverance","Personal Space","Realism","Physical Appearance","Romance","Self-Improvement","Teachability","Vulnerability"];function k(e){for(var t,n=e.length;0!==n;){t=Math.floor(Math.random()*n),n--;var r=[e[t],e[n]];e[n]=r[0],e[t]=r[1]}return e}var C={traits:y,columns:{column1:{id:"column1",title:"Not Valued",traitIds:[]},column2:{id:"column2",title:"Traits",traitIds:k(y)},column3:{id:"column3",title:"Valued",traitIds:[]},guessing:{id:"guessing",title:"guessing",traitIds:[]}},columnOrder:["column1","column2","column3"]},I=n(4),S=n(8);function w(e){for(var t="",n="0123456789",r=n.length,c=0;c<e;c++)t+=n.charAt(Math.floor(Math.random()*r));return t}var R=n(203),D=n(199),T=n(204),P=n(201),A=n(39),L=n.n(A),G=n(96),E=n.n(G);L.a.init("e338ea1bac5ef125937525a304521900",{debug:!1}),E.a.init("zwugvl/trait-ranker"),E.a.getSessionURL((function(e){L.a.track("LogRocket",{sessionURL:e})}));var z=function(e){var t=e.text,n=Object(r.useState)(!1),c=Object(u.a)(n,2),i=c[0],s=c[1],a=Object(r.useState)(!1),o=Object(u.a)(a,2),l=o[0],j=o[1];return Object(p.jsxs)(R.a,{container:!0,direction:"column",alignItems:"center",justifyContent:"center",spacing:2,children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(D.a,{title:"Copied to clipboard!",open:i,leaveDelay:1e3,onClose:function(){s(!1)},children:Object(p.jsx)(T.a,{variant:"contained",onClick:function(){L.a.track("Shared"),navigator.share?navigator.share({text:"Take a look at my most valued traits",url:t}).then((function(){return console.log("successful share")})).catch((function(e){return console.log("error sharing",e)})):(navigator.clipboard.writeText(t).then((function(){return console.log("Copied!")})).catch((function(){return console.log("Copy failed")})),s(!0),j(!0))},children:"Share"})})}),l&&Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(P.a,{children:t})})]})},M=n(110),F=n(52),J=Object(M.a)({apiKey:"AIzaSyBGLwRSqZ-ZO8O7t2Jx0J0ZNq9P5MgzkJ0",authDomain:"trait-ranker.firebaseapp.com",projectId:"trait-ranker",storageBucket:"trait-ranker.appspot.com",messagingSenderId:"387696334301",appId:"1:387696334301:web:e7d512845f69e5a2e25234",measurementId:"G-K0FPHGRC6R"}),H=Object(F.c)(J);function N(e,t){return q.apply(this,arguments)}function q(){return(q=Object(S.a)(Object(I.a)().mark((function e(t,n){return Object(I.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(F.d)(Object(F.a)(H,"Traits",t),{traits:n}).catch((function(e){console.log(e)}));case 2:console.log(Object(F.a)(H,"Traits",t));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(e){return W.apply(this,arguments)}function W(){return(W=Object(S.a)(Object(I.a)().mark((function e(t){var n,r,c;return Object(I.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Object(F.a)(H,"Traits",t),e.next=3,Object(F.b)(n);case 3:if(!(r=e.sent).exists()){e.next=10;break}return c=r.data().traits,console.log(c),e.abrupt("return",c);case 10:console.log("no doc");case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var V,Z=n(207),K=n(202),U=n(208),Q=n(209),X=n(0),Y=function(e){var t=e.traits;return Object(p.jsx)(Z.a,{children:t.splice(0,7).map((function(e){return Object(p.jsxs)(K.a,{children:[Object(p.jsx)(U.a,{children:Object(p.jsx)(X.b.Provider,{value:{size:"5vh"},children:v[e]})}),Object(p.jsx)(Q.a,{children:e})]},e)}))})},$=function(e){var t=e.topTraits,n=e.userID;return Object(r.useEffect)((function(){!function(e){L.a.track("Results Step",{steps:3}),L.a.track("Ranked Traits",{"top traits":e})}(t),Object(S.a)(Object(I.a)().mark((function e(){return Object(I.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("setting traits",t),e.next=3,N(n,t);case 3:case"end":return e.stop()}}),e)})))()}),[t]),Object(p.jsxs)(R.a,{container:!0,direction:"column",alignItems:"center",justifyContent:"center",children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)("h3",{children:"Top Traits"})}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(Y,{traits:t.reverse()})}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(z,{text:"https://nmaass.github.io/trait-ranker/#/Share/"+n})})]})},_=(n(71),n(195)),ee=n(82),te=function(e){var t=e.trait,n=e.onClick,r=Object(_.a)("(min-width:1024px"),i=c.a.useRef(null);return Object(p.jsxs)("div",{className:"card rankCard",onClick:n,onMouseDown:function(e){i.current.start(e)},onMouseUp:function(e){i.current.stop(e)},children:[Object(p.jsxs)(R.a,{container:!0,alignItems:"center",justifyContent:"center",direction:"column",children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)("h1",{children:t})}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(X.b.Provider,{value:r?{size:"6vw"}:{size:"20vw"},children:v[t]})})]}),Object(p.jsx)(ee.a,{ref:i,center:!1})]})},ne=(n(196),n(210),function(e){var t=e.topTraits,n=e.setTopTraits,i=e.history,s=(e.finalList,c.a.useState(t.slice(0,2))),a=Object(u.a)(s,2),o=a[0],l=a[1],j=Object(r.useRef)([]),b=Object(r.useRef)([]),d=Object(r.useRef)([]),O=Object(r.useRef)([]),h=Object(r.useRef)([]),f=Object(r.useRef)(0),x=Object(r.useRef)(0),g=Object(r.useRef)([]),m=Object(r.useRef)(!1),v=Object(r.useRef)(null);Object(r.useEffect)((function(){if(m.current)console.log("isDone is preventing useEffect from running");else{var e=t;l(e.slice(0,2)),e.length%2&&(v.current=e.pop());for(var n=0;n<e.length;n+=2)j.current.push([e[n],e[n+1]])}}),[]);var y=function(e){(console.log("pick: "+e),m.current)?console.log("is done is preventing handle pick from firing. Finished list:",g):(0!==O.current.length?C(e):0!==h.current.length&&I(e),0!==j.current.length&&k(e),h.current.some((function(e){return e.length}))||0!==j.current.length||(0===b.current.length?(n(g.current),console.log("finished the list"+g.current),i.push("/Results")):S(b.current[0])));console.log("initialPairs: ",j.current),console.log("sortedPairs: ",b.current),console.log("finished list: ",g.current),console.log("Join stack: ",O.current),console.log("mergeStack",h.current)},k=function(e){m.current?console.log("isDone is preventing inital round from firing"):(e===j.current[0][0]&&(j.current[0].reverse(),console.log("reversed ",j.current[0])),b.current.push(j.current.shift()),l(j.current[0]),1===j.current.length&&(null!==v.current?(g.current.push(v.current),console.log("Prepping for round uneven")):(g.current=b.current.shift(),console.log("Prepping for round 2"))))},C=function(e){m.current?console.log("isDone is blocking doJoinRound"):2===O.current.length?e===d.current[0]?(g.current=g.current.concat(d.current),T()):(O.current.shift(),l(O.current[0])):e===d.current[1]?(O.current=[],l(h.current[0][0])):(g.current=d.current.concat(g.current),T())},I=function(e){m.current?console.log("isDone is preventing domergeRound"):o[0]===d.current[0]?(e!==o[0]?(g.current.splice(f.current,0,d.current[0]),h.current[0]=[]):(h.current[0].shift(),f.current++,console.log("leftGuess ",f.current),0===h.current[0].length&&(g.current.splice(f.current,0,d.current[0]),h.current[0].shift())),0!==h.current[1].length?l(h.current[1][0]):l(h.current[0][0])):(e===o[0]?(g.current.splice(x.current+1,0,d.current[1]),h.current[1]=[]):(h.current[1].shift(),x.current--,console.log("rightGuess ",x.current),0===h.current[1].length&&(g.current.splice(x.current+1,0,d.current[1]),h.current[1].shift())),0!==h.current[0].length?l(h.current[0][0]):l(h.current[1][0]))},S=function(e){(console.log("building round 2"),m.current)?console.log("isDone is preventing buildMerge"):(g.current.length>6&&m.current,w(e),D(e),d.current=b.current.shift(),f.current=0,x.current=g.current.length)},w=function(e){m.current?console.log("isDone is blocking build joinStack"):(O.current.push([e[0],g.current[g.current.length-1]]),O.current.push([e[1],g.current[0]]),l(O.current[0]),console.log("Initial Join stack: ",O.current))},D=function(e){if(m.current)console.log("isDone is blocking build mergeStack");else{for(var t=[],n=[],r=0;r<g.current.length;r++)t.push([e[0],g.current[r]]);for(var c=g.current.length-1;c>=0;c--)n.push([e[1],g.current[c]]);h.current=[t,n],console.log("initial mergeStack",h.current)}},T=function(){O.current=[],h.current=[],d.current=[]},P=Object(_.a)("(min-width:1024px)");return Object(r.useEffect)((function(){!function(e){L.a.track("Ranking Step",{steps:2}),L.a.track("Selected Traits",{"chosen traits":e})}(t)}),[]),Object(p.jsx)("div",{children:Object(p.jsxs)(R.a,{container:!0,spacing:P?60:1,alignItems:"center",justifyContent:"center",direction:P?"row":"column",children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(te,{onClick:function(){return y(o[0])},trait:o[0]})}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(te,{onClick:function(){return y(o[1])},trait:o[1]})})]})})}),re=n(214),ce=n(215),ie=n(216),se=n(211),ae=n(200),oe=n(213),ue=n(111),le=n.n(ue),je=function(){var e=c.a.useState(!1),t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(p.jsxs)("div",{children:[Object(p.jsx)(se.a,{size:"large",onClick:function(){r(!0)},children:Object(p.jsx)(le.a,{})}),Object(p.jsx)(ae.a,{onClose:function(){r(!1)},open:n,maxWidth:"xl",style:{borderRadius:0},children:Object(p.jsxs)(oe.a,{paragraph:!1,style:{margin:"24px"},children:[Object(p.jsx)("br",{}),"1. Drag traits to the left or right depending on whether you value them.",Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),"2. Click on the traits you value more.",Object(p.jsx)("br",{}),Object(p.jsx)("br",{}),"3. Click the share buttons to show your friends!",Object(p.jsx)("br",{})]})})]})},be=function(e){var t=e.history;return Object(p.jsx)(T.a,{color:"inherit",onClick:function(){t.push("/")},children:"Trait Ranker"})},de=function(e){var t=e.history;return Object(p.jsx)(re.a,{sx:{flexGrow:1},children:Object(p.jsx)(ce.a,{position:"fixed",children:Object(p.jsxs)(ie.a,{children:[Object(p.jsx)(be,{history:t}),Object(p.jsx)("div",{style:{marginLeft:"auto"},children:Object(p.jsx)(je,{})})]})})})},Oe=n(25),he=n(94),fe=n(36),xe=n(45),ge=n(50),me=function(e){var t=e.trait,n=e.provided,r=Object(_.a)("(min-width:1024px");return Object(p.jsx)("div",Object(o.a)(Object(o.a)({className:"card selection"},n.dragHandleProps),{},{draggable:!0,id:t,children:Object(p.jsxs)(R.a,{container:!0,alignItems:"center",justifyContent:"center",direction:"column",children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)("h1",{children:t})}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(X.b.Provider,{value:r?{size:"6vw"}:{size:"60vw"},children:v[t]})})]})}))},pe=ge.a.div(V||(V=Object(fe.a)([""])));function ve(e,t){if(e=function(e){if(null!==e&&void 0!==e&&e.transform){var t="".concat(e.transform.split(",").shift(),", 0px)");return Object(o.a)(Object(o.a)({},e),{},{transform:t})}return e}(e),!t.isDropAnimating)return e;var n=t.dropAnimation,r=n.moveTo,c=n.duration,i=t.draggingOver;console.log(i);var s=0;"column1"===i?s=-100:"column3"===i&&(s=100);var a="translate(".concat(s,"vw, ").concat(r.y,"px)");return Object(o.a)(Object(o.a)({},e),{},{transform:a,transition:"all  ".concat(c+.2,"s")})}var ye,ke,Ce=function(e){var t=e.trait,n=e.index;return Object(p.jsx)(xe.b,{draggableId:t,index:n,children:function(e,n){return Object(p.jsx)(pe,Object(o.a)(Object(o.a)({},e.draggableProps),{},{ref:e.innerRef,isDragging:n.isDragging,style:ve(e.draggableProps.style,n),children:Object(p.jsx)(me,{trait:t,provided:e})}))}},t)},Ie=(ge.a.div(ye||(ye=Object(fe.a)(["\n  display: flex;\n"]))),ge.a.div(ke||(ke=Object(fe.a)(["\n  transition: background-color 0.2s ease;\n  background-color: ",";\n  display: flex;\n  min-width: ",";\n  min-height: 100vh;\n  max-width: ",";\n"])),(function(e){return e.isDraggingOver?e.hoverColor:"white"}),(function(e){return e.isStarter?"1px":"49.9vw"}),(function(e){return e.isStarter&&"1px"}))),Se=function(e){var t=e.column,n=e.isStarter,r=void 0!==n&&n,c=e.hoverColor,i=void 0===c?"lightBlue":c;return Object(p.jsx)(xe.c,{droppableId:t.id,direction:"horizontal",children:function(e,n){return Object(p.jsx)(Ie,Object(o.a)(Object(o.a)({classname:"cards stack",ref:e.innerRef,isStarter:r,hoverColor:i,isDraggingOver:n.isDraggingOver},e.droppableProps),{},{children:Object(p.jsx)(R.a,{container:!0,direction:"column",alignItems:"center",justifyContent:"center",children:Object(p.jsxs)(R.a,{item:!0,margin:"auto",children:[r&&Object(p.jsx)(Ce,{trait:null===t||void 0===t?void 0:t.traitIds[0],index:null===t||void 0===t?void 0:t.traitIds.indexOf(null===t||void 0===t?void 0:t.traitIds[0])},null===t||void 0===t?void 0:t.traitIds[0]),e.placeholder]})})}))}},t.id)};var we,Re,De=function(e){var t=e.columnData,n=e.setTopTraits,c=e.history,i=e.swipeHandlers;return Object(r.useEffect)((function(){console.log("currentTraits: ",t.columns.column2.traitIds),console.log("top traits: ",t.columns.column3.traitIds),0===t.columns.column2.traitIds.length&&(console.log(t.columns.column3.traitIds),n(t.columns.column3.traitIds),console.log("setting traits from selection"),c.push("/Rank"))}),[t,c,n]),Object(p.jsx)(re.a,{children:Object(p.jsx)("div",Object(o.a)(Object(o.a)({},i),{},{children:Object(p.jsxs)(R.a,{container:!0,spacing:0,wrap:"nowrap",children:[Object(p.jsx)(Se,{column:t.columns.column1,hoverColor:"LightPink"},t.columns.column1.id),Object(p.jsx)(Se,{column:t.columns.column2,isStarter:!0},t.columns.column2.id),Object(p.jsx)(Se,{column:t.columns.column3,hoverColor:"LightGreen"},t.columns.column3.id)]})}))})},Te=n(116),Pe=n(205),Ae=function(e){var t=e.trait,n=e.provided,r=e.color,c=Object(_.a)("(min-width:1024px");return Object(p.jsx)(Pe.a,Object(o.a)(Object(o.a)({icon:v[t],label:t},n.dragHandleProps),{},{draggable:!0,id:t,color:r,sx:c?{minWidth:"300px"}:{minWidth:"80vw"}}))},Le=function(e){var t=e.trait,n=e.index,r=e.color,c=(e.isDraggable,ge.a.div(we||(we=Object(fe.a)([""]))));return Object(p.jsx)(xe.b,{draggableId:t,index:n,children:function(e){return Object(p.jsx)(c,Object(o.a)(Object(o.a)({},e.draggableProps),{},{ref:e.innerRef,children:Object(p.jsx)(Ae,{trait:t,provided:e,color:r})}))}})},Ge=ge.a.div(Re||(Re=Object(fe.a)([""]))),Ee=function(e){var t=e.column,n=e.colors;e.isDraggable;return Object(p.jsx)("div",{children:Object(p.jsx)(xe.c,{droppableId:t.id,children:function(e,r){return Object(p.jsxs)(Ge,Object(o.a)(Object(o.a)({ref:e.innerRef},e.droppableProps),{},{isDraggingOver:r.isDraggingOver,children:[Object(p.jsx)(R.a,{container:!0,direction:"column",alignItems:"center",justifyContent:"center",children:t.traitIds.map((function(e,r){return Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(Le,{trait:e,index:t.traitIds.indexOf(e),color:n[r]})},e)}))}),e.placeholder]}))}},t.id)})},ze=function(e){var t=e.history,n=e.source;return Object(p.jsx)(T.a,{onClick:function(){!function(e){L.a.track("Share Conversion",{Source:e})}(n),t.replace("/")},variant:"contained",children:"Try it!"})},Me=function(e){var t=e.column,n=e.onDone,r=e.colors,c=e.showTryIt,i=e.history;e.isDraggable;return Object(p.jsxs)(R.a,{container:!0,direction:"column",alignItems:"center",justifyContent:"center",children:[Object(p.jsx)(R.a,{item:!0,sx:{padding:"5vh"}}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(Ee,{column:t,colors:r})}),Object(p.jsx)(R.a,{item:!0,sx:{padding:"5vh"},children:Object(p.jsx)(T.a,{onClick:n,variant:"contained",children:"Lock in"})}),Object(p.jsx)(R.a,{item:!0,children:c&&Object(p.jsx)(ze,{history:i})})]})},Fe=function(e){var t=e.traits,n=e.columnData,c=e.setColumnData,i=e.history,s=Object(r.useRef)(k(t.slice(0,7))),a=Object(r.useRef)([]),l=C.columns.column2.traitIds,j=Object(r.useRef)([]),b=Object(r.useState)([]),d=Object(u.a)(b,2),O=d[0],h=d[1],f=Object(r.useState)(!0),x=Object(u.a)(f,2),g=x[0],m=x[1],v=Object(r.useState)([]),y=Object(u.a)(v,2),I=y[0],S=y[1],w=Object(r.useState)(!0),D=Object(u.a)(w,2),T=D[0],P=D[1],A=Object(r.useState)(!1),G=Object(u.a)(A,2),E=G[0],z=G[1],M=Object(r.useState)(!1),F=Object(u.a)(M,2),J=F[0],H=F[1];Object(r.useEffect)((function(){for(;a.current.length<7;)s.current.includes(l[0])||a.current.push(l[0]),l=l.splice(1,l.length);q()}),[l]);var N=function(e){if(j.current.push(e),0===s.current.length){var t=Object(o.a)(Object(o.a)({},n.columns.guessing),{},{traitIds:j.current}),r=Object(o.a)(Object(o.a)({},n),{},{columns:Object(o.a)(Object(o.a)({},n.columns),{},{guessing:t})});c(r),i=r.columns.guessing,L.a.track("Guessed",{"Guessed traits":i}),z(!0),P(!1)}var i;q()},q=function(){S(k([s.current.pop(),a.current.pop()])),console.log("TraitsLeft: ",s.current),console.log("WrongTaits: ",a.current),console.log(j.current)},B=Object(_.a)("(min-width:1024px)");return Object(p.jsxs)("div",{children:[T&&Object(p.jsxs)(R.a,{container:!0,spacing:B?60:1,alignItems:"center",justifyContent:"center",direction:B?"row":"column",children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(te,{onClick:function(){return N(I[0])},trait:I[0]})}),Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(te,{onClick:function(){return N(I[1])},trait:I[1]})})]}),E&&Object(p.jsx)(Me,{column:n.columns.guessing,onDone:function(){console.log("done!");for(var e=[],r=t.slice(0,7),c=n.columns.guessing.traitIds,i=0;i<r.length;i++)r[i]===c[i]?(e.push("success"),console.log("correct",r[i],c[i])):r.includes(c[i])?(e.push("warning"),console.log("in there",r[i],c[i])):(e.push("default"),console.log("incorrect",r[i],c[i]));h(e),H(!0),m(!1)},colors:O,showTryIt:J,history:i,isDraggable:g})]})},Je=function(e){var t=e.columnData,n=e.setColumnData,c=e.history,i=Object(Oe.f)().id,s=Object(r.useState)([]),a=Object(u.a)(s,2),o=a[0],l=a[1],j=Object(r.useState)(!1),b=Object(u.a)(j,2),d=b[0],O=b[1],h=Object(r.useState)(!1),f=Object(u.a)(h,2),x=f[0],g=f[1],m=Object(r.useState)(!0),v=Object(u.a)(m,2),y=v[0],k=v[1],C=Object(_.a)("(min-width:1024px)");Object(r.useEffect)((function(){Object(S.a)(Object(I.a)().mark((function e(){return Object(I.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B(i).then((function(e){l(e)}));case 2:case"end":return e.stop()}}),e)})))()}),[i]);return console.log("storedTraits",o),Object(p.jsxs)(R.a,{container:!0,spacing:C?60:1,alignItems:"center",justifyContent:"center",direction:C?"row":"column",children:[y&&Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(te,{onClick:function(){L.a.track("Show Traits"),O(!0),k(!1)},trait:"Show the traits"})}),y&&Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(te,{onClick:function(){L.a.track("Guess Traits"),g(!0),k(!1)},trait:"Guess the traits"})}),d&&Object(p.jsx)(R.a,{item:!0,children:Object(p.jsxs)(R.a,{container:!0,alignItems:"center",justifyContent:"center",direction:"column",children:[Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(Y,{traits:o})}),Object(p.jsx)(R.a,{children:Object(p.jsx)(ze,{history:c,source:"Guess"})})]})}),x&&Object(p.jsx)(R.a,{item:!0,children:Object(p.jsx)(Fe,{traits:o,columnData:t,setColumnData:n,history:c})})]})},He=n(93),Ne=n(99),qe=n.n(Ne),Be=function(){var e=Object(Oe.e)(),t=Object(r.useState)(C),n=Object(u.a)(t,2),c=n[0],i=n[1],s=Object(r.useState)([]),l=Object(u.a)(s,2),j=l[0],b=l[1],d=Object(r.useState)(function(e){var t=w(e);return L.a.track("Session Start",{steps:1}),L.a.people.increment("sessions",1),t}(8)),O=Object(u.a)(d,2),h=O[0],f=(O[1],Object(r.useRef)(null));Te.a.initialize("G-4RLGL8ENZC");function x(e){var t=f.current;if(!t)return console.warn("unable to find sensor api"),null;var n={x:0,y:0},r={x:"right"===e?100:-100,y:0},i=t.tryGetLock(c.columns.column2.traitIds[0]);if(!i)return console.log("unable to start capturing"),null;for(var s=i.fluidLift(n),a=[],o=0;o<20;o++)a.push({x:qe.a.easeOutCirc(o,n.x,r.x,20),y:qe.a.easeOutCirc(o,n.y,r.y,20)});m(s,a)}var g=Object(He.a)({onSwipedLeft:function(){console.log("left swiped"),x("left")},onSwipedRight:function(){console.log("right swiped"),x("right")}});function m(e,t){requestAnimationFrame((function(){var n=t.shift();e.move(n),t.length?m(e,t):e.drop()}))}return Object(r.useEffect)((function(){window.addEventListener("touchmove",(function(e){e.preventDefault()}))}),[]),Object(p.jsx)("div",{children:Object(p.jsxs)(xe.a,{onDragEnd:function(e){var t,n=e.destination,r=e.source,s=e.draggableId;if(n&&(n.droppableId!==r.droppableId||n.index!==r.index)){var u=c.columns[r.droppableId],l=c.columns[n.droppableId];if(u!==l){var j=Array.from(u.traitIds);j.splice(r.index,1);var b=Object(o.a)(Object(o.a)({},u),{},{traitIds:j}),d=Array.from(l.traitIds);d.splice(n.index,0,s);var O=Object(o.a)(Object(o.a)({},l),{},{traitIds:d}),h=Object(o.a)(Object(o.a)({},c),{},{columns:Object(o.a)(Object(o.a)({},c.columns),{},(t={},Object(a.a)(t,b.id,b),Object(a.a)(t,O.id,O),t))});i(h)}else{var f=Array.from(u.traitIds);f.splice(r.index,1),f.splice(n.index,0,s);var x=Object(o.a)(Object(o.a)({},u),{},{traitIds:f}),g=Object(o.a)(Object(o.a)({},c),{},{columns:Object(o.a)(Object(o.a)({},c.columns),{},Object(a.a)({},x.id,x))});i(g)}}},sensors:[function(e){f.current=e}],children:[Object(p.jsx)(de,{history:e}),Object(p.jsx)(Oe.a,{exact:!0,path:"/",children:Object(p.jsx)(De,{columnData:c,topTraits:j,setTopTraits:b,setColumnData:i,history:e,swipeHandlers:g})}),Object(p.jsx)(Oe.a,{path:"/Rank",children:Object(p.jsx)(ne,{topTraits:j,setTopTraits:b,history:e})}),Object(p.jsx)(Oe.a,{path:"/Results",children:Object(p.jsx)($,{topTraits:j,setTopTraits:b,userID:h})}),Object(p.jsx)(Oe.a,{path:"/Share/:id",children:Object(p.jsx)(Je,{columnData:c,setColumnData:i,history:e})})]})})},We=function(){return Object(p.jsx)(he.a,{basename:"/trait-ranker",children:Object(p.jsx)(Be,{})})};s.a.render(Object(p.jsx)(We,{}),document.querySelector("#root"))},71:function(e,t,n){}},[[146,1,2]]]);
//# sourceMappingURL=main.d6237f21.chunk.js.map