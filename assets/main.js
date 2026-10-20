const b=document.querySelector('.menu'),n=document.getElementById('links');
if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded',false)}))}
const y=document.getElementById('y');if(y)y.textContent=new Date().getFullYear();
const f=document.querySelector('.form');if(f){const WA='971507761066',EM='kitebuildstudio@mail.grokbot.com';
const build=()=>{const d=new FormData(f);return "Hi Kitebuild Studio, I'd like a quote.\nName: "+(d.get('name')||'')+"\nEmail: "+(d.get('email')||'')+"\nService: "+(d.get('service')||'')+"\nDetails: "+(d.get('message')||'')};
const fb=f.querySelector('.mailfb');const upd=()=>{if(fb)fb.href='mailto:'+EM+'?subject='+encodeURIComponent('Quote request: '+(new FormData(f).get('service')||''))+'&body='+encodeURIComponent(build())};f.addEventListener('input',upd);f.addEventListener('change',upd);
f.addEventListener('submit',e=>{e.preventDefault();upd();window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(build()),'_blank','noopener');f.querySelector('.note').firstChild.textContent='Opening WhatsApp… If it didn\'t open, ';})}
