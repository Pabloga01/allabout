
const tableUsersContent = document.querySelector('#bodyUserContent');
const tableEventsContent = document.querySelector('#bodyEventContent');
const tablePublicationsContent = document.querySelector('#bodyPublicationContent');


// TODO implementacion para el template con nombre de usuario
// TODO separar plantilla de template de paginas

//const storage = require('node-sessionstorage');
// const User = require('../../models/User');
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
    const headerList = ['name', 'surname', 'usertag', 'rank', 'admin', 'mail', 'password', 'address']
    userList.forEach(user => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof user[headerName] !== 'undefined') td.innerHTML = user[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
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
    console.log(eventList);
    const headerList = ['title', 'content', 'cat_name', 'date', 'upvotes', 'description', 'latitude', 'longitude']
    eventList.forEach(event => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof event[headerName] !== 'undefined') td.innerHTML = event[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
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
    const headerList = ['content', 'usertag', 'cat_name', 'date', 'upvotes', 'description', 'latitude', 'longitude']
    publicationList.forEach(publication => {
        let tr = document.createElement('tr');
        headerList.forEach(headerName => {
            let td = document.createElement('td');
            if (typeof publication[headerName] !== 'undefined') td.innerHTML = publication[headerName];
            else td.innerHTML = '';
            tr.appendChild(td);
        });
        tablePublicationsContent.appendChild(tr);
    });
});
async function loadPublication() {
    const response = await fetch('http://localhost:3000/backend/api/publications');
    const data = await response.json();
    return data;
}