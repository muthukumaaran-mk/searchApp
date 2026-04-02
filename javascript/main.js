import { getSearchTerm, retriveSearchResult } from "./dataFunctions";
import { setSearchFocus, showClearTextButton } from "./searchBar";
import { deleteSearchResult, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResult";
import { setStatsLine } from "./searchResult";

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState) {
        initApp();
    }
});

const initApp = () => {
    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);
    
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
    const searchTerm = getSearchTerm();
    if(searchTerm === "") return;
    const resultArray = await retriveSearchResult(searchTerm);
    if(resultArray.length) buildSearchResults(resultArray);
    setStatsLine(resultArray.length);
};