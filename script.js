const API_URL = "https://jsonplaceholder.typicode.com/users";

let contacts = [];

// 📥 Fetch contacts
async function fetchContacts() {
    try {
        const response = await fetch(API_URL);
        contacts = await response.json();
        displayContacts(contacts);
    } catch (error) {
        alert("Error fetching data");
    }
}

// 📄 Display contacts
function displayContacts(data) {
    const list = document.getElementById("contactList");
    list.innerHTML = "";

    data.forEach(contact => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        li.innerHTML = `
            ${contact.name} - ${contact.phone}
            <div>
                <button class="btn btn-warning btn-sm" onclick="editContact(${contact.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteContact(${contact.id})">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// ➕ Add contact
function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (name === "" || phone === "") {
        alert("Fill all fields");
        return;
    }

    const newContact = {
        id: Date.now(),
        name,
        phone
    };

    contacts.push(newContact);
    displayContacts(contacts);

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
}

// ✏️ Edit contact
function editContact(id) {
    const contact = contacts.find(c => c.id === id);

    const newName = prompt("Edit name:", contact.name);
    const newPhone = prompt("Edit phone:", contact.phone);

    if (newName && newPhone) {
        contact.name = newName;
        contact.phone = newPhone;
        displayContacts(contacts);
    }
}

// ❌ Delete contact
function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    displayContacts(contacts);
}

// 🔍 Search
function searchContact() {
    const searchValue = document.getElementById("search").value.toLowerCase();

    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(searchValue) ||
        c.phone.includes(searchValue)
    );

    displayContacts(filtered);
}

// 🚀 Load on start
fetchContacts();