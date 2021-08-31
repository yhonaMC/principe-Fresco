const form = document.querySelector("#profile-form");

printHTML = () => {
    const person = JSON.parse(localStorage.getItem("Person"));
    document.querySelector("#name").value = `${person.name}`;
    document.querySelector("#last-name").value = `${person.lastName}`;
    document.querySelector("#email").value = `${person.email}`;
}
form.addEventListener("submit", e => {
    e.preventDefault(); 
    const name = document.querySelector("#name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#email").value;
    const person = {
        name,
        lastName,
        email
    };
    localStorage.setItem("Person", JSON.stringify(person));
    printHTML();
})

document.addEventListener("DOMContentLoaded", printHTML);