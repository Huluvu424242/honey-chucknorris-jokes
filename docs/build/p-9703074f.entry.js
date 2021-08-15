import{r as t,h as n,H as e,g as r}from"./p-76b0f29c.js";function i(t){return"function"==typeof t}function o(t){const n=t((t=>{Error.call(t),t.stack=(new Error).stack}));return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n}const s=o((t=>function(n){t(this),this.message=n?`${n.length} errors occurred during unsubscription:\n${n.map(((t,n)=>`${n+1}) ${t.toString()}`)).join("\n  ")}`:"",this.name="UnsubscriptionError",this.errors=n}));function c(t,n){if(t){const e=t.indexOf(n);0<=e&&t.splice(e,1)}}class u{constructor(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}unsubscribe(){let t;if(!this.closed){this.closed=!0;const{_parentage:n}=this;if(n)if(this._parentage=null,Array.isArray(n))for(const t of n)t.remove(this);else n.remove(this);const{initialTeardown:e}=this;if(i(e))try{e()}catch(n){t=n instanceof s?n.errors:[n]}const{_teardowns:r}=this;if(r){this._teardowns=null;for(const n of r)try{h(n)}catch(n){t=null!=t?t:[],n instanceof s?t=[...t,...n.errors]:t.push(n)}}if(t)throw new s(t)}}add(t){var n;if(t&&t!==this)if(this.closed)h(t);else{if(t instanceof u){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._teardowns=null!==(n=this._teardowns)&&void 0!==n?n:[]).push(t)}}_hasParent(t){const{_parentage:n}=this;return n===t||Array.isArray(n)&&n.includes(t)}_addParent(t){const{_parentage:n}=this;this._parentage=Array.isArray(n)?(n.push(t),n):n?[n,t]:t}_removeParent(t){const{_parentage:n}=this;n===t?this._parentage=null:Array.isArray(n)&&c(n,t)}remove(t){const{_teardowns:n}=this;n&&c(n,t),t instanceof u&&t._removeParent(this)}}function l(t){return t instanceof u||t&&"closed"in t&&i(t.remove)&&i(t.add)&&i(t.unsubscribe)}function h(t){i(t)?t():t.unsubscribe()}u.EMPTY=(()=>{const t=new u;return t.closed=!0,t})();const a={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},f={setTimeout(...t){const{delegate:n}=f;return((null==n?void 0:n.setTimeout)||setTimeout)(...t)},clearTimeout(t){const{delegate:n}=f;return((null==n?void 0:n.clearTimeout)||clearTimeout)(t)},delegate:void 0};function d(t){f.setTimeout((()=>{const{onUnhandledError:n}=a;if(!n)throw t;n(t)}))}function v(){}const y=b("C",void 0,void 0);function b(t,n,e){return{kind:t,value:n,error:e}}class p extends u{constructor(t){super(),this.isStopped=!1,t?(this.destination=t,l(t)&&t.add(this)):this.destination=S}static create(t,n,e){return new w(t,n,e)}next(t){this.isStopped?x(function(t){return b("N",t,void 0)}(t),this):this._next(t)}error(t){this.isStopped?x(b("E",void 0,t),this):(this.isStopped=!0,this._error(t))}complete(){this.isStopped?x(y,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(t){this.destination.next(t)}_error(t){try{this.destination.error(t)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}}class w extends p{constructor(t,n,e){let r;if(super(),i(t))r=t;else if(t){let i;({next:r,error:n,complete:e}=t),this&&a.useDeprecatedNextContext?(i=Object.create(t),i.unsubscribe=()=>this.unsubscribe()):i=t,r=null==r?void 0:r.bind(i),n=null==n?void 0:n.bind(i),e=null==e?void 0:e.bind(i)}this.destination={next:r?m(r):v,error:m(null!=n?n:g),complete:e?m(e):v}}}function m(t){return(...n)=>{try{t(...n)}catch(t){d(t)}}}function g(t){throw t}function x(t,n){const{onStoppedNotification:e}=a;e&&f.setTimeout((()=>e(t,n)))}const S={closed:!0,next:v,error:g,complete:v},_="function"==typeof Symbol&&Symbol.observable||"@@observable";function k(t){return t}class E{constructor(t){t&&(this._subscribe=t)}lift(t){const n=new E;return n.source=this,n.operator=t,n}subscribe(t,n,e){const r=(o=t)&&o instanceof p||function(t){return t&&i(t.next)&&i(t.error)&&i(t.complete)}(o)&&l(o)?t:new w(t,n,e);var o;return(()=>{const{operator:t,source:n}=this;r.add(t?t.call(r,n):n?this._subscribe(r):this._trySubscribe(r))})(),r}_trySubscribe(t){try{return this._subscribe(t)}catch(n){t.error(n)}}forEach(t,n){return new(n=j(n))(((n,e)=>{let r;r=this.subscribe((n=>{try{t(n)}catch(t){e(t),null==r||r.unsubscribe()}}),e,n)}))}_subscribe(t){var n;return null===(n=this.source)||void 0===n?void 0:n.subscribe(t)}[_](){return this}pipe(...t){return(0===(n=t).length?k:1===n.length?n[0]:function(t){return n.reduce(((t,n)=>n(t)),t)})(this);var n}toPromise(t){return new(t=j(t))(((t,n)=>{let e;this.subscribe((t=>e=t),(t=>n(t)),(()=>t(e)))}))}}function j(t){var n;return null!==(n=null!=t?t:a.Promise)&&void 0!==n?n:Promise}function P(t){return n=>{if(function(t){return i(null==t?void 0:t.lift)}(n))return n.lift((function(n){try{return t(n,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}E.create=t=>new E(t);class A extends p{constructor(t,n,e,r,i){super(t),this.onFinalize=i,this._next=n?function(e){try{n(e)}catch(n){t.error(n)}}:super._next,this._error=r?function(n){try{r(n)}catch(n){t.error(n)}finally{this.unsubscribe()}}:super._error,this._complete=e?function(){try{e()}catch(n){t.error(n)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var t;const{closed:n}=this;super.unsubscribe(),!n&&(null===(t=this.onFinalize)||void 0===t||t.call(this))}}const O={now:()=>(O.delegate||Date).now(),delegate:void 0};class I extends u{constructor(t,n){super()}schedule(t,n=0){return this}}const T={setInterval(...t){const{delegate:n}=T;return((null==n?void 0:n.setInterval)||setInterval)(...t)},clearInterval(t){const{delegate:n}=T;return((null==n?void 0:n.clearInterval)||clearInterval)(t)},delegate:void 0};class N{constructor(t,n=N.now){this.schedulerActionCtor=t,this.now=n}schedule(t,n=0,e){return new this.schedulerActionCtor(this,t).schedule(e,n)}}N.now=O.now;const z=new class extends N{constructor(t,n=N.now){super(t,n),this.actions=[],this._active=!1,this._scheduled=void 0}flush(t){const{actions:n}=this;if(this._active)return void n.push(t);let e;this._active=!0;do{if(e=t.execute(t.state,t.delay))break}while(t=n.shift());if(this._active=!1,e){for(;t=n.shift();)t.unsubscribe();throw e}}}(class extends I{constructor(t,n){super(t,n),this.scheduler=t,this.work=n,this.pending=!1}schedule(t,n=0){if(this.closed)return this;this.state=t;const e=this.id,r=this.scheduler;return null!=e&&(this.id=this.recycleAsyncId(r,e,n)),this.pending=!0,this.delay=n,this.id=this.id||this.requestAsyncId(r,this.id,n),this}requestAsyncId(t,n,e=0){return T.setInterval(t.flush.bind(t,this),e)}recycleAsyncId(t,n,e=0){if(null!=e&&this.delay===e&&!1===this.pending)return n;T.clearInterval(n)}execute(t,n){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const e=this._execute(t,n);if(e)return e;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,n){let e,r=!1;try{this.work(t)}catch(t){r=!0,e=!!t&&t||new Error(t)}if(r)return this.unsubscribe(),e}unsubscribe(){if(!this.closed){const{id:t,scheduler:n}=this,{actions:e}=n;this.work=this.state=this.scheduler=null,this.pending=!1,c(e,this),null!=t&&(this.id=this.recycleAsyncId(n,t,null)),this.delay=null,super.unsubscribe()}}}),D=new E((t=>t.complete()));function C(t){return this instanceof C?(this.v=t,this):new C(t)}function W(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,i=e.apply(t,n||[]),o=[];return r={},s("next"),s("throw"),s("return"),r[Symbol.asyncIterator]=function(){return this},r;function s(t){i[t]&&(r[t]=function(n){return new Promise((function(e,r){o.push([t,n,e,r])>1||c(t,n)}))})}function c(t,n){try{(e=i[t](n)).value instanceof C?Promise.resolve(e.value.v).then(u,l):h(o[0][2],e)}catch(t){h(o[0][3],t)}var e}function u(t){c("next",t)}function l(t){c("throw",t)}function h(t,n){t(n),o.shift(),o.length&&c(o[0][0],o[0][1])}}function $(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,e=t[Symbol.asyncIterator];return e?e.call(t):(t=function(t){var n="function"==typeof Symbol&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}(t),n={},r("next"),r("throw"),r("return"),n[Symbol.asyncIterator]=function(){return this},n);function r(e){n[e]=t[e]&&function(n){return new Promise((function(r,i){!function(t,n,e,r){Promise.resolve(r).then((function(n){t({value:n,done:e})}),n)}(r,i,(n=t[e](n)).done,n.value)}))}}}const U="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function R(t){if(t instanceof E)return t;if(null!=t){if(function(t){return i(t[_])}(t))return c=t,new E((t=>{const n=c[_]();if(i(n.subscribe))return n.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if((s=t)&&"number"==typeof s.length&&"function"!=typeof s)return o=t,new E((t=>{for(let n=0;n<o.length&&!t.closed;n++)t.next(o[n]);t.complete()}));if(i(null==(r=t)?void 0:r.then))return e=t,new E((t=>{e.then((n=>{t.closed||(t.next(n),t.complete())}),(n=>t.error(n))).then(null,d)}));if(function(t){return Symbol.asyncIterator&&i(null==t?void 0:t[Symbol.asyncIterator])}(t))return H(t);if(function(t){return i(null==t?void 0:t[U])}(t))return n=t,new E((t=>{for(const e of n)if(t.next(e),t.closed)return;t.complete()}));if(function(t){return i(null==t?void 0:t.getReader)}(t))return H(function(t){return W(this,arguments,(function*(){const n=t.getReader();try{for(;;){const{value:t,done:e}=yield C(n.read());if(e)return yield C(void 0);yield yield C(t)}}finally{n.releaseLock()}}))}(t))}var n,e,r,o,s,c;throw function(t){return new TypeError(`You provided ${null!==t&&"object"==typeof t?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}(t)}function H(t){return new E((n=>{(function(t,n){var e,r,i,o,s,c,u,l;return s=this,c=void 0,l=function*(){try{for(e=$(t);!(r=yield e.next()).done;)if(n.next(r.value),n.closed)return}catch(t){i={error:t}}finally{try{r&&!r.done&&(o=e.return)&&(yield o.call(e))}finally{if(i)throw i.error}}n.complete()},new((u=void 0)||(u=Promise))((function(t,n){function e(t){try{i(l.next(t))}catch(t){n(t)}}function r(t){try{i(l.throw(t))}catch(t){n(t)}}function i(n){var i;n.done?t(n.value):(i=n.value,i instanceof u?i:new u((function(t){t(i)}))).then(e,r)}i((l=l.apply(s,c||[])).next())}))})(t,n).catch((t=>n.error(t)))}))}const M=o((t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence"}));function q(t){return P(((n,e)=>{let r,i=null,o=!1;i=n.subscribe(new A(e,void 0,void 0,(s=>{r=R(t(s,q(t)(n))),i?(i.unsubscribe(),i=null,r.subscribe(e)):o=!0}))),o&&(i.unsubscribe(),i=null,r.subscribe(e))}))}function B(t,n){return P(((e,r)=>{let i=null,o=0,s=!1;const c=()=>s&&!i&&r.complete();e.subscribe(new A(r,(e=>{null==i||i.unsubscribe();let s=0;const u=o++;R(t(e,u)).subscribe(i=new A(r,(t=>r.next(n?n(e,t,u,s++):t)),(()=>{i=null,c()})))}),(()=>{s=!0,c()})))}))}function F(t,n,e){const r=i(t)||n||e?{next:t,error:n,complete:e}:t;return r?P(((t,n)=>{var e;null===(e=r.subscribe)||void 0===e||e.call(r);let i=!0;t.subscribe(new A(n,(t=>{var e;null===(e=r.next)||void 0===e||e.call(r,t),n.next(t)}),(()=>{var t;i=!1,null===(t=r.complete)||void 0===t||t.call(r),n.complete()}),(t=>{var e;i=!1,null===(e=r.error)||void 0===e||e.call(r,t),n.error(t)}),(()=>{var t,n;i&&(null===(t=r.unsubscribe)||void 0===t||t.call(r)),null===(n=r.finalize)||void 0===n||n.call(r)})))})):k}const L=class{constructor(n){t(this,n),this.changePeriod=20}periodWatcher(t,n){this.printMessage("period changed old:"+n+" new:"+t),t&&n!==t&&(this.changePeriod=t,this.fetcherSubscription.unsubscribe(),this.fetcherSubscription=this.subscribePeriodicFetcher(),this.printMessage("period changed to:"+this.changePeriod))}connectedCallback(){this.ident=this.hostElement.id?this.hostElement.id:Math.random().toString(36).substring(7),this.fetcherSubscription=this.subscribePeriodicFetcher(),this.printMessage("DOM connected")}async componentWillLoad(){var t;this.printMessage("Lade Daten"),await(t=this.fetchWitz$(),new Promise(((n,e)=>{let r,i=!1;t.subscribe({next:t=>{r=t,i=!0},error:e,complete:()=>{i?n(r):e(new M)}})}))).catch((()=>{this.setWitz(L.FALLBACK_WITZ)})),this.printMessage("Daten geladen")}disconnectedCallback(){this.fetcherSubscription.unsubscribe(),this.printMessage("DOM disconnected")}printMessage(t){console&&console.log((new Date).toUTCString()+": "+t)}setWitz(t){this.printMessage("setze neuen  Witz"),t?this.witz={id:t.id,imgurl:t.icon_url,website:t.url,text:t.value}:this.printMessage("konnte Witz nicht setzen")}fetchWitz$(){return function(t,n={}){const{selector:e}=n,r=
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function(t,n){var e={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&n.indexOf(r)<0&&(e[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(e[r[i]]=t[r[i]])}return e}(n,["selector"]);return new E((n=>{const i=new AbortController,{signal:o}=i;let s=!0;const{signal:c}=r;if(c)if(c.aborted)i.abort();else{const t=()=>{o.aborted||i.abort()};c.addEventListener("abort",t),n.add((()=>c.removeEventListener("abort",t)))}const u=Object.assign(Object.assign({},r),{signal:o}),l=t=>{s=!1,n.error(t)};return fetch(t,u).then((t=>{e?R(e(t)).subscribe(new A(n,void 0,(()=>{s=!1,n.complete()}),l)):(s=!1,n.next(t),n.complete())})).catch(l),()=>{s&&i.abort()}}))}(L.CHUCK_NORRIS_API_URL).pipe(B((t=>t.json())),F((t=>this.setWitz(t))),q((()=>D)))}subscribePeriodicFetcher(){const t=1e3*this.changePeriod;return function(t=0,n,e=z){let r=-1;var o;return null!=n&&((o=n)&&i(o.schedule)?e=n:r=n),new E((n=>{let i=function(t){return t instanceof Date&&!isNaN(t)}(t)?+t-e.now():t;i<0&&(i=0);let o=0;return e.schedule((function(){n.closed||(n.next(o++),0<=r?this.schedule(void 0,r):n.complete())}),i)}))}(t,t).pipe(F((()=>this.printMessage("neuen Witz angefordert"))),B((()=>this.fetchWitz$()))).subscribe()}render(){return this.printMessage("rendering"),n(e,{id:this.ident},n("a",{href:this.witz.website,class:"container",target:"blank"},n("img",{alt:"Chuck",title:"Funny icon of Chuck Norris",src:this.witz.imgurl,class:"item logo"}),n("p",{class:"item text"},this.witz.text)))}get hostElement(){return r(this)}static get watchers(){return{changePeriod:["periodWatcher"]}}};L.CHUCK_NORRIS_API_URL="https://api.chucknorris.io/jokes/random",L.FALLBACK_WITZ={id:"4_kRvuABR7mNQZxh-_UH1A",imgurl:"https://assets.chucknorris.host/img/avatar/chuck-norris.png",website:"https://api.chucknorris.io/jokes/4_kRvuABR7mNQZxh-_UH1A",text:"Chuck Norris' Ipod came with a real charger instead of just a usb cord."},L.style=".container{display:flex;align-items:center;border:1px solid var(--homey-border-color, grey)}.item{flex:auto}.logo{width:30px;height:30px;flex:none}.text{font-size:var(--honey-font-size, x-small)}";export{L as honey_chucknorris_jokes}