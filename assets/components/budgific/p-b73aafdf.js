const n=(n,i,t)=>{n.style.setProperty(i,t)},i=(n,i)=>{n.style.removeProperty(i)},t=[],e=(n=[],i)=>{if(void 0!==i){const t=Array.isArray(i)?i:[i];return[...n,...t]}return n},a=()=>{let a,o,r,l,s,m,d,u,f,c,v,y,p,A=[],g=[],$=[],b=!1,F={},k=[],C=[],E={},q=0,S=!1,h=!1,T=!0,R=!1,w=!0;const D=[],W=[],I=[],M=[],x=[],K=[],O=[],P=[],j=[],z=[],B="function"==typeof Element&&"function"==typeof Element.prototype.animate,G=()=>z,H=(n,i)=>((i&&i.oneTimeCallback?W:D).push({callback:n,opts:i}),p),J=()=>(D.length=0,W.length=0,p),L=()=>{B?(G().forEach(n=>{n.cancel()}),z.length=0):I.forEach(n=>{requestAnimationFrame(()=>{i(n,"animation-name"),i(n,"animation-duration"),i(n,"animation-timing-function"),i(n,"animation-iteration-count"),i(n,"animation-delay"),i(n,"animation-play-state"),i(n,"animation-fill-mode"),i(n,"animation-direction")})})},N=()=>{x.forEach(n=>{n&&n.parentNode&&n.parentNode.removeChild(n)}),x.length=0},Q=()=>void 0!==s?s:d?d.getFill():void 0,U=()=>void 0!==f?f:void 0!==m?m:d?d.getDirection():void 0,V=()=>S?"linear":void 0!==r?r:d?d.getEasing():void 0,X=()=>h?0:void 0!==c?c:void 0!==o?o:d?d.getDuration():void 0,Y=()=>void 0!==l?l:d?d.getIterations():void 0,Z=()=>void 0!==v?v:void 0!==a?a:d?d.getDelay():void 0,_=()=>{0!==q&&0==--q&&((()=>{ln(),P.forEach(n=>{n()}),j.forEach(n=>{n()}),(()=>{const i=k,t=C,e=E;I.forEach(a=>{const o=a.classList;o.add(...i),o.remove(...t);for(const i in e)e.hasOwnProperty(i)&&n(a,i,e[i])})})();const i=T;D.forEach(n=>{n.callback(i,p)}),W.forEach(n=>{n.callback(i,p)}),W.length=0,w=!0,R=!0})(),d&&d.animationFinish())},nn=(i=!0)=>{K.forEach(n=>{n()}),O.forEach(n=>{n()}),(()=>{const i=g,t=$,e=F;I.forEach(a=>{const o=a.classList;o.add(...i),o.remove(...t);for(const i in e)e.hasOwnProperty(i)&&n(a,i,e[i])})})(),A.length>0&&(B?(I.forEach(n=>{const i=n.animate(A,{delay:Z(),duration:X(),easing:V(),iterations:Y(),fill:Q(),direction:U()});i.pause(),z.push(i)}),G().length>0&&(z[0].onfinish=()=>{_()})):((i=!0)=>{N(),I.forEach(e=>{if(A.length>0){const a=((n=[])=>n.map(n=>{const i=n.offset,t=[];for(const e in n)n.hasOwnProperty(e)&&"offset"!==e&&t.push(`${e}: ${n[e]};`);return`${100*i}% { ${t.join(" ")} }`}).join(" "))(A),o=((n,i,t)=>{const e=(n=>{const i=n.getRootNode();return i.head||i})(t),a=e.querySelector("#"+n);if(a)return a;const o=(t.ownerDocument||document).createElement("style");return o.id=n,o.innerHTML=`@keyframes ${n} { ${i} } @keyframes ${n}-alt { ${i} }`,e.appendChild(o),o})(y=(n=>{let i=t.indexOf(n);return i<0&&(i=t.push(n)-1),`ion-animation-${i}`})(a),a,e);x.push(o),n(e,"animation-duration",void 0!==X()?`${X()}ms`:null),n(e,"animation-timing-function",V()||null),n(e,"animation-delay",void 0!==Z()?`${Z()}ms`:null),n(e,"animation-fill-mode",Q()||null),n(e,"animation-direction",U()||null);const r=void 0!==Y()?Y()===1/0?"infinite":Y().toString():null;n(e,"animation-iteration-count",r),n(e,"animation-play-state","paused"),i&&n(e,"animation-name",`${o.id}-alt`),requestAnimationFrame(()=>{n(e,"animation-name",o.id||null)})}})})(i)),b=!0},tn=i=>{if(i=Math.min(Math.max(i,0),.999),B)G().forEach(n=>{n.currentTime=n.effect.getComputedTiming().delay+X()*i,n.pause()});else{const t=`-${(Z()||0)+X()*i}ms`;I.forEach(i=>{A.length>0&&(n(i,"animation-delay",t),n(i,"animation-play-state","paused"))})}},en=(i=!0)=>{I.forEach(t=>{requestAnimationFrame(()=>{n(t,"animation-name",y||null),n(t,"animation-duration",void 0!==X()?`${X()}ms`:null),n(t,"animation-timing-function",V()||null),n(t,"animation-delay",void 0!==Z()?`${Z()}ms`:null),n(t,"animation-fill-mode",Q()||null),n(t,"animation-direction",U()||null);const e=void 0!==Y()?Y()===1/0?"infinite":Y().toString():null;n(t,"animation-iteration-count",e),i&&n(t,"animation-name",`${y}-alt`),requestAnimationFrame(()=>{n(t,"animation-name",y||null)})})})},an=(n=!1,i=!0)=>(n&&M.forEach(i=>{i.update(n)}),B?G().forEach(n=>{n.effect.updateTiming({delay:Z(),duration:X(),easing:V(),iterations:Y(),fill:Q(),direction:U()})}):en(i),p),on=()=>{b&&(B?G().forEach(n=>{n.pause()}):I.forEach(i=>{n(i,"animation-play-state","paused")}))},rn=()=>{u=void 0,_()},ln=()=>{u&&clearTimeout(u)},sn=()=>(b||nn(),R&&(B?tn(0):en(),R=!1),w&&(q=M.length+1,w=!1),M.forEach(n=>{n.play()}),B?(G().forEach(n=>{n.play()}),0!==A.length&&0!==I.length||_()):(()=>{if(ln(),I.forEach(i=>{A.length>0&&requestAnimationFrame(()=>{n(i,"animation-play-state","running")})}),0===A.length||0===I.length)_();else{const n=Z()||0,t=X()||0;u=setTimeout(rn,n+t+100),(n=>{let t;const e={passive:!0},a=e=>{n===e.target&&(t&&t(),ln(),requestAnimationFrame(()=>{I.forEach(n=>{i(n,"animation-duration"),i(n,"animation-delay"),i(n,"animation-play-state")}),requestAnimationFrame(()=>{_()})}))};n&&(n.addEventListener("webkitAnimationEnd",a,e),n.addEventListener("animationend",a,e),t=()=>{n.removeEventListener("webkitAnimationEnd",a,e),n.removeEventListener("animationend",a,e)})})(I[0])}})(),p),mn=(n,i)=>{const t=A[0];return null==t||void 0!==t.offset&&0!==t.offset?A=[{offset:0,[n]:i},...A]:t[n]=i,p};return p={parentAnimation:d,elements:I,childAnimations:M,animationFinish:_,from:mn,to:(n,i)=>{const t=A[A.length-1];return null==t||void 0!==t.offset&&1!==t.offset?A=[...A,{offset:1,[n]:i}]:t[n]=i,p},fromTo:(n,i,t)=>mn(n,i).to(n,t),parent:n=>(d=n,p),play:sn,playAsync:()=>new Promise(n=>(H(n,{oneTimeCallback:!0}),sn(),p)),playSync:()=>(h=!0,H(()=>h=!1,{oneTimeCallback:!0}),sn(),p),pause:()=>(M.forEach(n=>{n.pause()}),on(),p),stop:()=>(M.forEach(n=>{n.stop()}),b&&(L(),b=!1),p),destroy:()=>(M.forEach(n=>{n.destroy()}),L(),N(),I.length=0,M.length=0,A.length=0,J(),b=!1,w=!0,p),keyframes:n=>(A=n,p),addAnimation:n=>{if(null!=n){const i=p,t=n;if(t.length>=0)for(const n of t)n.parent(i),M.push(n);else n.parent(i),M.push(n)}return p},addElement:n=>{if(null!=n)if(1===n.nodeType)I.push(n);else if(n.length>=0)for(let i=0;i<n.length;i++)I.push(n[i]);else console.error("Invalid addElement value");return p},update:an,fill:n=>(s=n,an(!0),p),direction:n=>(m=n,an(!0),p),iterations:n=>(l=n,an(!0),p),duration:n=>(o=n,an(!0),p),easing:n=>(r=n,an(!0),p),delay:n=>(a=n,an(!0),p),getWebAnimations:G,getKeyframes:()=>A,getFill:Q,getDirection:U,getDelay:Z,getIterations:Y,getEasing:V,getDuration:X,afterAddRead:n=>(P.push(n),p),afterAddWrite:n=>(j.push(n),p),afterClearStyles:(n=[])=>{for(const i of n)E[i]="";return p},afterStyles:(n={})=>(E=n,p),afterRemoveClass:n=>(C=e(C,n),p),afterAddClass:n=>(k=e(k,n),p),beforeAddRead:n=>(K.push(n),p),beforeAddWrite:n=>(O.push(n),p),beforeClearStyles:(n=[])=>{for(const i of n)F[i]="";return p},beforeStyles:(n={})=>(F=n,p),beforeRemoveClass:n=>($=e($,n),p),beforeAddClass:n=>(g=e(g,n),p),onFinish:H,clearOnFinish:J,progressStart:(n=!1)=>(M.forEach(i=>{i.progressStart(n)}),on(),S=n,b?(an(),tn(0)):nn(),p),progressStep:n=>(M.forEach(i=>{i.progressStep(n)}),void 0!==X()&&tn(n),p),progressEnd:(n,i,t)=>(S=!1,M.forEach(e=>{e.progressEnd(n,i,t)}),void 0!==t&&(c=t),R=!1,T=n,n?B||(v=i*X()*-1,an(!1,!1)):(f="reverse"===U()?"normal":"reverse",B?(an(),tn(1-i)):(v=(1-i)*X()*-1,an(!1,!1))),H(()=>{T=!0,c=void 0,f=void 0,v=void 0},{oneTimeCallback:!0}),d||sn(),p)}};export{a as c};