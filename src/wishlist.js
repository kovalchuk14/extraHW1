//Логіка сторінки Wishlist
import { STORAGE_KEYS } from "./js/constants";
import { wishlistCounterUpdate, cartCounterUpdate, addProducts } from "./js/render-function";
import { getProductById } from "./js/products-api";
import { refs } from "./js/refs";
import { cardOpened, cardClosed, addToCart, addToWishlist } from "./js/modal";

STORAGE_KEYS.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
STORAGE_KEYS.cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlistCounterUpdate();
cartCounterUpdate();

async function loadWishlist() {
    if (STORAGE_KEYS.wishlist.length == 0) return;
    const requests = STORAGE_KEYS.wishlist.map(id =>
        getProductById(id)
    );
    const list = await Promise.all(requests);
    addProducts(list);
}
loadWishlist();

refs.ul_products.addEventListener("click", cardOpened);
refs.modal_close.addEventListener("click", cardClosed);
refs.button_add_to_cart.addEventListener("click", addToCart);
refs.button_add_to_wishlist.addEventListener("click", addToWishlist);