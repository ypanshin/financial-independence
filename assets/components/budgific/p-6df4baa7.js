import{c as t}from"./p-b73aafdf.js";const o=t=>t.shadowRoot||t,n=(n,a)=>{try{const s=540,r="cubic-bezier(0.32,0.72,0,1)",e="opacity",i="transform",c="0%",l=.8,f="rtl"===n.ownerDocument.dir,X=f?"-99.5%":"99.5%",p=f?"33%":"-33%",b=a.enteringEl,$=a.leavingEl,m="back"===a.direction,u=b.querySelector(":scope > ion-content"),g=b.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),y=b.querySelectorAll(":scope > ion-header > ion-toolbar"),d=t(),h=t();if(d.addElement(b).duration(a.duration||s).easing(a.easing||r).fill("both").beforeRemoveClass("ion-page-invisible"),$&&n){const o=t();o.addElement(n),d.addAnimation(o)}if(u||0!==y.length||0!==g.length?(h.addElement(u),h.addElement(g)):h.addElement(b.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),d.addAnimation(h),m?h.beforeClearStyles([e]).fromTo("transform",`translateX(${p})`,`translateX(${c})`).fromTo(e,l,1):h.beforeClearStyles([e]).fromTo("transform",`translateX(${X})`,`translateX(${c})`),u){const n=o(u).querySelector(".transition-effect");if(n){const o=n.querySelector(".transition-cover"),a=n.querySelector(".transition-shadow"),s=t(),r=t(),i=t();s.addElement(n).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),r.addElement(o).beforeClearStyles([e]).fromTo(e,0,.1),i.addElement(a).beforeClearStyles([e]).fromTo(e,.03,.7),s.addAnimation([r,i]),h.addAnimation([s])}}if(y.forEach(n=>{const a=t();a.addElement(n),d.addAnimation(a);const s=t();s.addElement(n.querySelector("ion-title"));const r=t();r.addElement(n.querySelectorAll("ion-buttons,[menuToggle]"));const i=t();i.addElement(n.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])"));const l=t();l.addElement(o(n).querySelector(".toolbar-background"));const b=t(),$=n.querySelector("ion-back-button");if($&&b.addElement($),a.addAnimation([s,r,i,l,b]),s.fromTo(e,.01,1),r.fromTo(e,.01,1),i.fromTo(e,.01,1),m)s.fromTo("transform",`translateX(${p})`,`translateX(${c})`),i.fromTo("transform",`translateX(${p})`,`translateX(${c})`),b.fromTo(e,.01,1);else if(s.fromTo("transform",`translateX(${X})`,`translateX(${c})`),i.fromTo("transform",`translateX(${X})`,`translateX(${c})`),l.beforeClearStyles([e]).keyframes([{offset:0,opacity:.01},{offset:.99,opacity:1},{offset:1,opacity:"var(--opacity)"}]),b.fromTo(e,.01,1),$){const n=t();n.addElement(o($).querySelector(".button-text")).fromTo("transform",f?"translateX(-100px)":"translateX(100px)","translateX(0px)"),a.addAnimation(n)}}),$){const n=t(),a=$.querySelector(":scope > ion-content");if(n.addElement(a),n.addElement($.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),d.addAnimation(n),m?n.beforeClearStyles([e]).fromTo("transform",`translateX(${c})`,f?"translateX(-100%)":"translateX(100%)"):n.fromTo("transform",`translateX(${c})`,`translateX(${p})`).fromTo(e,1,l),a){const s=o(a).querySelector(".transition-effect");if(s){const o=s.querySelector(".transition-cover"),a=s.querySelector(".transition-shadow"),r=t(),i=t(),c=t();r.addElement(s).beforeStyles({opacity:"1"}).afterStyles({opacity:""}),i.addElement(o).beforeClearStyles([e]).fromTo(e,.1,0),c.addElement(a).beforeClearStyles([e]).fromTo(e,.7,.03),r.addAnimation([i,c]),n.addAnimation([r])}}$.querySelectorAll(":scope > ion-header > ion-toolbar").forEach(n=>{const a=t();a.addElement(n);const s=t();s.addElement(n.querySelector("ion-title"));const r=t();r.addElement(n.querySelectorAll("ion-buttons,[menuToggle]"));const l=t(),X=n.querySelectorAll(":scope > *:not(ion-title):not(ion-buttons):not([menuToggle])");X.length>0&&l.addElement(X);const b=t();b.addElement(o(n).querySelector(".toolbar-background"));const $=t(),u=n.querySelector("ion-back-button");if(u&&$.addElement(u),a.addAnimation([s,r,l,$,b]),d.addAnimation(a),$.fromTo(e,.99,0),s.fromTo(e,.99,0),r.fromTo(e,.99,0),l.fromTo(e,.99,0),m){if(s.fromTo("transform",`translateX(${c})`,f?"translateX(-100%)":"translateX(100%)"),l.fromTo("transform",`translateX(${c})`,f?"translateX(-100%)":"translateX(100%)"),b.beforeClearStyles([e]).fromTo(e,1,.01),u){const n=t();n.addElement(o(u).querySelector(".button-text")),n.fromTo("transform",`translateX(${c})`,`translateX(${(f?-124:124)+"px"})`),a.addAnimation(n)}}else s.fromTo("transform",`translateX(${c})`,`translateX(${p})`).afterClearStyles([i]),l.fromTo("transform",`translateX(${c})`,`translateX(${p})`).afterClearStyles([i,e]),$.afterClearStyles([e]),s.afterClearStyles([e]),r.afterClearStyles([e])})}return d}catch(s){throw s}};export{n as iosTransitionAnimation,o as shadow};