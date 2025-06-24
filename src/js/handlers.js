// Функції, які передаються колбеками в addEventListners
import { getProducts, getProductsByCategories, getProductById, getProductByName } from "./products-api";
import { addProducts, clearList, addModal, removeModal } from "./render-function";
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

export async function cardOpened(event) {
    const li = event.target.closest("li");
    if (!li) return;

    const data = await getProductById(li.dataset.id);
    addModal(data);
}

export function cardClosed() {
    removeModal();
}

export async function searchProduct(event) {
    event.preventDefault();


    STORAGE_KEYS.choosenName = refs.form_input.value.trim();
    if (STORAGE_KEYS.choosenName == "") return;
    STORAGE_KEYS.currentPage = 1;
    const list = await getProductByName(STORAGE_KEYS.currentPage, STORAGE_KEYS.choosenName);
    clearList();
    if (isEmpty(list) == true) return;
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
