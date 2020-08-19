/* ------------- Global Constants ------------- */

const addBookBtn = document.querySelector(".addBookBtn");
const bookshelf = document.querySelector(".bookshelf");
const openCloseBtn = document.querySelector(".fa-plus");
const addMenu = document.querySelector(".addBook");
const overlay = document.querySelector(".overlay");
const mainTitle = document.querySelector(".mainTitleDiv");

let bookList = [];

/* ------------- Global Constants END ------------- */

/* ------------- Book Constructor ------------- */

function Book(title, author, pages, read = false, id) {
    this.id = bookList.length + 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}

Book.prototype.readStatus = function () {
    let readStatus = "";
    this.read == false ? readStatus = "not read" : readStatus = "read";
    return readStatus;
}

/* ------------- Book Constructor End ------------- */

/* ------------- Collect form inputs ------------- */

function getBookInfo() {
    let bookTitle = (document.getElementById("booktitle").value).trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    let author = (document.getElementById("author").value).trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    return ([bookTitle, author, pages, read]);
}

/* ------------- Collect form inputs END ------------- */

/* ------------- Stablish book funcionality ------------- */

function bookLogic(book) {
    /* Remove Book */
    const removeBookBtn = book.querySelector(".remove-book");
    removeBookBtn.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.remove();
        firstAdd();
    });
    /* Remove Book END*/

    /* Change read status */
    const readStatusBtn = book.querySelector(".read-status")
    readStatusBtn.addEventListener("click", () => {
        if (readStatusBtn.innerText == "read") {
            readStatusBtn.innerText = "not read";
            readStatusBtn.classList.remove("read-ok")
        } else {
            readStatusBtn.innerText = "read";
            readStatusBtn.classList.add("read-ok")
        }
    })
    /* Change read status END*/
}

/* ------------- Stablish book funcionality END ------------- */

/* ------------- Create the book in the DOM ------------- */

function addBookToLibrary() {
    /* Gets the book info and instantiates it */
    let bookInfo = getBookInfo()
    const book1 = new Book(...bookInfo);
    /* Gets the book info and instantiates it END */

    /* Creates the DOM element and appends it to Bookshelf */
    let book = document.createRange().createContextualFragment(
        `<div class="book">
            <h1 class="title">${book1.title}</h1>
            <h3 class="author">by ${book1.author}</h3>
            <span class="pages">${book1.pages} pages</span>
            <div class="book-btns">
                <span class="remove-book">remove</span>
                <span class="read-status">${book1.readStatus()}</span>
            </div>
        </div>`);
    bookLogic(book);
    bookshelf.append(book);
    /* Creates the DOM element and appends it to Bookshelf END */

    /* Updates last book added info */
    let lastBook = document.querySelector(".lastBook");
    let lastAuthor = document.querySelector(".lastAuthor");
    lastBook.innerText = `"${book1.title}"`;
    lastAuthor.innerText = `by ${book1.author}`;
    /* Updates last book added info END */

    bookList.push(book1);
}

/* ------------- Create the book in the DOM END ------------- */

addBookBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let tempDOM = e.target.parentNode.querySelectorAll(".req");
    let tempAR = [];
    tempDOM.forEach(function (value) {tempAR.push(value.value)})
    if (tempAR[0] == "" || tempAR[1] == "" || tempAR[2] == "") {
        alert("Please complete the fields");
    } else {        
        addBookToLibrary();
        firstAdd();
        clearAll();      
    }
   })

function triggerMenu() {
    if (openCloseBtn.classList.contains("rotate")) {
        addMenu.classList.add("triggerMenu");
    } else {
        addMenu.classList.remove("triggerMenu");
    }
}

function clearAll() {
    addMenu.classList.remove("triggerMenu");
    openCloseBtn.classList.remove("rotate");
}

function firstAdd () {
    if (bookshelf.hasChildNodes()) {
        mainTitle.classList.add("remove");
        console.log(("tiene"));
    } else {
        mainTitle.classList.remove("remove");
        console.log("no tiene");
    }
}

openCloseBtn.addEventListener("click", () => {
    if (openCloseBtn.classList.contains("rotate")) {
        openCloseBtn.classList.remove("rotate");
        triggerMenu();
    } else {
        openCloseBtn.classList.add("rotate");
        triggerMenu();
    }
})




