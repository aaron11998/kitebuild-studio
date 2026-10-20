/* Kite Desk page i18n + multilingual rule-based demo.
   Client-side only: no network calls, no keys, sends no real messages. */
(function(){
var I=window.KD_I18N,CODES=["en","pt-BR","id","hi","ar","es"];
var BASE="https://aaron11998.github.io/kitebuild-studio/kite-desk/";
function pick(c){if(!c)return null;c=String(c).toLowerCase();
 for(var i=0;i<CODES.length;i++)if(CODES[i].toLowerCase()===c)return CODES[i];
 var p=c.split("-")[0];if(p==="pt")return "pt-BR";if(p==="in"||p==="ms")return "id";
 return CODES.indexOf(p)>-1?p:null}
function detect(){var q=pick(new URLSearchParams(location.search).get("lang"));if(q)return q;
 var nl=navigator.languages||[navigator.language];for(var i=0;i<nl.length;i++){var m=pick(nl[i]);if(m)return m}return "en"}
var L,D,state,log=document.getElementById("kd-log"),form=document.getElementById("kd-form"),input=document.getElementById("kd-input");
function fmt(s,o){return s.replace(/\{(\w+)\}/g,function(_,k){return o&&o[k]!=null?o[k]:""})}
function norm(s){s=s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 return s.replace(/[\u064B-\u0655\u0640\u0670]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/ـ/g,"")}
function toks(s){return " "+norm(s).replace(/[^\p{L}\p{M}\p{N}]+/gu," ").trim()+" "}
function hit(x,list){var sub=D.match==="substring";for(var i=0;i<list.length;i++){var k=norm(list[i]);
  if(sub?x.indexOf(k)>-1:x.indexOf(" "+toks(k).trim()+" ")>-1)return true}return false}
function kw(name){var a=D.keywords[name]||[];return L.locale==="en"?a:a.concat(I.en.demo.keywords[name])}
function priceList(){return D.services.map(function(s){return "• "+s.label+": "+s.price}).join("\n")}
function findService(x){for(var i=0;i<D.services.length;i++){var s=D.services[i];if(hit(x,[s.label].concat(s.aliases)))return s}return null}
function t(){var d=new Date();return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)}
function add(who,text){var m=document.createElement("div");m.className="kd-msg "+who;m.setAttribute("data-who",who);m.setAttribute("dir","auto");
 var p=document.createElement("span");p.textContent=text;m.appendChild(p);var s=document.createElement("small");s.textContent=t();m.appendChild(s);
 log.appendChild(m);log.scrollTop=log.scrollHeight}
function reply(raw){var M=D.msg,x=toks(raw),biz=D.business;
 if(hit(x,kw("human"))){state={step:null,b:{}};return fmt(M.handoff,{biz:biz})}
 if(state.step&&hit(x,kw("cancel"))){state={step:null,b:{}};return M.cancelled}
 if(state.step==="name"){state.b.name=raw.trim();state.step="service";return fmt(M.ask_service,{name:state.b.name,list:priceList()})}
 if(state.step==="service"){var s=findService(x);if(!s)return fmt(M.not_caught,{list:priceList()});
  state.b.service=s;state.step="time";return fmt(M.ask_time,{service:s.label,price:s.price})}
 if(state.step==="time"){state.b.time=raw.trim();state.step="confirm";
  return fmt(M.confirm,{name:state.b.name,service:state.b.service.label,time:state.b.time})}
 if(state.step==="confirm"){if(hit(x,kw("yes"))){var b=state.b;state={step:null,b:{}};
   return fmt(M.booked,{name:b.name,service:b.service.label,time:b.time,biz:biz})}
  state={step:"name",b:{}};return M.restart}
 if(hit(x,kw("book"))){state={step:"name",b:{}};return M.ask_name}
 if(hit(x,kw("hours")))return fmt(M.hours,{hours:D.hours});
 if(hit(x,kw("prices")))return fmt(M.prices,{list:priceList()});
 if(hit(x,kw("location")))return fmt(M.location,{location:D.location});
 if(hit(x,kw("greet")))return fmt(M.greet,{biz:biz});
 return M.fallback}
function send(text){if(!text.trim())return;add("me",text);var r=reply(text);setTimeout(function(){add("bot",r)},250)}
function q(sel){return document.querySelectorAll(sel)}
function apply(code){L=I[code];D=L.demo;var P=L.page;
 document.documentElement.lang=code;document.documentElement.dir=L.dir;document.title=P.title;
 document.querySelector('meta[name="description"]').content=P.desc;
 Array.prototype.forEach.call(q("[data-i18n]"),function(e){var k=e.getAttribute("data-i18n"),v=P[k];
  if(k.indexOf("chip")===0)v=P.chips[+k.slice(4)];if(v!=null)e.textContent=v});
 Array.prototype.forEach.call(q("[data-i18n-html]"),function(e){e.innerHTML=fmt(P[e.getAttribute("data-i18n-html")],{biz:D.business})});
 Array.prototype.forEach.call(q("[data-i18n-attr]"),function(e){e.getAttribute("data-i18n-attr").split(";").forEach(function(p){var kv=p.split(":");e.setAttribute(kv[0],P[kv[1]])})});
 document.getElementById("kd-biz").textContent=D.business;document.getElementById("kd-av").textContent=D.initials;
 var wa="https://wa.me/971507761066?text="+encodeURIComponent(P.wa_text);Array.prototype.forEach.call(q("[data-wa]"),function(a){a.href=wa});
 Array.prototype.forEach.call(q("[data-kd-quick]"),function(b,i){b.textContent=D.quick[i][0];b.setAttribute("data-kd-quick",D.quick[i][1])});
 document.getElementById("kd-lang").value=code;
 Array.prototype.forEach.call(q("#langs a"),function(a){a.toggleAttribute("aria-current",a.getAttribute("hreflang")===code)});
 log.innerHTML="";state={step:null,b:{}};add("bot",fmt(D.msg.welcome,{biz:D.business}))}
function go(code){var u=new URL(location.href);if(code==="en")u.searchParams.delete("lang");else u.searchParams.set("lang",code);
 history.replaceState(null,"",u);apply(code)}
var sel=document.getElementById("kd-lang");
CODES.forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=I[c].name;o.lang=c;sel.appendChild(o)});
sel.addEventListener("change",function(){go(sel.value)});
Array.prototype.forEach.call(q("#langs a"),function(a){a.addEventListener("click",function(e){e.preventDefault();go(a.getAttribute("hreflang"))})});
form.addEventListener("submit",function(e){e.preventDefault();var v=input.value;input.value="";send(v)});
Array.prototype.forEach.call(q("[data-kd-quick]"),function(b){b.addEventListener("click",function(){send(b.getAttribute("data-kd-quick"))})});
apply(detect());
window.KiteDeskDemo={reply:reply,setLang:go,langs:CODES};
})();
