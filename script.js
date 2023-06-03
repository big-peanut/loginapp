document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myform');
    const userList = document.getElementById('userlist');

    // Function to display the list on page load
    function displayListOnLoad() {
        for (let i = 0; i < localStorage.length; i++) {
            const email = localStorage.key(i);
            displayDetails(email);
        }
    }

    // Function to add user details to localStorage and display them
    function addDetails(nameInput, emailInput, phoneInput) {
        const user = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value
        };

        axios.post("https://crudcrud.com/api/33774df2b1364c7f942135b331f95bc0/appointmentDataNEW", user)
            .then((res) => console.log(res.data.email))
            .catch((err) => console.log(err))
        displayDetails();
    }

    // Function to display user details
    function displayDetails() {
        axios.get("https://crudcrud.com/api/33774df2b1364c7f942135b331f95bc0/appointmentDataNEW")
            .then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${res.data[i].name}, Email: ${res.data[i].email}, Phone: ${res.data[i].phone}`;
                    userList.appendChild(listItem);
                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';
                    editBtn.addEventListener('click', () => {
                        editUser(res.data[i]._id, listItem);
                    });
                    listItem.appendChild(editBtn);

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    deleteBtn.addEventListener('click', () => {
                        deleteUser(res.data[i]._id, listItem);
                    })
                    listItem.appendChild(deleteBtn);
                }
            })
            .catch((err) => console.log(err))
    }

    // Add submit event listener to the form
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        addDetails(nameInput, emailInput, phoneInput);

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    });

    // Display the list on page load
    displayListOnLoad();
    function deleteUser(userId, listItem) {
        axios
            .delete(`https://crudcrud.com/api/33774df2b1364c7f942135b331f95bc0/appointmentDataNEW/${userId}`)
            .then(() => {
                userList.removeChild(listItem);
            })
            .catch((err) => console.log(err));
    }

    function editUser(userId, listItem) {
        const newName = prompt('Enter new name:');
        axios
          .put(`https://crudcrud.com/api/33774df2b1364c7f942135b331f95bc0/appointmentDataNEW/${userId}`, { name: newName })
          .then(() => {
            listItem.firstChild.textContent = `Name: ${newName}, Email: ${listItem.firstChild.textContent.split(',')[1]}, Phone: ${listItem.firstChild.textContent.split(',')[2]}`;
          })
          .catch((err) => console.log(err));
      }
});
