import { getSearchTerm, retriveSearchResult } from "./dataFunctions.js";
import { clearSearchText, setSearchFocus, showClearTextButton, clearPush, activateSearchView} from "./searchBar.js";
import { deleteSearchResult, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResult.js";

window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState) {
        initApp();
    }
});

const initApp = () => {
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);
    const clear =document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPush);
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
    setSearchFocus();
};

const submitTheSearch = async(event) => {
    event.preventDefault();
    deleteSearchResult();
    await processTheSearch();
    activateSearchView();
    setSearchFocus();
};

const processTheSearch = async() => {
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if(searchTerm === "") return;
    const resultArray = await retriveSearchResult(searchTerm);
    if(resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length);
};