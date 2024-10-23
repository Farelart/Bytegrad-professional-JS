import { errorTextEl, errorEl, DEFAULT_DISPLAY_TIME } from "../common.js";

const renderError = (message = 'Something went wrong') => {
    errorTextEl.textContent = message;
        errorEl.classList.add("error--visible");
        setTimeout(() => {
            errorEl.classList.remove("error--visible");
        }, DEFAULT_DISPLAY_TIME);
        return;
}

export default renderError;