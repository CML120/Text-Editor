(()=>{"use strict";var e={491:()=>{const e=(e,t)=>t.some((t=>e instanceof t));let t,n;const r=new WeakMap,o=new WeakMap,s=new WeakMap,a=new WeakMap,i=new WeakMap;let c={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return o.get(e);if("objectStoreNames"===t)return e.objectStoreNames||s.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return d(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function u(a){return"function"==typeof a?(i=a)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(n||(n=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(i)?function(...e){return i.apply(p(this),e),d(r.get(this))}:function(...e){return d(i.apply(p(this),e))}:function(e,...t){const n=i.call(p(this),e,...t);return s.set(n,e.sort?e.sort():[e]),d(n)}:(a instanceof IDBTransaction&&function(e){if(o.has(e))return;const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{t(),r()},s=()=>{n(e.error||new DOMException("AbortError","AbortError")),r()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)}));o.set(e,t)}(a),e(a,t||(t=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(a,c):a);var i}function d(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const r=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{t(d(e.result)),r()},s=()=>{n(e.error),r()};e.addEventListener("success",o),e.addEventListener("error",s)}));return t.then((t=>{t instanceof IDBCursor&&r.set(t,e)})).catch((()=>{})),i.set(t,e),t}(e);if(a.has(e))return a.get(e);const t=u(e);return t!==e&&(a.set(e,t),i.set(t,e)),t}const p=e=>i.get(e),l=["get","getKey","getAll","getAllKeys","count"],f=["put","add","delete","clear"],v=new Map;function D(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(v.get(t))return v.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=f.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!o&&!l.includes(n))return;const s=async function(e,...t){const s=this.transaction(e,o?"readwrite":"readonly");let a=s.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),o&&s.done]))[0]};return v.set(t,s),s}var b;b=c,c={...b,get:(e,t,n)=>D(e,t)||b.get(e,t,n),has:(e,t)=>!!D(e,t)||b.has(e,t)},(async()=>{!function(e,t,{blocked:n,upgrade:r,blocking:o,terminated:s}={}){const a=indexedDB.open(e,t),i=d(a);r&&a.addEventListener("upgradeneeded",(e=>{r(d(a.result),e.oldVersion,e.newVersion,d(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),i.then((e=>{s&&e.addEventListener("close",(()=>s())),o&&e.addEventListener("versionchange",(()=>o()))})).catch((()=>{}))}("jate",1,{upgrade(e){e.objectStoreNames.contains("jate")?console.log("jate database already exists"):(e.createObjectStore("jate",{keyPath:"id",autoIncrement:!0}),console.log("jate database created"))}})})()}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}(491)})();