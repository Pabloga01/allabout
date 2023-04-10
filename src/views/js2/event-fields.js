const btnBack = document.querySelector('.btnBack');
const btnAddEvent = document.querySelector('.buttonAdd');
const btnEditEvent = document.querySelector('.buttonEdit');



btnBack.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/tables'
});


if (btnAddEvent != null) {
    btnAddEvent.addEventListener('click', () => {
        const title = document.querySelector('.title');
        const description = document.querySelector('.description');
        const content = document.querySelector('.content');
        const latitude = document.querySelector('.latitude');
        const longitude = document.querySelector('.longitude');
        const date = document.querySelector('.date');
        const category = document.querySelector('.category');

        (async () => {
            const event = {
                title: title.value,
                description: description.value,
                content: content.value,
                latitude: latitude.value,
                longitude: longitude.value,
                date: date.value,
                id_category: category.value,
            };
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            };
            const updateQuery = await fetch('http://localhost:3000/backend/api/insertevent/', settings);
            const data = await updateQuery.json();
            if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/tables';
        })()
    });
} else {
    btnEditEvent.addEventListener('click', () => {
        const title = document.querySelector('.title');
        const description = document.querySelector('.description');
        const content = document.querySelector('.content');
        const latitude = document.querySelector('.latitude');
        const longitude = document.querySelector('.longitude');
        const date = document.querySelector('.date');
        const category = document.querySelector('.category');

        (async () => {
            const event = {
                title: title.value,
                description: description.value,
                content: content.value,
                latitude: latitude.value,
                longitude: longitude.value,
                date: date.value,
                id_category: category.value,
                id_event: window.location.href.substring(window.location.href.length - 1),
            };
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            };
            const updateQuery = await fetch('http://localhost:3000/backend/api/updateevent/', settings);
            const data = await updateQuery.json();
            if (typeof data !== 'false') window.location.href = 'http://localhost:3000/backend/tables';
        })()
    });
}