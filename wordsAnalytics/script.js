const textarea = document.querySelector(".textarea");
let textareaValue = "";

const numberOfWords = document.querySelector(".stat__number--words");
let numberOfWordsAsNumber = 0;

const numberOfCharacters = document.querySelector(".stat__number--characters");
let numberOfCharactersAsNumber = 0;

const numberOfTwitterWordsLeft = document.querySelector(".stat__number--twitter");
const maxTwitterWords = 280;
let numberOfTwitterWordsLeftAsNumber = maxTwitterWords;

const numberOfFacebookWordsLeft = document.querySelector(".stat__number--facebook");
const maxFacebookWords = 2200;
let numberOfFacebookWordsLeftAsNumber = maxFacebookWords;

textarea.addEventListener("input", count);

function count () {
    textareaValue = textarea.value;
    console.log(textareaValue);

    if (textareaValue) {
        const words = textareaValue.split(/\s+/).filter(Boolean);
        numberOfWordsAsNumber = words.length;
        numberOfCharactersAsNumber = words.reduce((acc, word) => acc + word.length, 0);
        numberOfTwitterWordsLeftAsNumber = numberOfTwitterWordsLeftAsNumber < 0 ? 0 : maxTwitterWords - numberOfWordsAsNumber;
        numberOfFacebookWordsLeftAsNumber = numberOfFacebookWordsLeftAsNumber < 0 ? 0 : maxFacebookWords - numberOfWordsAsNumber;
    }
    
    numberOfWords.textContent = numberOfWordsAsNumber;
    numberOfCharacters.textContent = numberOfCharactersAsNumber;
    numberOfTwitterWordsLeft.textContent = numberOfTwitterWordsLeftAsNumber;
    numberOfFacebookWordsLeft.textContent = numberOfFacebookWordsLeftAsNumber;
}

/* setTimeout(() => {
    console.log('hi');
}, 2000);

setInterval(() => {
    console.log("doodooshark")
}, 3000); */




/* textarea.addEventListener("input", () => {
    textareaValue = textarea.value;
    console.log(textareaValue);
    numberOfWordsAsNumber = textareaValue ? textareaValue.split(/\s+/).filter(Boolean).length : 0;
    numberOfWords.textContent = numberOfWordsAsNumber;
    numberOfCharactersAsNumber = textareaValue ? textareaValue.split(/\s+/).reduce((acc,word) => acc + word.length, 0) : 0;
    numberOfCharacters.textContent = numberOfCharactersAsNumber;
    numberOfTwitterWordsLeftAsNumber = numberOfTwitterWordsLeftAsNumber < 0 ? 0 : maxTwitterWords - numberOfWordsAsNumber;
    numberOfTwitterWordsLeft.textContent = numberOfTwitterWordsLeftAsNumber;
    numberOfFacebookWordsLeftAsNumber = numberOfFacebookWordsLeftAsNumber < 0 ? 0 : maxFacebookWords - numberOfWordsAsNumber;
    numberOfFacebookWordsLeft.textContent = numberOfFacebookWordsLeftAsNumber;
}); */

/* const str = 'The quick brown fox jumps over the lazy dog.';

const words = str.split(' ');
console.log(words);
// Expected output: "fox"

const chars = str.split('');
console.log(chars);
// Expected output: "k"

const strCopy = str.split();
console.log(strCopy); */
