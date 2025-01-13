const user = localStorage.getItem('user')

if(user){
    window.location.href = './expense.html';
}

const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('http://localhost:3000/user/login', {email, password})
    .then((result)=>{
        localStorage.setItem('user', JSON.stringify(result.data.user));
        form.reset();
        alert('User logged in successfully');
    })
    .catch((err)=>{
        console.log(err);
    })
})