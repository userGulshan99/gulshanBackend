axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const user = localStorage.getItem('token')
if(!user){
    window.location.href = './login.html';
}


const form = document.querySelector('form');
const ul = document.querySelector('ul');

//to add new expense in database and in ul on frontend
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

        axios.post(`http://localhost:3000/expense/addExpense`, {amount, description, category})
        .then((result)=>{
            addIntoList(result.data);
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.data.Error == "user not found" ){
                localStorage.clear();
            }
        })

        form.reset();
})

// function to add expense in ul
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

// get again all expenses from database

document.addEventListener('DOMContentLoaded', (e)=>{
    axios.get('http://localhost:3000/expense/getExpenses')
    .then((data)=>{
        data.data.forEach(expense => {
            addIntoList(expense);
        });
    })
    .catch((err)=>{
        if(err.status === 404){
            console.log('No expense found');
        }
        
        if((err.status === 401) || (err.response.data.Error == 'user not found')){
            localStorage.removeItem('token');
        }
      
    })
})


const premiumBtn = document.querySelector('#premium');


// to add premium membership
axios.get('http://localhost:3000/checkpremium')
.then((response)=>{
    if(response.status == 200){
        premiumBtn.innerText = 'Premium User';
    }
})
.catch((err)=>{
    premiumBtn.addEventListener('click', async (e)=>{
    try {
        const response = await axios.get('http://localhost:3000/purchase/premiummembership');

        const key = response.data.key_id;
        const order_id = response.data.order.id;

        var options = {
            'key' : key,
            'order_id' : order_id,
            'handler' : async  (resp) => {
               try {
                await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                     order_id : order_id,
                     payment_id : resp.razorpay_payment_id,
                     status : "SUCCESS"
                 })

                 e.target.innerText = 'Premium User';

                 alert('You are a Premium User Now');
               } catch (error) {
                    console.log(error);
                    
                    alert('Transaction failed, please try again');
               }
            }
        };
    
        const rzp1 = new Razorpay(options);
        rzp1.open();
    
        rzp1.on('payment.failed', async (response)=>{

            axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                order_id : order_id,
                payment_id : response.error.metadata.payment_id,
                status : "FAILED"
            })
            .then(()=>{
                alert('Something went wrong');
            })
            .catch((err)=>{
                console.log(err);
            })            
        })

    } catch (error) {
        console.log(error);
        alert('Transaction failed, please try again');
    }
    
})

})
