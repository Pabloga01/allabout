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
        const latitude = document.querySelector('.latitude');
        const longitude = document.querySelector('.longitude');
        const date = document.querySelector('.date');
        const category = document.querySelector('.id_category');
        const user = document.querySelector('.id_user');

        (async () => {
            const publication = {
                content: content.value,
                description: description.value,
                latitude: latitude.value,
                longitude: longitude.value,
                date: date.value,
                id_user: user.value,
                id_category: category.value,
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
        const latitude = document.querySelector('.latitude');
        const longitude = document.querySelector('.longitude');
        const date = document.querySelector('.date');
        const category = document.querySelector('.id_category');
        const user = document.querySelector('.id_user');

        (async () => {

            const parts = window.location.href.split("/");
            const lastPart = parts.pop();

            const publication = {
                content: content.value,
                description: description.value,
                latitude: latitude.value,
                longitude: longitude.value,
                date: date.value,
                id_user: user.value,
                id_category: category.value,
                id_publication: lastPart,
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