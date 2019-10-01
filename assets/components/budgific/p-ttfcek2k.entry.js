import{r as t,c as e,e as i,h as s,H as n,d as r}from"./p-b55b59e7.js";import{f as a}from"./p-65e7e55d.js";import{h as o}from"./p-f1a4df63.js";import{c as h,f as d,r as l}from"./p-bcaf9fe8.js";const u=(t,e,i,s)=>{if(t!==T&&t!==I){if(t===J)return void 0!==i&&void 0!==i.hour?i.hour<12?"AM":"PM":e?e.toUpperCase():"";if(t===P)return void 0!==i&&void 0!==i.hour?i.hour<12?"am":"pm":e||"";if(null==e)return"";if(t===Y||t===N||t===O||t===A||t===j||t===H)return k(e);if(t===$)return w(e);if(t===C)return(s.monthNames?s.monthNames:Z)[e-1];if(t===S)return(s.monthShortNames?s.monthShortNames:_)[e-1];if(t===E||t===F){if(0===e)return"12";if(e>12&&(e-=12),t===E&&e<10)return"0"+e}return e.toString()}try{return e=new Date(i.year,i.month-1,i.day).getDay(),t===T?(s.dayNames?s.dayNames:L)[e]:(s.dayShortNames?s.dayShortNames:W)[e]}catch(t){}},f=(t,e,i,s=0,n=0)=>parseInt(`1${w(t)}${k(e)}${k(i)}${k(s)}${k(n)}`,10),m=t=>f(t.year,t.month,t.day,t.hour,t.minute),c=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,v=/^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,p=t=>{let e=null;if(null!=t&&""!==t&&((e=v.exec(t))?(e.unshift(void 0,void 0),e[2]=e[3]=void 0):e=c.exec(t)),null===e)return;for(let t=1;t<8;t++)e[t]=void 0!==e[t]?parseInt(e[t],10):void 0;let i=0;return e[9]&&e[10]&&(i=60*parseInt(e[10],10),e[11]&&(i+=parseInt(e[11],10)),"-"===e[9]&&(i*=-1)),{year:e[1],month:e[2],day:e[3],hour:e[4],minute:e[5],second:e[6],millisecond:e[7],tzOffset:i}},y=(t,e)=>e===J||e===P?t.hour<12?"am":"pm":e===E||e===F?t.hour>12?t.hour-12:0===t.hour?12:t.hour:t[M(e)],M=t=>{for(const e in V)if(V[e].f===t)return V[e].k},D=t=>{let e="";return void 0!==t.year?(e=w(t.year),void 0!==t.month&&(e+="-"+k(t.month),void 0!==t.day&&(e+="-"+k(t.day),void 0!==t.hour&&(e+=`T${k(t.hour)}:${k(t.minute)}:${k(t.second)}`,t.millisecond>0&&(e+="."+x(t.millisecond)),e+=void 0===t.tzOffset?"Z":(t.tzOffset>0?"+":"-")+k(Math.floor(Math.abs(t.tzOffset/60)))+":"+k(t.tzOffset%60))))):void 0!==t.hour&&(e=k(t.hour)+":"+k(t.minute),void 0!==t.second&&(e+=":"+k(t.second),void 0!==t.millisecond&&(e+="."+x(t.millisecond)))),e},b=(t,e)=>{if(null==t)return;let i;return"string"==typeof t&&(t=t.replace(/\[|\]/g,"").split(",")),Array.isArray(t)&&(i=t.map(t=>t.toString().trim())),void 0!==i&&0!==i.length||console.warn(`Invalid "${e}Names". Must be an array of strings, or a comma separated string.`),i},g=(t,e)=>{let i;return"string"==typeof t&&(t=t.replace(/\[|\]|\s/g,"").split(",")),0===(i=Array.isArray(t)?t.map(t=>parseInt(t,10)).filter(isFinite):[t]).length&&console.warn(`Invalid "${e}Values". Must be an array of numbers, or a comma separated string of numbers.`),i},k=t=>("0"+(void 0!==t?Math.abs(t):"0")).slice(-2),x=t=>("00"+(void 0!==t?Math.abs(t):"0")).slice(-3),w=t=>("000"+(void 0!==t?Math.abs(t):"0")).slice(-4),$="YYYY",Y="YY",C="MMMM",S="MMM",N="MM",T="DDDD",I="DDD",O="DD",A="HH",E="hh",F="h",j="mm",H="ss",J="A",P="a",V=[{f:$,k:"year"},{f:C,k:"month"},{f:T,k:"day"},{f:S,k:"month"},{f:I,k:"day"},{f:Y,k:"year"},{f:N,k:"month"},{f:O,k:"day"},{f:A,k:"hour"},{f:E,k:"hour"},{f:j,k:"minute"},{f:H,k:"second"},{f:"M",k:"month"},{f:"D",k:"day"},{f:"H",k:"hour"},{f:F,k:"hour"},{f:"m",k:"minute"},{f:"s",k:"second"},{f:J,k:"ampm"},{f:P,k:"ampm"}],L=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],W=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Z=["January","February","March","April","May","June","July","August","September","October","November","December"],_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B=[E,F,j,"m",H,"s"],R=class{constructor(i){t(this,i),this.inputId=`ion-dt-${q++}`,this.locale={},this.datetimeMin={},this.datetimeMax={},this.datetimeValue={},this.isExpanded=!1,this.name=this.inputId,this.disabled=!1,this.readonly=!1,this.displayFormat="MMM D, YYYY",this.cancelText="Cancel",this.doneText="Done",this.onClick=()=>{this.setFocus(),this.open()},this.onFocus=()=>{this.ionFocus.emit()},this.onBlur=()=>{this.ionBlur.emit()},this.ionCancel=e(this,"ionCancel",7),this.ionChange=e(this,"ionChange",7),this.ionFocus=e(this,"ionFocus",7),this.ionBlur=e(this,"ionBlur",7),this.ionStyle=e(this,"ionStyle",7)}disabledChanged(){this.emitStyle()}valueChanged(){this.updateDatetimeValue(this.value),this.emitStyle(),this.ionChange.emit({value:this.value})}componentWillLoad(){this.locale={monthNames:b(this.monthNames,"monthNames"),monthShortNames:b(this.monthShortNames,"monthShortNames"),dayNames:b(this.dayNames,"dayNames"),dayShortNames:b(this.dayShortNames,"dayShortNames")},this.updateDatetimeValue(this.value),this.emitStyle()}async open(){if(this.disabled||this.isExpanded)return;const t=this.generatePickerOptions(),e=await a.create(t);this.isExpanded=!0,e.onDidDismiss().then(()=>{this.isExpanded=!1,this.setFocus()}),e.addEventListener("ionPickerColChange",async t=>{const i=t.detail,s={};s[i.name]={value:i.options[i.selectedIndex].value},this.updateDatetimeValue(s),e.columns=this.generateColumns()}),await e.present()}emitStyle(){this.ionStyle.emit({interactive:!0,datetime:!0,"has-placeholder":null!=this.placeholder,"has-value":this.hasValue(),"interactive-disabled":this.disabled})}updateDatetimeValue(t){((t,e)=>{if(!e||"string"==typeof e){const t=((t="")=>{null==t&&(t=""),10!==t.length&&7!==t.length||(t+=" ");const e="string"==typeof t&&t.length>0?new Date(t):new Date;return new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()))})(e);Number.isNaN(t.getTime())||(e=t.toISOString())}if(e&&""!==e){if("string"==typeof e){if(e=p(e))return Object.assign(t,e),!0}else{if(e.year||e.hour||e.month||e.day||e.minute||e.second){e.ampm&&e.hour&&(e.hour.value="pm"===e.ampm.value?12===e.hour.value?12:e.hour.value+12:12===e.hour.value?0:e.hour.value);for(const i of Object.keys(e))t[i]=e[i].value;return!0}if(e.ampm)return e.hour={value:e.hour?e.hour.value:"pm"===e.ampm.value?t.hour<12?t.hour+12:t.hour:t.hour>=12?t.hour-12:t.hour},t.hour=e.hour.value,!0}console.warn(`Error parsing date: "${e}". Please provide a valid ISO 8601 datetime format: https://www.w3.org/TR/NOTE-datetime`)}else for(const e in t)t.hasOwnProperty(e)&&delete t[e]})(this.datetimeValue,t)}generatePickerOptions(){const t=i(this),e=Object.assign({mode:t},this.pickerOptions,{columns:this.generateColumns()}),s=e.buttons;return s&&0!==s.length||(e.buttons=[{text:this.cancelText,role:"cancel",handler:()=>{this.updateDatetimeValue(this.value),this.ionCancel.emit()}},{text:this.doneText,handler:t=>{this.updateDatetimeValue(t);const e=new Date(D(this.datetimeValue));this.datetimeValue.tzOffset=-1*e.getTimezoneOffset(),this.value=D(this.datetimeValue)}}]),e}generateColumns(){let t=this.pickerFormat||this.displayFormat||X;if(0===t.length)return[];this.calcMinMax(),-1===(t=t.replace("DDDD","{~}").replace("DDD","{~}")).indexOf("D")&&(t=t.replace("{~}","D"));const e=(t=>{const e=[];t=t.replace(/[^\w\s]/gi," "),V.forEach(e=>{e.f.length>1&&t.indexOf(e.f)>-1&&t.indexOf(e.f+e.f.charAt(0))<0&&(t=t.replace(e.f," "+e.f+" "))});const i=t.split(" ").filter(t=>t.length>0);return i.forEach((t,s)=>{V.forEach(n=>{if(t===n.f){if((t===J||t===P)&&(e.indexOf(F)<0&&e.indexOf(E)<0||-1===B.indexOf(i[s-1])))return;e.push(t)}})}),e})(t=t.replace(/{~}/g,"")).map(t=>{const e=M(t);let i;const s=(i=this[e+"Values"]?g(this[e+"Values"],e):((t,e,i)=>{const s=[];if(t===$||t===Y){if(void 0===i.year||void 0===e.year)throw new Error("min and max year is undefined");for(let t=i.year;t>=e.year;t--)s.push(t)}else if(t===C||t===S||t===N||"M"===t||t===E||t===F)for(let t=1;t<13;t++)s.push(t);else if(t===T||t===I||t===O||"D"===t)for(let t=1;t<32;t++)s.push(t);else if(t===A||"H"===t)for(let t=0;t<24;t++)s.push(t);else if(t===j||"m"===t)for(let t=0;t<60;t++)s.push(t);else if(t===H||"s"===t)for(let t=0;t<60;t++)s.push(t);else t!==J&&t!==P||s.push("am","pm");return s})(t,this.datetimeMin,this.datetimeMax)).map(e=>({value:e,text:u(t,e,void 0,this.locale)})),n=((t,e)=>{const i=y(this.datetimeValue,e);if(void 0!==i)return i;const s=p((new Date).toISOString());return y(s,e)})(0,t),r=s.findIndex(t=>t.value===n);return{name:e,selectedIndex:r>=0?r:0,options:s}}),i=this.datetimeMin,s=this.datetimeMax;return["month","day","hour","minute"].filter(t=>!e.find(e=>e.name===t)).forEach(t=>{i[t]=0,s[t]=0}),this.validateColumns(z(e))}validateColumns(t){const e=new Date,i=m(this.datetimeMin),s=m(this.datetimeMax),n=t.find(t=>"year"===t.name);let r=e.getFullYear();if(n){n.options.find(t=>t.value===e.getFullYear())||(r=n.options[0].value);const t=n.selectedIndex;if(void 0!==t){const e=n.options[t];e&&(r=e.value)}}const a=this.validateColumn(t,"month",1,i,s,[r,0,0,0,0],[r,12,31,23,59]),o=((t,e)=>4===t||6===t||9===t||11===t?30:2===t?(t=>t%4==0&&t%100!=0||t%400==0)(e)?29:28:31)(a,r),h=this.validateColumn(t,"day",2,i,s,[r,a,0,0,0],[r,a,o,23,59]),d=this.validateColumn(t,"hour",3,i,s,[r,a,h,0,0],[r,a,h,23,59]);return this.validateColumn(t,"minute",4,i,s,[r,a,h,d,0],[r,a,h,d,59]),t}calcMinMax(){const t=(new Date).getFullYear();if(void 0!==this.yearValues){const t=g(this.yearValues,"year");void 0===this.min&&(this.min=Math.min(...t).toString()),void 0===this.max&&(this.max=Math.max(...t).toString())}else void 0===this.min&&(this.min=(t-100).toString()),void 0===this.max&&(this.max=t.toString());const e=this.datetimeMin=p(this.min),i=this.datetimeMax=p(this.max);e.year=e.year||t,i.year=i.year||t,e.month=e.month||1,i.month=i.month||12,e.day=e.day||1,i.day=i.day||31,e.hour=e.hour||0,i.hour=i.hour||23,e.minute=e.minute||0,i.minute=i.minute||59,e.second=e.second||0,i.second=i.second||59,e.year>i.year&&(console.error("min.year > max.year"),e.year=i.year-100),e.year===i.year&&(e.month>i.month?(console.error("min.month > max.month"),e.month=1):e.month===i.month&&e.day>i.day&&(console.error("min.day > max.day"),e.day=1))}validateColumn(t,e,i,s,n,r,a){const o=t.find(t=>t.name===e);if(!o)return 0;const d=r.slice(),l=a.slice(),u=o.options;let m=u.length-1,c=0;for(let t=0;t<u.length;t++){const e=u[t],o=e.value;d[i]=e.value,l[i]=e.value,(e.disabled=o<r[i]||o>a[i]||f(l[0],l[1],l[2],l[3],l[4])<s||f(d[0],d[1],d[2],d[3],d[4])>n)||(m=Math.min(m,t),c=Math.max(c,t))}const v=o.selectedIndex=h(m,o.selectedIndex,c),p=o.options[v];return p?p.value:0}get text(){if(null!=this.value&&0!==this.value.length)return((t,e,i)=>{if(void 0===e)return;const s=[];let n=!1;if(V.forEach((r,a)=>{if(t.indexOf(r.f)>-1){const o="{"+a+"}",h=u(r.f,e[r.k],e,i);n||void 0===h||null==e[r.k]||(n=!0),s.push(o,h||""),t=t.replace(r.f,o)}}),n){for(let e=0;e<s.length;e+=2)t=t.replace(s[e],s[e+1]);return t}})(this.displayFormat||this.pickerFormat||X,this.datetimeValue,this.locale)}hasValue(){return void 0!==this.text}setFocus(){this.buttonEl&&this.buttonEl.focus()}render(){const{inputId:t,text:e,disabled:r,readonly:a,isExpanded:h,el:u,placeholder:f}=this,m=i(this),c=t+"-lbl",v=d(u),p=void 0===e&&null!=f,y=void 0===e?null!=f?f:"":e;return v&&(v.id=c),l(!0,u,this.name,this.value,this.disabled),s(n,{onClick:this.onClick,role:"combobox","aria-disabled":r?"true":null,"aria-expanded":`${h}`,"aria-haspopup":"true","aria-labelledby":c,class:{[m]:!0,"datetime-disabled":r,"datetime-readonly":a,"datetime-placeholder":p,"in-item":o("ion-item",u)}},s("div",{class:"datetime-text"},y),s("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:this.disabled,ref:t=>this.buttonEl=t}))}get el(){return r(this)}static get watchers(){return{disabled:["disabledChanged"],value:["valueChanged"]}}static get style(){return":host{padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;min-width:16px;min-height:1.2em;font-family:var(--ion-font-family,inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:2}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.in-item){position:static}:host(.datetime-placeholder){color:var(--placeholder-color)}:host(.datetime-disabled){opacity:.3;pointer-events:none}:host(.datetime-readonly){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.datetime-text{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;-ms-flex:1;flex:1;min-height:inherit;direction:ltr;overflow:inherit}:host-context([dir=rtl]) .datetime-text,[dir=rtl] .datetime-text{direction:rtl}:host{--placeholder-color:var(--ion-color-step-400,#999);--padding-top:10px;--padding-end:8px;--padding-bottom:10px;--padding-start:16px}"}},z=t=>{const e=[];let i,s;for(let n=0;n<t.length;n++){i=t[n],e.push(0);for(const t of i.options)(s=t.text.length)>e[n]&&(e[n]=s)}return 2===e.length?(s=Math.max(e[0],e[1]),t[0].align="right",t[1].align="left",t[0].optionsWidth=t[1].optionsWidth=`${17*s}px`):3===e.length&&(s=Math.max(e[0],e[2]),t[0].align="right",t[1].columnWidth=`${17*e[1]}px`,t[0].optionsWidth=t[2].optionsWidth=`${17*s}px`,t[2].align="left"),t},X="MMM D, YYYY";let q=0;export{R as ion_datetime};