const books = [];
const RENDER_EVENT = 'render-book';


function addBook () {
    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const timeStamp = document.getElementById('inputBookYear').value;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, titleBook, authorBook, timeStamp, false)
    books.push(bookObject);

    document.dispatchEvent(new Event (RENDER_EVENT));
};


function generateId() {
    return +new Date();
}  


function generateBookObject(id, title, author, timeStamp, isCompleted) {
    return {
        id, 
        title,
        author,
        timeStamp,
        isCompleted
   }
};


document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });
});


document.addEventListener(RENDER_EVENT, function () {
    // console.log(books);
    const incompleteReadBOOKList = document.getElementById('incompleteBookshelfList');
    incompleteReadBOOKList.innerHTML = '';
    /*
    const completedReadBOOKList = document.getElementById('completeBookshelfList');
    completedReadBOOKList.innerHTML = '';*/

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        incompleteReadBOOKList.append(bookElement);
    }
});


function makeBook(bookObject) {
    const textTitleBook = document.createElement('h3');
    textTitleBook.innerText = bookObject.title;

    const textAuthorBook = document.createElement('p');
    textAuthorBook.innerText = bookObject.author

    const textTimeStamp = document.createElement('p');
    textTimeStamp.innerText = bookObject.timeStamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitleBook, textAuthorBook, textTimeStamp);

    const container = document.createElement('div');
    container.append(textContainer);
    container.setAttribute('id', `book-${bookObject.id}`);
};