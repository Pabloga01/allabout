

const selectUsers = document.querySelector('.selectUsers');
const selectCategories = document.querySelector('.selectCategories');
const date = document.querySelector('.date');
const selectCountries = document.querySelector('.country');


const realDate = date.name.substring(0, 10);
date.value = realDate;

fetch('http://localhost:3000/backend/api/categories')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id_category;
            option.textContent = element.cat_name;
            selectCategories.appendChild(option);
        });
        selectCategories.value = selectCategories.name;
    })



fetch('http://localhost:3000/backend/api/users')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id_user;
            option.textContent = element.usertag;
            selectUsers.appendChild(option);
        });
        selectUsers.value = selectUsers.name;
    })



fetch('http://localhost:3000/backend/api/allcountries')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        data.forEach(element => {
            const option = document.createElement('option');
            option.value = element.name;
            option.textContent = element.name;
            selectCountries.appendChild(option);
        });
        selectCountries.value = selectCountries.name;
    })









const btnBack = document.querySelector('.btnBack');
const btnAddPublication = document.querySelector('.buttonAdd');
const btnEditPublication = document.querySelector('.buttonEdit');


btnBack.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/tables'
});


if (btnAddPublication != null) {
    btnAddPublication.addEventListener('click', () => {
        const description = document.querySelector('.description');
        const content = document.querySelector('.content');
        const date = document.querySelector('.date');
        const category = document.querySelector('.id_category');
        const user = document.querySelector('.id_user');
        const selectCountries = document.querySelector('.country');


        (async () => {
            const publication = {
                content: content.value,
                description: description.value,
                date: date.value,
                id_user: user.value,
                id_category: category.value,
                country: selectCountries.value,
            };
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publication),
            };
            const updateQuery = await fetch('http://localhost:3000/backend/api/insertpublication/', settings);
            const data = await updateQuery.json();
            if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/tables';
        })()
    });
} else {
    btnEditPublication.addEventListener('click', () => {
        const description = document.querySelector('.description');
        const content = document.querySelector('.content');
        const date = document.querySelector('.date');
        const category = document.querySelector('.id_category');
        const user = document.querySelector('.id_user');
        const selectCountries = document.querySelector('.country');



        (async () => {

            const parts = window.location.href.split("/");
            const lastPart = parts.pop();

            const publication = {
                content: content.value,
                description: description.value,
                date: date.value,
                id_user: user.value,
                id_category: category.value,
                id_publication: lastPart,
                country: selectCountries.value,
            };
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publication),
            };
            const updateQuery = await fetch('http://localhost:3000/backend/api/updatepublication/', settings);
            const data = await updateQuery.json();
            if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/tables';
        })()
    });
}