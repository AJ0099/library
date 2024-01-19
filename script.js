const form = document.querySelector("form");
const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const checkboxInput = document.querySelector("#checkbox");
const container = document.querySelector("#container");

const overlay = document.querySelector("#overlay");
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.createDOMElements = function () {
  const div = document.createElement("div");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const button = document.createElement("button");
  const removeButton = document.createElement("button");

  div.classList.add("newBook");
  button.classList.add("submit");
  removeButton.classList.add("remove");

  p1.textContent = this.title;
  p2.textContent = this.author;
  p3.textContent = `${this.pages} pages`;
  if (this.read) {
    button.textContent = "Read";
    button.style.backgroundColor = "#9fff9c";
  } else {
    button.textContent = "Not Read";
    button.style.backgroundColor = "#ff7f7f";
  }
  removeButton.textContent = "Remove";

  div.appendChild(p1);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(button);
  div.appendChild(removeButton);

  return { div, removeButton, button };
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBook(book) {
  const { div, removeButton, button } = book.createDOMElements();
  container.appendChild(div);

  removeButton.addEventListener("click", () => {
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
    div.remove();
  });

  button.addEventListener("click", () => {
    if (button.textContent === "Read") {
      button.style.backgroundColor = "#ff7f7f";
      button.textContent = "Not Read";
    } else {
      button.style.backgroundColor = "#9fff9c";
      button.textContent = "Read";
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = checkboxInput.checked;
  addBookToLibrary(title, author, pages, read);
  form.style.display = "none";
  overlay.style.display = "none";
  displayBook(myLibrary[myLibrary.length - 1]);
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
});

addNewBook.addEventListener("click", () => {
  form.style.display = "flex";
  overlay.style.display = "block";
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
    form.style.display = "none";
  }
});
