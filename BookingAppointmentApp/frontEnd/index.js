    // function to display user details
    function displayUser (user){
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `${user.username} - ${user.email} - <button onclick="editUser(${user.id})" class='edit'>Edit</button> - <button onclick="deleteUser(${user.id})">Delete</button>`;
        document.getElementById('bookings').appendChild(li);
        

    }
    
    // fetch and display data on screen
    async function getData() {
        try {
        let data = await  axios.get('http://localhost:3000/users');
        data = data.data;
        data = Array.from(data);      

        data.forEach((element) => {
            displayUser(element);
        });
                
        } catch (error) {
            console.log(error);
        }
    }
    getData();

    //delete user details from database
    function deleteUser(id) {
        event.target.parentElement.remove();

        axios.delete(`http://localhost:3000/users/delete-user/${id}`).then((data)=>{
        }).catch((err)=>{
            console.log(err);
        })
    }

    //edit user details
    async function editUser (id) {
         try{
            event.target.parentElement.remove();
        let data =  await axios.get(`http://localhost:3000/users/edit-user/${id}`);
        data = data.data;

        let form = document.querySelector('form');

        form.username.value = data.username;
        form.phonenumber.value = data.phonenumber;
        form.email.value = data.email;
        form.id.value = data.id;

        }catch(err){
            console.log(err);
        }
    }


// method to submit data after new entry or edit
    
document.querySelector('form').addEventListener('submit', async (event)=>{
    
        event.preventDefault();
        const data = {
            username : event.target.username.value,
            phonenumber : event.target.phonenumber.value,
            email : event.target.email.value
        };
            
        event.target.username.value = '';
        event.target.phonenumber.value = '';
        event.target.email.value = '';

        displayUser(data);

        let route = '';

        if(event.target.id.value){
            route = `http://localhost:3000/users/edit-user/${event.target.id.value}`;
        }
        else{
            route = 'http://localhost:3000/';
        }
        
        axios.post(route ,data)
        .then((event)=>{
        }).catch((err)=>{
            console.log(err);
        });

    })
