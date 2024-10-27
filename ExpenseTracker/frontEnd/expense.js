// delete list item from list and database
function deleteExpense(id){
    event.target.parentElement.remove();
    axios.delete(`http://localhost:3000/expense/delete-expense/${id}`).then((data)=>{
    }).catch((err)=>{
        console.log(err);
    })
}

// edit list item from list and database
async function editExpense(id){
    try{
        event.target.parentElement.remove();
    let data =  await axios.get(`http://localhost:3000/expense/edit-expense/${id}`);
    data = data.data;

    let form = document.querySelector('form');

    form.expenseamount.value = data.expenseamount;
    form.category.value = data.category;
    form.description.value = data.description;
    form.id.value = data.id;

    }catch(err){
        console.log(err);
    }
}

// display expense
function displayExpense (expense){
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `Rs : ${expense.expenseamount} - ${expense.category} - ${expense.description} - <button onclick="editExpense(${expense.id})" class='edit'>Edit Expense</button> - <button onclick="deleteExpense(${expense.id})">Delete</button>`;
    document.querySelector('.list-group').appendChild(li);
}

// get data from backend to display on front-end
async function getData() {
    try {
    let data = await  axios.get('http://localhost:3000/expense');
    data = data.data;
    data = Array.from(data);      

    data.forEach((element) => {
        displayExpense(element);
    });
            
    } catch (error) {
        console.log(error);
    }
}
getData();


const form = document.querySelector('form');
// save data into backend after submit
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const data = {
        expenseamount : event.target.expenseamount.value,
        category : event.target.category.value,
        description : event.target.description.value
    };
    
    event.target.expenseamount.value = '';
    event.target.category.value = '';
    event.target.description.value = '';
    
    displayExpense(data);

    let route = '';
    if(event.target.id.value){
        route = `http://localhost:3000/expense/edit-expense/${event.target.id.value}`;
    }
    else{
        route = 'http://localhost:3000/expense';
    }

    axios.post(route, data)
    .then((response)=>{
    }).catch((err)=>{
        console.log(err);
    });

})
