//Логіка сторінки Home
import { getCategories, getProducts } from "./js/products-api";
import { addCategories, addProducts } from "./js/render-function";
import { categoryChoosen, loadMore, categoryUnchoosen, cardOpened, cardClosed, searchProduct } from "./js/handlers";
import { refs } from "./js/refs";
import { STORAGE_KEYS } from "./js/constants";


async function init() {
    let categories = await getCategories();
    categories.unshift("All");
    addCategories(categories);

}
init();
refs.ul_categories.addEventListener("click", categoryChoosen);

loadMore();
refs.load_button.addEventListener("click", loadMore);

refs.ul_products.addEventListener("click", cardOpened);
refs.modal_close.addEventListener("click", cardClosed)
refs.form.addEventListener("submit", searchProduct);
