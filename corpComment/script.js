// -- GLOBAL --
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
const hashtagListEl = document.querySelector(".hashtags");

const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';
const MAX_CHARS = 150;
let textareaValue = "";
let numberOfCharactersAsNumber = 0;
let countAsNumber = null;

function renderFeedbackItem (feedbackItem) {
    // new feedback item HTML
    const feedbackItemHTML = `
            <li class="feedback">
                <button class="upvote">
                    <i class="fa-solid fa-caret-up upvote__icon"></i>
                    <span class="upvote__count">${feedbackItem.upvoteCount}</span>
                </button>
                <section class="feedback__badge">
                    <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
                </section>
                <div class="feedback__content">
                    <p class="feedback__company">${feedbackItem.company}</p>
                    <p class="feedback__text">${feedbackItem.text}</p>
                </div>
                <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
            </li>
    `;

    // insert new feedback item in list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

}

// -- COUNTER COMPONENT --
textareaEl.addEventListener("input", inputHandler);

function inputHandler () {
    textareaValue = textareaEl.value;
    if (textareaValue) {
        numberOfCharactersAsNumber = textareaValue.length;
        countAsNumber = countAsNumber < 0 ? 0 : MAX_CHARS - numberOfCharactersAsNumber;
    }

    counterEl.textContent = countAsNumber;
};


// -- FORM COMPONENT --
formEl.addEventListener("submit", submitHandler);

function showVisualIndicator (textCheck) {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid'
    // show valid indicator
    formEl.classList.add(className);

    // remove visual indicator
    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000);
}

function submitHandler (event) {
    // prevent default browser action (submitting form data to 'action'-address and refreshing page)
    event.preventDefault();
    const text = textareaEl.value;
    console.log(text);

    // validate text (e.g check if #hashtag is present and text is long enough)
    if(text.includes("#") && text.length >= 5) {
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');

        // focus textarea
        textareaEl.focus();

        // stop this function execution
        return;
    }

    // we have text, now extract other info from text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    console.log(hashtag);
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // create feedback item object
    const feedbackItem = {
        upvoteCount: upvoteCount,
        badgeLetter: badgeLetter,
        company: company,
        daysAgo: daysAgo,
        text: text,
    };

    // render feedback Item
    renderFeedbackItem(feedbackItem);
    
    // send feed back item to server
    fetch(`${BASE_API_URL}/feedbacks`, {
        method: 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(!response.ok) {
            console.log('Something went wrong');
            return;
        }

        console.log('Sucessfully submitted');
    }).catch(error => {
        console.log(error);
    });

    // clear textarea
    textareaEl.value = "";

    // blur submit button
    submitBtnEl.blur();

    // reset counter
    counterEl.textContent = MAX_CHARS;
}

// -- FEEDBACK LIST COMPONENT --
fetch(`${BASE_API_URL}/feedbacks`)
    .then(response => response.json())
    .then(data => {
        // remove spinner 
        spinnerEl.remove();
        data.feedbacks.forEach(feedback => renderFeedbackItem(feedback));
    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedbacks items. Error message: ${error.message}`;
    });

function clickHandler(event) {
    // get clicked HTML element
    const clickedEL = event.target
    console.log(clickedEL);

    // determine if user intended to upvote or expand
    const upvoteIntention  = clickedEL.className.includes('upvote');

    // run the appropriate logic
    if (upvoteIntention) {
        // get the closest upvote button
        const upvoteBtnEl = clickedEL.closest('.upvote');

        // disable upvote button (prevent doucle-clicks, spam)
        upvoteBtnEl.disabled = true;

        // select the upvote count element within the upvote button
        const upvoteCountEL = upvoteBtnEl.querySelector('.upvote__count');

        // get currently displayed upvote count as number (+)
        let upvoteCount = +upvoteCountEL.textContent;

        // set upvote count incremented by 1
        upvoteCountEL.textContent = upvoteCount++;
    } else {
        // expand the clicked item
        clickedEL.closest('.feedback').classList.toggle('feedback--expand');
    }
}

feedbackListEl.addEventListener('click', clickHandler);

// -- HASHTAG LIST COMPONENT --
function clickHandler2(event) {
    // get the clicked element
    const clickedEL = event.target;

    // stop function if click happened in list, but outside buttons
    if(clickedEL.className === 'hashtags') return;

    // extract company name
    const companyNameFromHashtag = clickedEL.textContent.substring(1).toLowerCase().trim();

    //iterate over each feedback item in the list
    [...feedbackListEl.children].forEach(childElement => {
        // extract company name (check if the element exists first)
        const companyElement = childElement.querySelector('.feedback__company');

        if (companyElement) {
            const companyNameFromFeedbackItem = companyElement.textContent.toLowerCase().trim();

            // remove feedback item from list if company names are not equal
            if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
                childElement.remove();
            }
        }
    });
}

hashtagListEl.addEventListener('click', clickHandler2);