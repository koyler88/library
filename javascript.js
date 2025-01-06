const myLibrary = [];
const container = document.querySelector(".container")
const content = document.querySelector(".content");

class Book{
    constructor(author, title, pages, read) {
        this.author = `Author: ${author}`
        this.title = `Title: ${title}`
        this.pages = `Pages: ${pages}`
        this.read = `Status: ${read}`
    }
    
};

let book1 = new Book('J.R.R Tolkien', 'The Hobbit', 298, 'Read');
let book2 = new Book('Jim Joe', 'The great book', 400, 'Not Read');
let book3 = new Book('Maggy Pie', 'All about birds', 120, 'Not Read');

myLibrary.push(book1)
myLibrary.push(book2)
myLibrary.push(book3)

function addBookToLibrary(book) {
    myLibrary.push(book)
};
let itemCount = 1
function displayLibrary() {
    let bookCount = 0
    for (book of myLibrary) {
        bookCard = document.createElement('div')
        bookCard.classList.add('card')
        for (item in book) {
            newDiv = document.createElement('div')
            newDiv.textContent = book[item]
            if (itemCount === 4) {
                newDiv.classList.add("status")
            }
            bookCard.appendChild(newDiv)
            itemCount += 1;
        }
        removeButton = document.createElement('button')
        removeButton.classList.add("remove")
        removeButton.textContent = "Remove Book"
        bookCard.appendChild(removeButton)
        toggleButton = document.createElement('button')
        toggleButton.classList.add('toggle')
        toggleButton.textContent = "Toggle Read Status"
        bookCard.appendChild(toggleButton)
        bookCard.dataset.booknumber = bookCount
        bookCount += 1;
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

    const author = document.getElementById("author");
    const title = document.getElementById("title");
    const pages = document.getElementById("pages");
    const status = document.getElementById("read");
    const errorMessage = document.getElementById("errorMessage")
    author.setCustomValidity("")
    title.setCustomValidity("")
    pages.setCustomValidity("")
    status.setCustomValidity("")
        if (author.validity.valid) {
            if (title.validity.valid) {
                if (pages.validity.valid) {
                    if (status.validity.valid) {
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
                        formContainer.classList.remove("open")
                        removeButtonLogic();
                        toggleButtonLogic();
                        form.reset()
                        errorMessage.textContent = ""
                        errorMessage.classList.remove("active")
                    }
                    else {
                        status.setCustomValidity("Please Enter Read Status")
                        errorMessage.textContent = "Please Enter Read Status"
                        errorMessage.classList.add("active")
                    }
                }
                else {
                    pages.setCustomValidity("Please Enter Number of Pages")
                    errorMessage.textContent = "Please Enter Number of Pages"
                    errorMessage.classList.add("active")
                }
            }
            else {
                title.setCustomValidity("Please Enter Title")
                errorMessage.textContent = "Please Enter Title"
                errorMessage.classList.add("active")
            }
        }
        else {
            author.setCustomValidity("Please Enter Author's Name")
            errorMessage.textContent = "Please Enter Author's Name"
            errorMessage.classList.add("active")
        }

    
})

displayLibrary();

removeButtonLogic();
toggleButtonLogic();

function removeButtonLogic() {
    let removeButtons = document.querySelectorAll(".remove")
    removeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn.parentElement.dataset.booknumber)
            myLibrary.splice((btn.parentElement.dataset.booknumber),1)
            while (content.firstChild) {
                content.removeChild(content.lastChild)
            }
            displayLibrary();
            removeButtons = document.querySelectorAll(".remove")
            removeButtonLogic();
            toggleButtonLogic();
        })
    })
}


function toggleButtonLogic() {
    let toggleButtons = document.querySelectorAll(".toggle")
    toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const booknumber = btn.parentElement.dataset.booknumber;
            const div = document.querySelector(`div[data-booknumber="${booknumber}"]`)
            const divChildren = div.children;
            const status = divChildren[3]
            if (status.textContent === "Status: Not Read") {
                status.textContent = "Status: Read"
            }
            else {
                status.textContent = "Status: Not Read"
            }
        })
    })
}




