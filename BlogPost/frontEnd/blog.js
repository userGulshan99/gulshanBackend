const form = document.querySelector('.input-form');
const data = {};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = e.target.title.value;
    let author = e.target.author.value;
    let content = e.target.content.value;

    data.title = title;
    data.author = author;
    data.content = content;

    outputData(data);

    axios.post('http://localhost:3000/blogs',data)
    .then((result)=>{}).catch((err)=>{
        console.log(err);
    })
     
    e.target.title.value = '';
    e.target.author.value = '';
    e.target.content.value = '';
});

function outputData(data) {
    const outputContent = document.querySelector('.output');

    const html = `
        <div class="card-title" style="display: flex;gap:90%">
            ${data.title} 
            <button class="expand">+</button>
            <input type="hidden" id="id" value="${data.id}">
        </div>
        <div class="card-content" style="display: none;">
            <h3>${data.author}</h3>
            <p>${data.content}</p>
            <hr>
            <strong>Comments:</strong>
            <br><br>
            <div style="display: flex; width: 100%;">
                <input type="text" class="comment_input" placeholder="Write a comment here">
                <button type="button" class="addComment btn">Add Comment</button>
            </div>
            <ul class="comments" style="list-style-type: none; padding: 0;"></ul>
        </div>`;

    const card = document.createElement('div');
    card.className = 'output-card';
    card.innerHTML = html;
    card.style.marginBottom = '30px';
    outputContent.appendChild(card);

    const expandButton = card.querySelector('.expand');
    const cardContent = card.querySelector('.card-content');

    expandButton.addEventListener('click', () => {
        if(cardContent.style.display === 'none'){
            cardContent.style.display = 'block';
            expandButton.textContent = '-';
        }else{
            cardContent.style.display = 'none'
            expandButton.textContent = '+';
        }
    });

    displayComments(card);
}

function displayComments(card) {
    const addCommentBtn = card.querySelector('.addComment');
    const commentInput = card.querySelector('.comment_input');
    const commentsList = card.querySelector('.comments');

    const id = card.querySelector('#id');

    axios.get(`http://localhost:3000/comments/${id.value}`).then((result)=>{
        const comment = result.data;
        
        comment.forEach((element)=>{
            const li = document.createElement('li');
            li.textContent = element.comment;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'btn';

            deleteBtn.addEventListener('click', () => {
                li.remove();
                axios.delete(`http://localhost:3000/comments/${element.id}`).then((result)=>{
                }).catch((err)=>{
                    console.log(err);
                })
            });

            
            deleteBtn.style.width = '30%'
            li.appendChild(deleteBtn);

            commentsList.appendChild(li);
        })
    }).catch((err)=>{
        console.log(err);
    })


    
    addCommentBtn.addEventListener('click', () => {
        const commentText = commentInput.value;
       
        const li = document.createElement('li');
        li.textContent = commentText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });
        
        
        deleteBtn.style.width = '30%'
        li.appendChild(deleteBtn);

        commentsList.appendChild(li);

        axios.post(`http://localhost:3000/comments/${id.value}`, {
            comment : commentText
        }).then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    });
}


document.addEventListener('DOMContentLoaded',async ()=>{
    try {
        let blogs = await axios.get('http://localhost:3000/blogs');
        blogs = blogs.data;
        blogs.forEach(element => {
            outputData(element);
        });
    } catch (error) {
        console.log(error);
    }
})