import{aB as l,as as f,X as g,L as w,aj as S,q as L,ak as A,$ as x}from"./runtime.uobgoVXo.js";function D(t){return t.endsWith("capture")&&t!=="gotpointercapture"&&t!=="lostpointercapture"}const N=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function C(t){return N.includes(t)}const V={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject"};function P(t){return t=t.toLowerCase(),V[t]??t}const B=["touchstart","touchmove"];function R(t){return B.includes(t)}const I=["textarea","script","style","title"];function X(t){return I.includes(t)}function M(t){var e=g,o=w;l(null),f(null);try{return t()}finally{l(e),f(o)}}const O=new Set,W=new Set;function y(t,e,o,n){function a(r){if(n.capture||j.call(e,r),!r.cancelBubble)return M(()=>o.call(this,r))}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?L(()=>{e.addEventListener(t,a,n)}):e.addEventListener(t,a,n),a}function z(t,e,o,n={}){var a=y(e,t,o,n);return()=>{t.removeEventListener(e,a,n)}}function G(t,e,o,n,a){var r={capture:n,passive:a},u=y(t,e,o,r);(e===document.body||e===window||e===document)&&S(()=>{e.removeEventListener(t,u,r)})}function U(t){for(var e=0;e<t.length;e++)O.add(t[e]);for(var o of W)o(t)}function j(t){var E;var e=this,o=e.ownerDocument,n=t.type,a=((E=t.composedPath)==null?void 0:E.call(t))||[],r=a[0]||t.target,u=0,p=t.__root;if(p){var d=a.indexOf(p);if(d!==-1&&(e===document||e===window)){t.__root=e;return}var v=a.indexOf(e);if(v===-1)return;d<=v&&(u=d)}if(r=a[u]||t.target,r!==e){A(t,"currentTarget",{configurable:!0,get(){return r||o}});var b=g,T=w;l(null),f(null);try{for(var i,h=[];r!==null;){var _=r.assignedSlot||r.parentNode||r.host||null;try{var c=r["__"+n];if(c!==void 0&&!r.disabled)if(x(c)){var[k,...m]=c;k.apply(r,[t,...m])}else c.call(r,t)}catch(s){i?h.push(s):i=s}if(t.cancelBubble||_===e||_===null)break;r=_}if(i){for(let s of h)queueMicrotask(()=>{throw s});throw i}}finally{t.__root=e,delete t.currentTarget,l(b),f(T)}}}export{O as a,D as b,y as c,U as d,C as e,X as f,G as g,j as h,R as i,P as n,z as o,W as r};
