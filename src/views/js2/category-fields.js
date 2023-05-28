

const btnBack = document.querySelector('.btnBack');
const btnAddCategory = document.querySelector('.btnAdd');


btnBack.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/backend/tables'
});

if (btnAddCategory != null) {
    btnAddCategory.addEventListener('click', () => {
        const name = document.querySelector('.name');
        const description = document.querySelector('.description');

        if (name.value != '' && description.value != '') {

            (async () => {
                const category = {
                    cat_name: name.value,
                    description: description.value,
                };
                const settings = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(category),
                };
                const updateQuery = await fetch('http://localhost:3000/backend/api/insertcategory', settings);
                const data = await updateQuery.json();
                if (data !== false) window.location.href = 'http://localhost:3000/backend/tables';
            })()
        }
    });
}

