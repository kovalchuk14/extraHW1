//Логіка сторінки Home
import { getCategories, } from "./js/products-api";
import { addCategories, wishlistCounterUpdate, cartCounterUpdate } from "./js/render-function";
import { categoryChoosen, loadMore, searchProduct, cancelSearch } from "./js/handlers";
import { cardOpened, cardClosed, addToCart, addToWishlist } from "./js/modal";
import { refs } from "./js/refs";
import { STORAGE_KEYS } from "./js/constants";


async function init() {
    let categories = await getCategories();
    categories.unshift("All");
    addCategories(categories);
}
init();
STORAGE_KEYS.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
STORAGE_KEYS.cart = JSON.parse(localStorage.getItem("cart")) || [];
wishlistCounterUpdate();
cartCounterUpdate();
refs.ul_categories.addEventListener("click", categoryChoosen);

loadMore();
refs.load_button.addEventListener("click", loadMore);
refs.form.addEventListener("submit", searchProduct);
refs.form_cancel.addEventListener("click", cancelSearch);

refs.ul_products.addEventListener("click", cardOpened);
refs.modal_close.addEventListener("click", cardClosed);
refs.button_add_to_cart.addEventListener("click", addToCart);
refs.button_add_to_wishlist.addEventListener("click", addToWishlist);