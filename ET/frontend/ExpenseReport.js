axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const pagination = document.querySelector('.pagination');

getExpensesReportResponse(1);

// pagination functionality
pagination.addEventListener('click', async (e)=>{
    try {
        pagination.querySelector('#clicked').removeAttribute('id');
        e.target.closest('button').id = ('clicked');
        const page = e.target.closest('button').dataset.page;
        
        getExpensesReportResponse(page);

    } catch (error) {
        e.target.closest('button').id = ('clicked');
    }
})

// get list of expenses for specific page number

async function getExpensesReportResponse(page){
    try {

        const buttons = pagination.querySelectorAll('button');
        
        let response = await axios.get(`http://localhost:3000/premium/getmonthlyexpenses?page=${page}`)
        response = response.data;

        if(!response.hasNextPage){
            response.previousPage -= 1;
            response.currentPage -= 1;
            response.nextPage -= 1;
        }
        
        if(response.currentPage == 1){
            response.previousPage = 1;
            response.currentPage = 2;
            response.nextPage = 3;
        }

        buttons[0].dataset.page = response.previousPage;
        buttons[0].innerText = response.previousPage;
        buttons[1].dataset.page = response.currentPage;
        buttons[1].innerText = response.currentPage;
        buttons[2].dataset.page = response.nextPage;
        buttons[2].innerText = response.nextPage;

        const expenses = response.expenses;
        appendExpensesOnTable(expenses);

    } catch (error) {
        console.log(error);
    }
}

// display expenses on screen
function appendExpensesOnTable(expenses){
    const table = document.querySelector('.monthly').querySelector('table');
    const tableBody = table.querySelector('tbody');
    tableBody.innerHTML = '';

    expenses.forEach((expense,i, arr)=>{
        tableBody.appendChild(appndMonthlyRow(new Date(expense.createdAt).toLocaleDateString(), expense.description, expense.category, expense.amount, 0));
    })

    let sumOfAmount = 0;

    expenses.reduce((a,c)=>{
        sumOfAmount += Number(c.amount);
    },0);
    
    tableBody.appendChild(appndMonthlyRow('','' ,'' , sumOfAmount, 0));
    const tr = tableBody.lastChild;
    const income = tr.lastChild.previousSibling;
    const expense = tr.lastChild;

    income.classList.add('income');
    expense.classList.add('expense');

    const savings = table.querySelector('tfoot').querySelector('#savings');

    savings.innerText = `Savings = $ ${sumOfAmount}`;
    
}

// append row with input data on table
function appndMonthlyRow(data1, data2, data3, data4, data5){
    
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    
    td1.innerText = data1;
    td3.innerText = data2;
    td2.innerText = data3;
    td4.innerText = data4;
    td5.innerText = data5;

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)

    return tr;
    
}