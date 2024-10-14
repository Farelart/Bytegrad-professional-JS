const valueTag = document.querySelector(".counter__value");
let  currentValueNumber = parseInt(valueTag.textContent);

const resetButton = document.querySelector(".counter__reset--button");
const minusButton = document.querySelector(".counter__button--decrease");
const plusButton = document.querySelector(".counter__button--increase");
const counterTitle = document.querySelector(".counter__title");
const counterApp = document.querySelector(".counter");

plusButton.addEventListener("click", increment);
minusButton.addEventListener("click", decrement);
resetButton.addEventListener("click", reset);

function increment() {
    if(currentValueNumber < 5) {
        ++currentValueNumber;
    } else {
        counterTitle.textContent = "Limit! Buy pro for > 5";
        counterApp.classList.add("counter--limit");
        plusButton.disabled = true;
        minusButton.disabled = true;
    }
    valueTag.textContent = currentValueNumber;
}

function decrement() {
    currentValueNumber = currentValueNumber > 0 ? --currentValueNumber : 0;
    valueTag.textContent = currentValueNumber;
    counterTitle.textContent = "Fancy counter";
    counterApp.classList.remove("counter--limit");
    plusButton.disabled = false;
    minusButton.disabled = false;
    /* counterApp.style.opacity = 1; */
}

function reset() {
    currentValueNumber = 0;
    valueTag.textContent = currentValueNumber;
    counterTitle.textContent = "Fancy counter";
    counterApp.classList.remove("counter--limit");
    plusButton.disabled = false;
    minusButton.disabled = false;
    /* counterApp.style.opacity = 1; */
}