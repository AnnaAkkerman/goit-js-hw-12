import{S as y,a as h,i as u}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const b="/goit-js-hw-12/assets/bi_x-octagon-378f247e.svg",l=document.querySelector(".js-search-form"),c=document.querySelector(".gallery"),d=new y(".gallery a",{captionsData:"alt",captionDelay:250});let i=1,p=15;const v=async s=>{s.preventDefault();const o=s.target.elements.search.value,r=document.querySelector(".loader"),a=document.querySelector(".loadBtn");if(a&&a.remove(),o!==""&&!r){i=1,c.innerHTML="",l.insertAdjacentHTML("afterend",'<span class="loader"></span>');const e=await m(o);setTimeout(()=>{const t=document.querySelector(".loader");t&&t.remove(),g(e.hits),e.hits.length>0&&S(o)},500)}l.reset()},m=async s=>(await h.get("https://pixabay.com/api/",{params:{key:"42121827-736028e2edd071afefc989558",q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:p,page:i}})).data;function g(s){if(s.length===0)return u.show({message:"Sorry, there are no images matching<br>your search query. Please try again!",messageColor:"rgba(255, 255, 255, 1)",backgroundColor:"rgba(239, 64, 64, 1)",iconUrl:b,position:"topRight"});const o=L(s);c.insertAdjacentHTML("beforeend",o),d.on("show.simplelightbox"),d.refresh()}function L(s){return s.map(({largeImageURL:o,webformatURL:r,tags:a,likes:e,views:t,comments:n,downloads:f})=>`<li class="gallery-item">
            <div class="image-container">
                <a href="${o}"><img src="${r}" alt="${a}" class="gallery-image"></a>
            </div>
            <div class="gallery-card">
                <p><span class="description">Likes</span>${e}</p>
                <p><span class="description">Views</span>${t}</p>
                <p><span class="description">Comments</span>${n}</p>
                <p><span class="description">Downloads</span>${f}</p>
            </div>
        </li>`).join("")}function S(s){c.insertAdjacentHTML("afterend",'<button type="button" class="loadBtn">Load more</button>');const o=document.querySelector(".loadBtn");o.addEventListener("click",async()=>{o.style.visibility="hidden",o.insertAdjacentHTML("beforebegin",'<span class="loader"></span>'),i+=1;const r=await m(s);setTimeout(()=>{const e=document.querySelector(".loader");if(e&&e.remove(),g(r.hits),r.hits.length>0){o.style.visibility="visible";const t=document.querySelector(".gallery-item");if(t){const n=t.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}}},500);const a=Math.ceil(r.totalHits/p);i>a&&(o.remove(),u.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))})}l.addEventListener("submit",v);
//# sourceMappingURL=commonHelpers.js.map
