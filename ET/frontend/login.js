const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('http://localhost:3000/user/login', {email, password})
    .then((result)=>{
        console.log(result.data);
        form.reset();
    })
    .catch((err)=>{
        console.log(err);
    })
})