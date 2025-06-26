// Функції, які передаються колбеками в addEventListners
import { getProducts, getProductsByCategories, getProductById, getProductByName } from "./products-api";
import { addProducts, clearList } from "./render-function";
import { STORAGE_KEYS } from "./constants";
import { refs } from "./refs";

export async function loadMore() {
    let list = await getProducts(STORAGE_KEYS.currentPage);
    if (isEmpty(list) == true) return;
    addProducts(list);
    STORAGE_KEYS.currentPage++;
}


export async function categoryChoosen(event) {
    if (event.target.nodeName != "BUTTON") return;
    clearList();
    refs.loader.classList.remove("not-found--visible");
    STORAGE_KEYS.currentPage = 1;
    const firstButton = refs.ul_categories.querySelector("button");
    if (event.target == firstButton) {
        categoryUnchoosen();
        return;
    }
    refs.load_button.removeEventListener("click", loadMore);
    refs.load_button.removeEventListener("click", loadMoreByName);
    refs.load_button.addEventListener("click", loadMoreByCategory);
    STORAGE_KEYS.choosenCategory = event.target.textContent;
    loadMoreByCategory();
}

export async function loadMoreByCategory() {
    let list = await getProductsByCategories(STORAGE_KEYS.currentPage, STORAGE_KEYS.choosenCategory);
    if (isEmpty(list) == true) return;
    addProducts(list);
    STORAGE_KEYS.currentPage++;
}

export function categoryUnchoosen() {
    refs.load_button.removeEventListener("click", loadMoreByCategory);
    refs.load_button.removeEventListener("click", loadMoreByName);
    refs.load_button.addEventListener("click", loadMore);
    loadMore();
}

export function isEmpty(list) {
    if (list.length == 0) {
        refs.loader.classList.add("not-found--visible");
        return true;
    }
    return false;
}



export async function searchProduct(event) {
    event.preventDefault();


    STORAGE_KEYS.choosenName = event.target.elements.searchValue.value.trim();
    if (STORAGE_KEYS.choosenName == "") return;
    STORAGE_KEYS.currentPage = 1;
    const list = await getProductByName(STORAGE_KEYS.currentPage, STORAGE_KEYS.choosenName);
    refs.loader.classList.remove("not-found--visible");
    clearList();
    if (isEmpty(list) == true) {
        event.target.elements.searchValue.value = "";
        return;
    }
    addProducts(list);
    STORAGE_KEYS.currentPage++;

    refs.load_button.removeEventListener("click", loadMoreByCategory);
    refs.load_button.removeEventListener("click", loadMore);
    refs.load_button.addEventListener("click", loadMoreByName);
}


export async function loadMoreByName() {

    let list = await getProductByName(STORAGE_KEYS.currentPage, STORAGE_KEYS.choosenName);
    if (isEmpty(list) == true) return;
    addProducts(list);
    STORAGE_KEYS.currentPage++;
}


export async function cancelSearch() {
    refs.load_button.removeEventListener("click", loadMoreByCategory);
    refs.load_button.removeEventListener("click", loadMoreByName);
    refs.load_button.addEventListener("click", loadMore);
    STORAGE_KEYS.currentPage = 1;
    refs.loader.classList.remove("not-found--visible");
    clearList();
    refs.form_input.value = "";
    loadMore();

}