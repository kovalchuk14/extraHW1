//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {
    ul_categories: document.querySelector(".categories"),
    ul_products: document.querySelector(".products"),
    load_button: document.querySelector("#load-more"),
    loader: document.querySelector(".not-found"),
    modal: document.querySelector(".modal"),
    modal_product: document.querySelector(".modal-product"),
    modal_close: document.querySelector(".modal__close-btn"),
    form: document.querySelector(".search-form"),
    form_input: document.querySelector(".search-form__input"),
    form_cancel: document.querySelector(".search-form__btn-clear"),
    button_add_to_cart: document.querySelector(".modal-product__btn--cart"),
    cart_count: document.querySelector("[data-cart-count]"),
    wishlist_count: document.querySelector("[data-wishlist-count]"),
    button_add_to_wishlist: document.querySelector(".modal-product__btn--wishlist"),
    cart_sum: document.querySelector("[data-count]"),
    cart_amount: document.querySelector("[data-price]"),
    buy_all: document.querySelector(".cart-summary__btn")
};
