//Логіка сторінки Cart
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { STORAGE_KEYS } from "./js/constants";
import { wishlistCounterUpdate, cartCounterUpdate, addProducts } from "./js/render-function";
import { getProductById } from "./js/products-api";
import { refs } from "./js/refs";
import { cardOpened, cardClosed, addToCart, addToWishlist } from "./js/modal";

STORAGE_KEYS.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
STORAGE_KEYS.cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlistCounterUpdate();
cartCounterUpdate();

function updateOrder(list) {
    let price = list.reduce((sum, product) => sum += product.price, 0);
    refs.cart_sum.textContent = price;
    refs.cart_amount.textContent = STORAGE_KEYS.cart.length;
}

async function loadCart() {
    if (STORAGE_KEYS.cart.length == 0) return;
    const requests = STORAGE_KEYS.cart.map(id =>
        getProductById(id)
    );
    const list = await Promise.all(requests);
    addProducts(list);

    updateOrder(list);
}
loadCart();

function buyCart() {
    iziToast.success({
        title: 'Niiiice!!!',
        message: 'to be continued'
    });
}

refs.ul_products.addEventListener("click", cardOpened);
refs.modal_close.addEventListener("click", cardClosed);
refs.button_add_to_cart.addEventListener("click", addToCart);
refs.button_add_to_wishlist.addEventListener("click", addToWishlist);
refs.buy_all.addEventListener("click", buyCart);