const form = document.querySelector('form');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const bookname = e.target.book.value.trim();

        axios.post('http://localhost:3000/taken/books', {
            bookname : bookname,
        })
        .then((result)=>{
            createCard(result.data);
            form.reset();
        })
        .catch((err)=>{
            console.log('error while taking book', err);
        })
})

// create card to display data on document body

function createCard(data){
    const takenBook = document.querySelector('.takenBooks');
    const card = document.createElement('div');
    card.className = 'card col-md-4 mb-2 m-2';
    card.style.width = '18rem';
    card.style.padding = '10px';
    card.style.backgroundColor = '#515151'
    card.style.color = '#fff';

        
        let date = new Date(data.createdAt);
        let takenDate = date.toDateString() +' '+ date.toTimeString();

        date.setHours(date.getHours()+1);
        let returnDate = date.toDateString() +' '+ date.toTimeString();

        let duration = new Date().getHours() - new Date(returnDate).getHours(); 

        duration = duration >0?duration:0;        
        let fine = (duration)*10;
    
        card.innerHTML = `
        <p class="mb-3 mt-3 bookname"  data-bookname = '${data.bookname}'>Book Name : ${data.bookname} </p>
        <p class="mb-3 takenDate">Book Taken On : ${takenDate}</p>
        <p class="mb-3 returnDate" data-returnDate="${returnDate}">Book Return Date : ${returnDate}</p>
        <p class="mb-3 fine" data-fine = '${fine}' >Current Fine: ${fine} </p>
        <button class="btn btn-success returnBtn" data-id ='${data.id}'>Return Book</button>
    `

    createReturnBookCard(card);

    takenBook.appendChild(card);
}


// get data from database and append on body after reloading
document.addEventListener('DOMContentLoaded', (e)=>{
    // display taken books
    axios.get('http://localhost:3000/taken/books')
    .then((result)=>{
        Array.from(result.data).forEach(element=>{
            createCard(element);
        })
    })
    .catch((err)=>{
        console.log('error while taking book', err);
    })
  

    // display returned books
    axios.get('http://localhost:3000/return/books')
.then((response)=>{
        let data = response.data;
        data.forEach((e)=>{
            displayReturnedBooks(e);
        })
    })
    .catch((err)=>{
        console.log('Error getting returned books');
    })
       
});


//after returning book, delete it from DB 
function createReturnBookCard(card){
    let returnBtn = card.querySelector('.returnBtn');
    let id = returnBtn.dataset.id;

    let fine = card.querySelector('.fine').dataset.fine;
    
    let bookname = card.querySelector('.bookname').dataset.bookname;

    const payBtn = document.createElement('button');
    payBtn.textContent = `You have to pay : ${fine}`
    payBtn.className = 'btn btn-danger';

    returnBtn.addEventListener('click', (e)=>{

            if(fine>0){
                card.innerText = '';
                card.appendChild(payBtn);
                payBtn.addEventListener('click', (e)=>{
                    returnBook(bookname, fine, id);
                })
            }else{
                returnBook(bookname, 0, id);
            }

            card.style.display = 'none';
    });

}


function returnBook(bookname, fine,id){
    axios.post('http://localhost:3000/return/books', {
        bookname, fine
    })
    .then((result)=>{
        displayReturnedBooks({
            bookname : bookname,
            fine : fine,
            createdAt : new Date()
        });
        return axios.delete(`http://localhost:3000/taken/books/${id}`)
    })
    .catch((err)=>{
        console.log('error while taking book', err);
    })

}

function displayReturnedBooks(data){
    const returnedBooks = document.querySelector('.returnedBooks');
    const card = document.createElement('div');
    card.className = 'card col-4 mb-2 m-2';
    card.style.width = '18rem';
    card.style.padding = '10px';
    card.style.backgroundColor = '#515151'
    card.style.color = '#fff';

    card.innerHTML = `<p>Book Name : ${data.bookname} </p>
            <p>Fine : ${data.fine}</p>
            <p>Returned On : ${new Date(data.createdAt)}</p>
`
    returnedBooks.appendChild(card);
}

