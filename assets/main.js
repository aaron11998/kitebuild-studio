const b=document.querySelector('.menu'),n=document.getElementById('links');
b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded',false)}));
document.getElementById('y').textContent=new Date().getFullYear();
const f=document.querySelector('.form');f.addEventListener('submit',async e=>{if(f.action.includes('FORM_ID_TBD')){e.preventDefault();f.querySelector('.note').textContent='Form not connected yet (TBD). Please email us instead.';return}
e.preventDefault();const r=await fetch(f.action,{method:'POST',body:new FormData(f),headers:{Accept:'application/json'}});f.querySelector('.note').textContent=r.ok?'Thanks! We\'ll reply within 24 hours.':'Something went wrong; please email us.';if(r.ok)f.reset()});
