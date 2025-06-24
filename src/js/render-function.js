//Функцію для створення, рендеру або видалення розмітки

import { refs } from "./refs";

export function addCategories(list) {
    const content = list.map((category) => {
        return `
            <li class="categories__item">
                <button class="categories__btn" type="button">${category}</button>
             </li>
        `;
    }).join("");
    refs.ul_categories.insertAdjacentHTML("beforeend", content);
}

export function addProducts(list) {
    const content = list.map((product) => {
        return `
            <li class="products__item" data-id="${product.id}">
                <img class="products__image" src="${product.images[0]}" alt="${product.description}"/>
                <p class="products__title">${product.title}</p>
                <p class="products__brand"><span class="products__brand--bold">Brand: </span>${product.brand}</p>
                <p class="products__category">Category: ${product.category}</p>
                <p class="products__price">Price: ${product.price}$</p>
            </li>
        `;
    }).join("");
    refs.ul_products.insertAdjacentHTML("beforeend", content);
}

export function clearList() {
    refs.ul_products.innerHTML = "";
}

export function addModal(data) {
    refs.modal.classList.add("modal--is-open");
    refs.modal_product.innerHTML = "";
    refs.modal_product.insertAdjacentHTML("beforeend",
        `
            <img class="modal-product__img" src="${data.images[0]}" alt="${data.description}" />
            <div class="modal-product__content">
                <p class="modal-product__title">${data.title}</p>
                <ul class="modal-product__tags">${data.tags}</ul>
                <p class="modal-product__description">${data.description}</p>
                <p class="modal-product__shipping-information">Shipping: ${data.shipingInformation}</p>
                <p class="modal-product__return-policy">Return Policy: ${data.returnPolicy}</p>
                <p class="modal-product__price">Price: ${data.price}$</p>
                <button class="modal-product__buy-btn" type="button">Buy</button>
            </div>
        `
    )
}

export function removeModal() {
    refs.modal.classList.remove("modal--is-open");
}