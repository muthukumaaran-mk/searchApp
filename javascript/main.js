import { getSearchTerm } from "./dataFunctions";
import { setSearchFocus } from "./searchBar";

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
};

const submitTheSearch = (event) => {
    event.preventDefault();
    processTheSearch();
    setSearchFocus();
};

const processTheSearch = async() => {
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return;
    const resultArray = await retriveSearchResults(searchTerm);
};