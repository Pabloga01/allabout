
const tableUsersContent = document.querySelector('#bodyUserContent');
const tableEventsContent = document.querySelector('#bodyEventContent');
const tablePublicationsContent = document.querySelector('#bodyPublicationContent');
const tableCategoriesContent = document.querySelector('#bodyCategoryContent');


// TODO implementacion para el template con nombre de usuario
// TODO separar plantilla de template de paginas

//const storage = require('node-sessionstorage');
// if (typeof storage.getItem('id_user') !== 'undefined') {
//     const userNameText = document.querySelector('#userName');
//     let user = new User({ id_user: storage.getItem('id_user') });
//     (async () => {
//         user = await user.loginAdmin();
//         if (user != false) userNameText.innerHTML = user._mail;
//     })()
// }


//loads data user values
loadUsers().then(userList => {
    console.log(userList);
    const headerList = ['name', 'surname', 'usertag', 'nationality', 'rank', 'admin', 'mail', 'password', 'address']
    userList.forEach(user => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof user[headerName] !== 'undefined') td.innerHTML = user[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
        const id = ['editUser', 'deleteUser'];
        const values = ['edit', 'remove'];
        const types = ['btn-warning', 'btn-danger'];
        for (let i = 0; i < 2; i++) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add('rounded', types[i]);
            button.innerHTML = values[i];
            button.id = id[i];
            if (i == 0) {
                button.onclick = () => {
                    const mailOnRow = button.parentNode.parentNode.children[6].innerHTML;
                    (async () => {
                        const response = await fetch('http://localhost:3000/backend/api/userquerybymail/' + mailOnRow);
                        const data = await response.json();
                        if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/useredit/' + data._id_user;
                    })()
                };
            } else {
                button.onclick = () => {
                    deleteUser(button);
                };
            }
            td.appendChild(button);
            tr.appendChild(td);
        }
        tableUsersContent.appendChild(tr);
    });
});
async function loadUsers() {
    const response = await fetch('http://localhost:3000/backend/api/users');
    const data = await response.json();
    return data;
}


//loads data event values
loadEvent().then(eventList => {
    const headerList = ['id_event', 'title', 'content', 'cat_name', 'date', 'upvotes', 'description', 'latitude', 'longitude']
    eventList.forEach(event => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof event[headerName] !== 'undefined') td.innerHTML = event[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
        const id = ['editEvent', 'deleteEvent'];
        const values = ['edit', 'remove'];
        const types = ['btn-warning', 'btn-danger'];
        for (let i = 0; i < 2; i++) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add('rounded', types[i]);
            button.innerHTML = values[i];
            button.id = id[i];
            if (i == 0) {
                button.onclick = () => {
                    const idOnRow = button.parentNode.parentNode.children[0].innerHTML;
                    (async () => {
                        const response = await fetch('http://localhost:3000/backend/api/eventQueryById/' + idOnRow);
                        const data = await response.json();
                        if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/eventedit/' + data._id_event;
                    })()
                };
            } else {
                button.onclick = () => {
                    deleteEvent(button);
                };
            }
            td.appendChild(button);
            tr.appendChild(td);
        }
        tableEventsContent.appendChild(tr);
    });
});

async function loadEvent() {
    const response = await fetch('http://localhost:3000/backend/api/events');
    const data = await response.json();
    return data;
}


//loads data publication values
loadPublication().then(publicationList => {
    console.log(publicationList);
    const headerList = ['id_publication', 'content', 'usertag', 'cat_name', 'date', 'popularity', 'description', 'country']
    publicationList.forEach(publication => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof publication[headerName] !== 'undefined') td.innerHTML = publication[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
        const id = ['editPublication', 'deletePublication'];
        const values = ['edit', 'remove'];
        const types = ['btn-warning', 'btn-danger'];
        for (let i = 0; i < 2; i++) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.classList.add('rounded', types[i]);
            button.innerHTML = values[i];
            button.id = id[i];
            if (i == 0) {
                button.onclick = () => {
                    const idOnRow = button.parentNode.parentNode.children[0].innerHTML;
                    (async () => {
                        const response = await fetch('http://localhost:3000/backend/api/publicationquerybyid/' + idOnRow);
                        const data = await response.json();
                        if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/publicationedit/' + data._id_publication;
                    })()
                };
            } else {
                button.onclick = () => {
                    deletePublication(button);
                };
            }
            td.appendChild(button);
            tr.appendChild(td);
        }
        tablePublicationsContent.appendChild(tr);
    });
});




loadCategories().then(categoriesList => {
    console.log(categoriesList);
    const headerList = ['id_category', 'cat_name', 'description', 'popularity_cat']
    categoriesList.forEach(category => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof category[headerName] !== 'undefined') td.innerHTML = category[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
        const id = 'deleteCategory';
        const values = 'remove';
        const types = 'btn-danger';
        let td = document.createElement('td');
        let button = document.createElement('button');
        button.classList.add('rounded', types);
        button.innerHTML = values;
        button.id = id;

        button.onclick = () => {
            deleteCategory(button);
        };

        td.appendChild(button);
        tr.appendChild(td);

        tableCategoriesContent.appendChild(tr);
    });
});















async function loadPublication() {
    const response = await fetch('http://localhost:3000/backend/api/publications');
    const data = await response.json();
    return data;
}


async function loadCategories() {
    const response = await fetch('http://localhost:3000/backend/api/categories');
    const data = await response.json();
    return data;
}




//add new user
const buttonAddUser = document.querySelector('#userAdd');
buttonAddUser.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/useradd';
});


//add new event
const buttonAddEvent = document.querySelector('#eventAdd');
buttonAddEvent.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/eventadd';
});

//add new event
const buttonAddPublication = document.querySelector('#publicationAdd');
buttonAddPublication.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/publicationadd';
});

//add new category
const buttonAddCategory = document.querySelector('#categoryAdd');
buttonAddCategory.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/categoryadd';
});


//edit actual user
// const buttonEditUser = document.querySelectorAll('#editUser');
// console.log(buttonEditUser);
// buttonEditUser.forEach(button => {
//     button.addEventListener('click', () => {
//         window.location.href = 'http://localhost:3000/backend/useredit';
//     });
// })

//delete user
async function deleteUser(button) {
    const mailOnRow = button.parentNode.parentNode.children[6].innerHTML;
    (async () => {
        const response = await fetch('http://localhost:3000/backend/api/userdelete/' + mailOnRow);
        const data = await response.json();
        if (data) location.reload();

    })()
}


//delete event
async function deleteEvent(button) {
    const id = button.parentNode.parentNode.children[0].innerHTML;
    (async () => {
        const response = await fetch('http://localhost:3000/backend/api/eventdelete/' + id);
        const data = await response.json();
        if (data) location.reload();

    })()
}

//delete publication
async function deletePublication(button) {
    const id = button.parentNode.parentNode.children[0].innerHTML;
    (async () => {
        const response = await fetch('http://localhost:3000/backend/api/publicationdelete/' + id);
        const data = await response.json();
        if (data) location.reload();

    })()
}


//delete category
async function deleteCategory(button) {
    const id = button.parentNode.parentNode.children[0].innerHTML;
    (async () => {
        const response = await fetch('http://localhost:3000/backend/api/categorydelete/' + id);
        const data = await response.json();
        if (data) location.reload();

    })()
}




