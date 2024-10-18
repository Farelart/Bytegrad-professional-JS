/* 
TUTO

fetch('https://jsonplaceholder.typicode.com/todos/') // this step return a promise
        .then((res) => { // this step returns the metadata that we can then converts into json
            if (!res.ok) {
                console.log("Problem");
            }
            return res.json();
        })
        .then((data) => { // and here we actually get the object data
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        }); */
const ul = document.querySelector('ul');

fetch('https://jsonplaceholder.typicode.com/users/')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.forEach(element => {
            console.log(data);
            const li = document.createElement("li");
            li.textContent = element.name;
            ul.appendChild(li);

            const markup = `<li>${element.email}</li>`;
            ul.insertAdjacentHTML('beforeend', markup);
        });
    })
    .catch(error => console.log(error));