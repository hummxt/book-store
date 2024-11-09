const endpoint = "http://localhost:3000/0";
const book = document.querySelector("#book");

axios
  .get(endpoint)
  .then(({ data }) => {
    data.forEach(({image_url, title, author, category, publication_date}) => {
      book.innerHTML += `<div class="book" id="book">
           <img src=${image_url} alt="">
           <h2>${title}</h2>
           <div class="text-container">
           <h3>Author : ${author}</h3>
           <p>Category : ${category}</p>
           <p>Date of publish : ${publication_date}</p>
           </div>
      </div>`;
    });
  })
  .catch((error) => {
    alert(error.message);
  });