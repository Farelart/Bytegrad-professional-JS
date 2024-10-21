const btnEl = document.querySelector('.btn');

const clickHander = async () => {
    try {
        const response = await fetch('https://reqres.in/api/users');
        const data = await response.json();

        if(!response.ok) {
            console.log('Problem');
            return;
        }
        
        console.log(data.data[1]);
    } catch(error) {
        console.log(error);
    }
    

    /* fetch('https://reqres.in/api/users')
        .then(response => {
            if(!response.ok) {
                console.log('Problem');
                return;
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        }); */
}

btnEl.addEventListener('click', clickHander);