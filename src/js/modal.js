//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { addModal, removeModal, addCartButtonOff, addCartButtonOn, cartCounterUpdate, addWishlistButtonOff, addWishlistButtonOn, wishlistCounterUpdate } from "./render-function";
import { getProductById } from "./products-api";
import { STORAGE_KEYS } from "./constants";
import { refs } from "./refs";
export async function cardOpened(event) {
    const li = event.target.closest("li");
    if (!li) return;

    const data = await getProductById(li.dataset.id);
    STORAGE_KEYS.currentId = li.dataset.id;
    if (STORAGE_KEYS.cart.includes(Number(STORAGE_KEYS.currentId))) {
        addCartButtonOff();
        refs.button_add_to_cart.addEventListener("click", removeFromCart);
        refs.button_add_to_cart.removeEventListener("click", addToCart);
    } else {
        addCartButtonOn();
        refs.button_add_to_cart.addEventListener("click", addToCart);
        refs.button_add_to_cart.removeEventListener("click", removeFromCart);
    }
    if (STORAGE_KEYS.wishlist.includes(Number(STORAGE_KEYS.currentId))) {
        addWishlistButtonOff();
        refs.button_add_to_wishlist.addEventListener("click", removeFromWishlist);
        refs.button_add_to_wishlist.removeEventListener("click", addToWishlist);
    } else {
        addWishlistButtonOn();
        refs.button_add_to_wishlist.addEventListener("click", addToWishlist);
        refs.button_add_to_wishlist.removeEventListener("click", removeFromWishlist);
    }

    addModal(data);
}

export function cardClosed() {
    removeModal();
}

export function addToCart(event) {
    if (!STORAGE_KEYS.cart.includes(Number(STORAGE_KEYS.currentId))) {
        STORAGE_KEYS.cart.push(Number(STORAGE_KEYS.currentId));
        localStorage.setItem("cart", JSON.stringify(STORAGE_KEYS.cart));
        cartCounterUpdate();
        addCartButtonOff();
        refs.button_add_to_cart.removeEventListener("click", addToCart);
        refs.button_add_to_cart.addEventListener("click", removeFromCart);
    }
}

function removeFromCart() {

    addCartButtonOn();
    refs.button_add_to_cart.removeEventListener("click", removeFromCart);
    refs.button_add_to_cart.addEventListener("click", addToCart);
    STORAGE_KEYS.cart.splice((STORAGE_KEYS.cart.indexOf(Number(STORAGE_KEYS.currentId))), 1);
    localStorage.setItem("cart", JSON.stringify(STORAGE_KEYS.cart));
    cartCounterUpdate();
}

export function addToWishlist(event) {
    if (!STORAGE_KEYS.wishlist.includes(Number(STORAGE_KEYS.currentId))) {
        STORAGE_KEYS.wishlist.push(Number(STORAGE_KEYS.currentId));
        localStorage.setItem("wishlist", JSON.stringify(STORAGE_KEYS.wishlist));
        wishlistCounterUpdate();
        addWishlistButtonOff();
        refs.button_add_to_wishlist.removeEventListener("click", addToWishlist);
        refs.button_add_to_wishlist.addEventListener("click", removeFromWishlist);
    }
}

function removeFromWishlist() {

    addWishlistButtonOn();
    refs.button_add_to_wishlist.removeEventListener("click", removeFromWishlist);
    refs.button_add_to_wishlist.addEventListener("click", addToWishlist);
    STORAGE_KEYS.wishlist.splice((STORAGE_KEYS.wishlist.indexOf(Number(STORAGE_KEYS.currentId))), 1);
    localStorage.setItem("wishlist", JSON.stringify(STORAGE_KEYS.wishlist));
    wishlistCounterUpdate();
}