

const btnBack = document.querySelector('.btnBack');
const btnAddUser = document.querySelector('.btnAdd');
const btnEditUser = document.querySelector('.btnEdit');


btnBack.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/tables'
});

if (btnAddUser != null) {
    btnAddUser.addEventListener('click', () => {
        const name = document.querySelector('.name');
        const surname = document.querySelector('.surname');
        const usertag = document.querySelector('.usertag');
        const nationality = document.querySelector('.nationality');
        const admin = document.querySelector('.admin');
        const mail = document.querySelector('.mail');
        const password = document.querySelector('.password');
        const address = document.querySelector('.address');
        (async () => {
            const user = {
                name: name.value,
                surname: surname.value,
                usertag: usertag.value,
                admin: admin.value,
                mail: mail.value,
                password: password.value,
                address: address.value,
                nationality: nationality.value
            };
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            };
            const updateQuery = await fetch('http://localhost:3000/backend/api/insertuser/', settings);
            const data = await updateQuery.json();
            if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/tables';
        })()
    });
} else {
    btnEditUser.addEventListener('click', () => {
        const name = document.querySelector('.name');
        const surname = document.querySelector('.surname');
        const usertag = document.querySelector('.usertag');
        const admin = document.querySelector('.admin');
        const mail = document.querySelector('.mail');
        const password = document.querySelector('.password');
        const address = document.querySelector('.address');
        const nationality = document.querySelector('.nationality');


        (async () => {
            const userIdQuery = await fetch('http://localhost:3000/backend/api/userquerybymail/' + mail.value);
            const resp = await userIdQuery.json();
            const user = {
                name: name.value,
                surname: surname.value,
                usertag: usertag.value,
                admin: admin.value,
                mail: mail.value,
                password: password.value,
                address: address.value,
                id_user: resp._id_user,
                nationality: nationality.value
            };
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            };
            const updateQuery = await fetch('http://localhost:3000/backend/api/updateuser/', settings);
            const data = await updateQuery.json();
            if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/tables';
        })()
    });
}

