const token = localStorage.getItem('token')

if(token){
    window.location.href = './expense.html';
}

const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post(`${CONFIG.BASE_URL}/user/login`, {email, password})
    .then((result)=>{
        localStorage.setItem('token', result.data.token);
        form.reset();
        alert('User logged in successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
})