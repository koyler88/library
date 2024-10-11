const myLibrary = [];
const content = document.querySelector(".content");

let book1 = new Book('J.R.R Tolkien', 'The Hobbit', 298, 'No');
let book2 = new Book('Jim Joe', 'The great book', 400, 'Yes');
let book3 = new Book('Maggy Pie', 'All about birds', 120, 'No');

myLibrary.push(book1)
myLibrary.push(book2)
myLibrary.push(book3)

function Book(author, title, pages, read) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
};

function addBookToLibrary(book) {
    myLibrary.push(book)
};


function displayLibrary() {
    for (book of myLibrary) {
        bookCard = document.createElement('div')
        bookCard.classList.add('card')
        for (item in book) {
            newDiv = document.createElement('div')
            newDiv.textContent = book[item]
            bookCard.appendChild(newDiv)
        }
        content.appendChild(bookCard)
    }
};

const openForm = document.querySelector(".form-button");
const closeForm = document.querySelector(".close-form");
const form = document.querySelector("#form");
const submit = document.querySelector(".submit");
const formContainer = document.querySelector(".form-container")


openForm.addEventListener("click", () => {
    formContainer.classList.add("open")
});

closeForm.addEventListener("click", () => {
    formContainer.classList.remove("open")
});

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const formInfo = new FormData(form);
    const newBook = new Book(
        formInfo.get('author'),
        formInfo.get('title'),
        formInfo.get('pages'),
        formInfo.get('read'));
    myLibrary.push(newBook);
    while (content.firstChild) {
        content.removeChild(content.lastChild)
    }
    displayLibrary();
})

displayLibrary();

