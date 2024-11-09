let isLogged = false;
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const loginValidation = document.getElementById("loginValidation");
const endpoint = "http://localhost:3000/0/";
const book = document.querySelector("#book");
const correctUsername = "admin";
const correctPassword = "admin";

const setLogged = () => {
    if (isLogged) {
        adminPanel.style.display = "block";
        loginForm.style.display = "none";
    } else {
        adminPanel.style.display = "none";
        loginForm.style.display = "block";
    }
};

loginValidation.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (username === correctUsername && password === correctPassword) {
        isLogged = true;
        alert("Login successful.");
    } else {
        alert("You entered the wrong password.");
    }

    setLogged();
});

setLogged();

axios
  .get(endpoint)
  .then(({ data }) => {
    data.forEach(({ id, image_url, title, author, category, publication_date }) => {
      book.innerHTML += `
        <div class="book" id="book-${id}">
           <img src="${image_url}" alt="">
           <h2>${title}</h2>
           <div class="text-container">
               <h3>Author: ${author}</h3>
               <p>Category: ${category}</p>
               <p>Date of Publish: ${publication_date}</p>
               <button onclick="deleteItem(${id})">Delete</button>
           </div>
        </div>`;
    });
  })
  .catch((error) => {
    alert(error.message);
  });

// Delete Item
const deleteItem = (id) => {
    const isAgree = confirm("Do you want to delete?");
    if (isAgree) {
        axios.delete(`${endpoint}${id}`).then((res) => {
            console.log(res);
            document.getElementById(`book-${id}`).remove(); // Remove deleted item from DOM
        }).catch((error) => {
            console.error("Error deleting item:", error.message);
        });
    }
};

// Add Item
const addItemForm = document.getElementById("addItem");
const imageInp = document.getElementById("image");
const nameInp = document.getElementById("name");
const authorInp = document.getElementById("author");
const categoryInp = document.getElementById("category");
const dateInp = document.getElementById("date");

if (addItemForm) {
  addItemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
      image_url: imageInp.value,
      title: nameInp.value,
      author: authorInp.value,
      category: categoryInp.value,
      publication_date: dateInp.value,
    };

    axios.post(endpoint, newItem)
      .then((res) => {
        console.log("Item added:", res);
      })
      .catch((error) => {
        console.error("Error adding item:", error.message);
      });
  });
} else {
  console.error("Element with id 'addItem' not found");
}
