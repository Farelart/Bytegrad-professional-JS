const newUser = {
    name: "Maria",
    job: "Teacher"
};

fetch('https://reqres.in/api/users', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
});

fetch('https://reqres.in/api/users')
    .then(response => {
        if(!response.ok) {
            throw new Error('Problem');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log(data.data[2].first_name);
    })
    .catch(error => console.log(error));