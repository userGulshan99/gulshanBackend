const user = localStorage.getItem('token')
if(!user){
    window.location.href = './login.html';
}

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const form = document.querySelector('form');
const ul = document.querySelector('ul');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

        axios.post(`http://localhost:3000/expense/addExpense`, {amount, description, category})
        .then((result)=>{
            console.log(result.data);
            
            addIntoList(result.data);
        })
        .catch((err)=>{
            console.log(err);
        })

        form.reset();
})


function addIntoList(obj){
    const li = document.createElement('li');
    li.className = 'expense';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-expense');
    deleteBtn.innerText = 'Delete';

    deleteBtn.addEventListener('click', (e)=>{
        e.target.parentElement.remove();
        
        axios.delete(`http://localhost:3000/expense/deleteExpense/${obj.id}`)
        .then((result)=>{
            alert('Expense deleted successfully');
        })
        .catch((err)=>{
            console.log(err);
        })
    })

    li.innerHTML = `${obj.amount} - ${obj.description} - ${obj.category}`;
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded', (e)=>{
    axios.get('http://localhost:3000/expense/getExpenses')
    .then((data)=>{
        data.data.forEach(expense => {
            addIntoList(expense);
        });
    })
})