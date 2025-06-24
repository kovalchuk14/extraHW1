import"./assets/styles-BK7AYJoX.js";import{a as s}from"./assets/vendor-DGDcxXwr.js";const a=["https://dummyjson.com/docs/products","https://dummyjson.com/products?limit=12&skip=","https://dummyjson.com/products/","https://dummyjson.com/products/search?q=","https://dummyjson.com/products/category-list","https://dummyjson.com/products/category/"];async function _(){return(await s.get(a[4])).data}async function g(t){return(await s.get(a[1]+`${(t-1)*12}`)).data.products}async function y(t,o){return(await s.get(a[5]+o)).data.products.slice((t-1)*12,t*12)}async function f(t){return(await s.get(a[2]+t)).data}async function m(t,o){return(await s.get(a[3]+o)).data.products.slice((t-1)*12,t*12)}const e={ul_categories:document.querySelector(".categories"),ul_products:document.querySelector(".products"),load_button:document.querySelector("#load-more"),loader:document.querySelector(".not-found"),modal:document.querySelector(".modal"),modal_product:document.querySelector(".modal-product"),modal_close:document.querySelector(".modal__close-btn"),form:document.querySelector(".search-form"),form_input:document.querySelector(".search-form__input")};function b(t){const o=t.map(r=>`
            <li class="categories__item">
                <button class="categories__btn" type="button">${r}</button>
             </li>
        `).join("");e.ul_categories.insertAdjacentHTML("beforeend",o)}function u(t){const o=t.map(r=>`
            <li class="products__item" data-id="${r.id}">
                <img class="products__image" src="${r.images[0]}" alt="${r.description}"/>
                <p class="products__title">${r.title}</p>
                <p class="products__brand"><span class="products__brand--bold">Brand: </span>${r.brand}</p>
                <p class="products__category">Category: ${r.category}</p>
                <p class="products__price">Price: ${r.price}$</p>
            </li>
        `).join("");e.ul_products.insertAdjacentHTML("beforeend",o)}function p(){e.ul_products.innerHTML=""}function h(t){e.modal.classList.add("modal--is-open"),e.modal_product.innerHTML="",e.modal_product.insertAdjacentHTML("beforeend",`
            <img class="modal-product__img" src="${t.images[0]}" alt="${t.description}" />
            <div class="modal-product__content">
                <p class="modal-product__title">${t.title}</p>
                <ul class="modal-product__tags">${t.tags}</ul>
                <p class="modal-product__description">${t.description}</p>
                <p class="modal-product__shipping-information">Shipping: ${t.shipingInformation}</p>
                <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
                <p class="modal-product__price">Price: ${t.price}$</p>
                <button class="modal-product__buy-btn" type="button">Buy</button>
            </div>
        `)}function v(){e.modal.classList.remove("modal--is-open")}const n={currentPage:1,choosenCategory:"",choosenName:""};async function c(){let t=await g(n.currentPage);d(t)!=!0&&(u(t),n.currentPage++)}async function L(t){if(t.target.nodeName!="BUTTON")return;p(),n.currentPage=1;const o=e.ul_categories.querySelector("button");if(t.target==o){P();return}e.load_button.removeEventListener("click",c),e.load_button.removeEventListener("click",l),e.load_button.addEventListener("click",i),n.choosenCategory=t.target.textContent,i()}async function i(){let t=await y(n.currentPage,n.choosenCategory);d(t)!=!0&&(u(t),n.currentPage++)}function P(){e.load_button.removeEventListener("click",i),e.load_button.removeEventListener("click",l),e.load_button.addEventListener("click",c),c()}function d(t){return t.length==0?(e.loader.classList.add("not-found--visible"),!0):!1}async function $(t){const o=t.target.closest("li");if(!o)return;const r=await f(o.dataset.id);h(r)}function E(){v()}async function k(t){if(t.preventDefault(),n.choosenName=e.form_input.value.trim(),n.choosenName=="")return;n.currentPage=1;const o=await m(n.currentPage,n.choosenName);p(),d(o)!=!0&&(u(o),n.currentPage++,e.load_button.removeEventListener("click",i),e.load_button.removeEventListener("click",c),e.load_button.addEventListener("click",l))}async function l(){let t=await m(n.currentPage,n.choosenName);d(t)!=!0&&(u(t),n.currentPage++)}async function S(){let t=await _();t.unshift("All"),b(t)}S();e.ul_categories.addEventListener("click",L);c();e.load_button.addEventListener("click",c);e.ul_products.addEventListener("click",$);e.modal_close.addEventListener("click",E);e.form.addEventListener("submit",k);
//# sourceMappingURL=index.js.map
