import { searchInputEl, searchFormEl, jobListSearchEl, numberEl, BASE_API_URL } from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const submitHandler = async (event) => {
    // prevent default behavior
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    // blur input
    searchInputEl.blur();

    // remove previous job items
    jobListSearchEl.innerHTML = '';

    // render spinner
    renderSpinner('search');

    // fetch search results
    
    try {
        const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
        const data = await response.json();

        if(!response.ok) {
            throw new Error (data.description);
        }

        // extract job items
        const { jobItems } = data;

        console.log(jobItems);

        // remove spinner
        renderSpinner('search');

        // render number of results
        numberEl.textContent = jobItems.length;

        // render job items in the search job list
        renderJobList(jobItems);
    } catch (error) {
        renderSpinner('search');
        renderError(error.message);
    }


    /* fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
        .then(response => {
            if(!response.ok) {
                throw new Error ('Resource issue (e.g. resource doesn\'t exist) or server issue');
            }
            return response.json()
        })
        .then(data => {
            // extract job items only
            const { jobItems } = data;

            console.log(jobItems);

            // remove spinner
            renderSpinner('search');

            // render number of results
            numberEl.textContent = jobItems.length;

            // render job items in the search job list
            renderJobList(jobItems);
        })
        .catch(error => { // network problem or other errors (e.g. trying to parse something not JSON as JSON)
            renderSpinner('search');
            renderError(error.message);
        }); */
}

searchFormEl.addEventListener('submit', submitHandler);