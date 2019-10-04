var __spreadArrays=this&&this.__spreadArrays||function(){for(var n=0,r=0,e=arguments.length;r<e;r++)n+=arguments[r].length;for(var t=Array(n),i=0,r=0;r<e;r++)for(var a=arguments[r],f=0,o=a.length;f<o;f++,i++)t[i]=a[f];return t};System.register([],(function(n){"use strict";return{execute:function(){var r=function(n,r,e){n.style.setProperty(r,e)};var e=function(n,r){n.style.removeProperty(r)};var t=function(n,r){var e;var t={passive:true};var i=function(){if(e){e()}};var a=function(e){if(n===e.target){i();r(e)}};if(n){n.addEventListener("webkitAnimationEnd",a,t);n.addEventListener("animationend",a,t);e=function(){n.removeEventListener("webkitAnimationEnd",a,t);n.removeEventListener("animationend",a,t)}}return i};var i=function(n){if(n===void 0){n=[]}return n.map((function(n){var r=n.offset;var e=[];for(var t in n){if(n.hasOwnProperty(t)&&t!=="offset"){e.push(t+": "+n[t]+";")}}return r*100+"% { "+e.join(" ")+" }"})).join(" ")};var a=[];var f=function(n){var r=a.indexOf(n);if(r<0){r=a.push(n)-1}return"ion-animation-"+r};var o=function(n){var r=n.getRootNode();return r.head||r};var u=function(n,r,e){var t=o(e);var i=t.querySelector("#"+n);if(i){return i}var a=(e.ownerDocument||document).createElement("style");a.id=n;a.innerHTML="@keyframes "+n+" { "+r+" } @keyframes "+n+"-alt { "+r+" }";t.appendChild(a);return a};var c=function(n,r){if(n===void 0){n=[]}if(r!==undefined){var e=Array.isArray(r)?r:[r];return __spreadArrays(n,e)}return n};var v=n("c",(function(){var n;var a;var o;var v;var l;var s;var d=[];var m=[];var h=[];var p=false;var g;var y={};var E=[];var A=[];var b={};var C=0;var F=false;var S=false;var k;var T;var _;var q;var w=true;var D=false;var L=true;var P;var I;var O=[];var R=[];var x=[];var M=[];var N=[];var W=[];var j=[];var H=[];var K=[];var z=[];var B=typeof Element==="function"&&typeof Element.prototype.animate==="function";var G=100;var J=function(){return z};var Q=function(){M.forEach((function(n){n.destroy()}));U();x.length=0;M.length=0;d.length=0;X();p=false;L=true;return I};var U=function(){Y();Z()};var V=function(n,r){var e=r&&r.oneTimeCallback?R:O;e.push({callback:n,opts:r});return I};var X=function(){O.length=0;R.length=0;return I};var Y=function(){if(B){J().forEach((function(n){n.cancel()}));z.length=0}else{x.forEach((function(n){requestAnimationFrame((function(){e(n,"animation-name");e(n,"animation-duration");e(n,"animation-timing-function");e(n,"animation-iteration-count");e(n,"animation-delay");e(n,"animation-play-state");e(n,"animation-fill-mode");e(n,"animation-direction")}))}))}};var Z=function(){N.forEach((function(n){if(n&&n.parentNode){n.parentNode.removeChild(n)}}));N.length=0};var $=function(n){W.push(n);return I};var nn=function(n){j.push(n);return I};var rn=function(n){H.push(n);return I};var en=function(n){K.push(n);return I};var tn=function(n){m=c(m,n);return I};var an=function(n){h=c(h,n);return I};var fn=function(n){if(n===void 0){n={}}y=n;return I};var on=function(n){if(n===void 0){n=[]}for(var r=0,e=n;r<e.length;r++){var t=e[r];y[t]=""}return I};var un=function(n){E=c(E,n);return I};var cn=function(n){A=c(A,n);return I};var vn=function(n){if(n===void 0){n={}}b=n;return I};var ln=function(n){if(n===void 0){n=[]}for(var r=0,e=n;r<e.length;r++){var t=e[r];b[t]=""}return I};var sn=function(){if(l!==undefined){return l}if(g){return g.getFill()}return undefined};var dn=function(){if(T!==undefined){return T}if(s!==undefined){return s}if(g){return g.getDirection()}return undefined};var mn=function(){if(F){return"linear"}if(o!==undefined){return o}if(g){return g.getEasing()}return undefined};var hn=function(){if(S){return 0}if(_!==undefined){return _}if(a!==undefined){return a}if(g){return g.getDuration()}return undefined};var pn=function(){if(v!==undefined){return v}if(g){return g.getIterations()}return undefined};var gn=function(){if(q!==undefined){return q}if(n!==undefined){return n}if(g){return g.getDelay()}return undefined};var yn=function(){return d};var En=function(n){s=n;Bn(true);return I};var An=function(n){l=n;Bn(true);return I};var bn=function(r){n=r;Bn(true);return I};var Cn=function(n){o=n;Bn(true);return I};var Fn=function(n){a=n;Bn(true);return I};var Sn=function(n){v=n;Bn(true);return I};var kn=function(n){g=n;return I};var Tn=function(n){if(n!=null){if(n.nodeType===1){x.push(n)}else if(n.length>=0){for(var r=0;r<n.length;r++){x.push(n[r])}}else{console.error("Invalid addElement value")}}return I};var _n=function(n){if(n!=null){var r=I;var e=n;if(e.length>=0){for(var t=0,i=e;t<i.length;t++){var a=i[t];a.parent(r);M.push(a)}}else{n.parent(r);M.push(n)}}return I};var qn=function(n){d=n;return I};var wn=function(){W.forEach((function(n){n()}))};var Dn=function(){j.forEach((function(n){n()}))};var Ln=function(){var n=m;var e=h;var t=y;x.forEach((function(i){var a=i.classList;a.add.apply(a,n);a.remove.apply(a,e);for(var f in t){if(t.hasOwnProperty(f)){r(i,f,t[f])}}}))};var Pn=function(){wn();Dn();Ln()};var In=function(){H.forEach((function(n){n()}))};var On=function(){K.forEach((function(n){n()}))};var Rn=function(){var n=E;var e=A;var t=b;x.forEach((function(i){var a=i.classList;a.add.apply(a,n);a.remove.apply(a,e);for(var f in t){if(t.hasOwnProperty(f)){r(i,f,t[f])}}}))};var xn=function(){$n();In();On();Rn();var n=w;O.forEach((function(r){r.callback(n,I)}));R.forEach((function(r){r.callback(n,I)}));R.length=0;L=true;D=true};var Mn=function(){if(C===0){return}C--;if(C===0){xn();if(g){g.animationFinish()}}};var Nn=function(n){if(n===void 0){n=true}Z();x.forEach((function(e){if(d.length>0){var t=i(d);P=f(t);var a=u(P,t,e);N.push(a);r(e,"animation-duration",hn()!==undefined?hn()+"ms":null);r(e,"animation-timing-function",mn()||null);r(e,"animation-delay",gn()!==undefined?gn()+"ms":null);r(e,"animation-fill-mode",sn()||null);r(e,"animation-direction",dn()||null);var o=pn()!==undefined?pn()===Infinity?"infinite":pn().toString():null;r(e,"animation-iteration-count",o);r(e,"animation-play-state","paused");if(n){r(e,"animation-name",a.id+"-alt")}requestAnimationFrame((function(){r(e,"animation-name",a.id||null)}))}}))};var Wn=function(){x.forEach((function(n){var r=n.animate(d,{delay:gn(),duration:hn(),easing:mn(),iterations:pn(),fill:sn(),direction:dn()});r.pause();z.push(r)}));if(J().length>0){z[0].onfinish=function(){Mn()}}};var jn=function(n){if(n===void 0){n=true}Pn();if(d.length>0){if(B){Wn()}else{Nn(n)}}p=true};var Hn=function(n){n=Math.min(Math.max(n,0),.999);if(B){J().forEach((function(r){r.currentTime=r.effect.getComputedTiming().delay+hn()*n;r.pause()}))}else{var e=gn()||0;var t="-"+(e+hn()*n)+"ms";x.forEach((function(n){if(d.length>0){r(n,"animation-delay",t);r(n,"animation-play-state","paused")}}))}};var Kn=function(){J().forEach((function(n){n.effect.updateTiming({delay:gn(),duration:hn(),easing:mn(),iterations:pn(),fill:sn(),direction:dn()})}))};var zn=function(n){if(n===void 0){n=true}x.forEach((function(e){requestAnimationFrame((function(){r(e,"animation-name",P||null);r(e,"animation-duration",hn()!==undefined?hn()+"ms":null);r(e,"animation-timing-function",mn()||null);r(e,"animation-delay",gn()!==undefined?gn()+"ms":null);r(e,"animation-fill-mode",sn()||null);r(e,"animation-direction",dn()||null);var t=pn()!==undefined?pn()===Infinity?"infinite":pn().toString():null;r(e,"animation-iteration-count",t);if(n){r(e,"animation-name",P+"-alt")}requestAnimationFrame((function(){r(e,"animation-name",P||null)}))}))}))};var Bn=function(n,r){if(n===void 0){n=false}if(r===void 0){r=true}if(n){M.forEach((function(r){r.update(n)}))}if(B){Kn()}else{zn(r)}return I};var Gn=function(n){if(n===void 0){n=false}M.forEach((function(r){r.progressStart(n)}));Un();F=n;if(!p){jn()}else{Bn();Hn(0)}return I};var Jn=function(n){M.forEach((function(r){r.progressStep(n)}));if(hn()!==undefined){Hn(n)}return I};var Qn=function(n,r,e){F=false;M.forEach((function(t){t.progressEnd(n,r,e)}));if(e!==undefined){_=e}D=false;w=n;if(!n){T=dn()==="reverse"?"normal":"reverse";if(B){Bn();Hn(1-r)}else{q=(1-r)*hn()*-1;Bn(false,false)}}else{if(!B){q=r*hn()*-1;Bn(false,false)}}V((function(){w=true;_=undefined;T=undefined;q=undefined}),{oneTimeCallback:true});if(!g){ir()}return I};var Un=function(){if(p){if(B){J().forEach((function(n){n.pause()}))}else{x.forEach((function(n){r(n,"animation-play-state","paused")}))}}};var Vn=function(){M.forEach((function(n){n.pause()}));Un();return I};var Xn=function(){return new Promise((function(n){V(n,{oneTimeCallback:true});ir();return I}))};var Yn=function(){S=true;V((function(){return S=false}),{oneTimeCallback:true});ir();return I};var Zn=function(){k=undefined;Mn()};var $n=function(){if(k){clearTimeout(k)}};var nr=function(){$n();x.forEach((function(n){if(d.length>0){requestAnimationFrame((function(){r(n,"animation-play-state","running")}))}}));if(d.length===0||x.length===0){Mn()}else{var n=gn()||0;var e=hn()||0;k=setTimeout(Zn,n+e+G);t(x[0],(function(){$n();requestAnimationFrame((function(){rr();requestAnimationFrame((function(){Mn()}))}))}))}};var rr=function(){x.forEach((function(n){e(n,"animation-duration");e(n,"animation-delay");e(n,"animation-play-state")}))};var er=function(){J().forEach((function(n){n.play()}));if(d.length===0||x.length===0){Mn()}};var tr=function(){if(B){Hn(0)}else{zn()}};var ir=function(){if(!p){jn()}if(D){tr();D=false}if(L){C=M.length+1;L=false}M.forEach((function(n){n.play()}));if(B){er()}else{nr()}return I};var ar=function(){M.forEach((function(n){n.stop()}));if(p){Y();p=false}return I};var fr=function(n,r){var e;var t=d[0];if(t!=null&&(t.offset===undefined||t.offset===0)){t[n]=r}else{d=__spreadArrays([(e={offset:0},e[n]=r,e)],d)}return I};var or=function(n,r){var e;var t=d[d.length-1];if(t!=null&&(t.offset===undefined||t.offset===1)){t[n]=r}else{d=__spreadArrays(d,[(e={offset:1},e[n]=r,e)])}return I};var ur=function(n,r,e){return fr(n,r).to(n,e)};return I={parentAnimation:g,elements:x,childAnimations:M,animationFinish:Mn,from:fr,to:or,fromTo:ur,parent:kn,play:ir,playAsync:Xn,playSync:Yn,pause:Vn,stop:ar,destroy:Q,keyframes:qn,addAnimation:_n,addElement:Tn,update:Bn,fill:An,direction:En,iterations:Sn,duration:Fn,easing:Cn,delay:bn,getWebAnimations:J,getKeyframes:yn,getFill:sn,getDirection:dn,getDelay:gn,getIterations:pn,getEasing:mn,getDuration:hn,afterAddRead:rn,afterAddWrite:en,afterClearStyles:ln,afterStyles:vn,afterRemoveClass:cn,afterAddClass:un,beforeAddRead:$,beforeAddWrite:nn,beforeClearStyles:on,beforeStyles:fn,beforeRemoveClass:an,beforeAddClass:tn,onFinish:V,clearOnFinish:X,progressStart:Gn,progressStep:Jn,progressEnd:Qn}}))}}}));