import { getSearchTerm, retriveSearchResult } from "./dataFunctions.js";
import { clearSearchText, setSearchFocus, showClearTextButton, clearPush } from "./searchBar.js";
import { deleteSearchResult, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResult.js";

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
};

const submitTheSearch = (event) => {
    event.preventDefault();
    deleteSearchResult();
    processTheSearch();
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