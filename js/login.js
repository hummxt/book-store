let isLogged = localStorage.getItem("isLogged") === "true";
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const loginValidation = document.getElementById("loginValidation");
const endpoint = "http://localhost:3000/0/";
const book = document.getElementById("book"); // Use `getElementById` for consistency
const correctUsername = "admin";
const correctPassword = "admin";

// Function to set the display based on login status
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
        alert("Login successfully.");
    } else {
        alert("You entered the wrong password.");
    }

    setLogged();
});

setLogged();

// Fetch and display books
axios
  .get(endpoint)
  .then(({ data }) => {
    data.forEach(({id, image_url, title, author, category, publication_date}) => {
      book.innerHTML += `
      <div class="book" id="book">
           <img src="${image_url}" alt="">
           <h2>${title}</h2>
           <div class="text-container">
               <h3>Author: ${author}</h3>
               <p>Category: ${category}</p>
               <p>Date of publish: ${publication_date}</p>
               <button onclick="deleteItem(${id})">Delete</button>
           </div>
      </div>`;
    });
  })
  .catch((error) => {
    alert(error.message);
  });

// Function to delete a book
const deleteItem = (id) => {
    const isAgree = confirm("Do you want to delete?");
    if (isAgree) {
        axios.delete(`${endpoint}${id}`).then((response) => {
            console.log(response);
        }).catch((error) => {
            alert(error.message);
        });
    }
};

// Selectors for form inputs and the add button
const addItem = document.querySelector("#addItem"); // Correct selector with #
const imageInp = document.getElementById("image");
const nameInp = document.getElementById("name");
const authorInp = document.getElementById("author");
const categoryInp = document.getElementById("category");
const dateInp = document.getElementById("date");

// Event listener to add a new book
addItem.addEventListener("submit", (e) => {
    e.preventDefault();
    const newItem = {
        image_url: imageInp.value,
        title: nameInp.value,
        author: authorInp.value,
        category: categoryInp.value,
        publication_date: dateInp.value,
    };

    axios.post(endpoint, newItem).then((response) => {
        console.log(response.data);
        alert("Book added successfully!");
        location.reload
    }).catch((error) => {
        alert(error.message);
    });
});
