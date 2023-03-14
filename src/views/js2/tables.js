
const tableUsersContent = document.querySelector('#bodyUserContent');


fetch("/backend/api/allusers",
{
    method: "POST",
})
.then(function(res){ return res.json(); })
.then(function(data){ alert( JSON.stringify( data ) ) })