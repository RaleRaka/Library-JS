const books = [
  {
    id: 1,
    name: 'The Green Mile',
    writter: 'Steven King',
  },
  {
    id: 2,
    name: 'Game of Thrones',
    writter: 'George R. R. Martin',
  },
  {
    id: 3,
    name: 'Demian',
    writter: 'Hermann Hesse',
  },
  {
    id: 4,
    name: 'A Clash of Kings',
    writter: 'George R. R. Martin',
  },
];

//! SEARCH

const findBook = userInput => {
  const searchTerm = userInput.toLowerCase().trim().split(' ').join('');

  if (!searchTerm) {
    alert(`You must provide some search value!`);
    return;
  }
  //! stara verzija trazi stroktno po nazivu knjige
  // const foundBook = books.find(
  //   books => books.name.toLowerCase().trim().split(' ').join('') === searchTerm
  // );

  // alert(JSON.stringify(foundBook, null, 5));

  const foundBook = books.filter(book => {
    const partsOfName = book.name.toLowerCase().trim().split(' ');
    const books = partsOfName.includes(searchTerm);
    return books;
  });

  if (!foundBook.length) {
    alert(
      `There is no book in our library that contains provided search term: ${userInput.trim()}!`
    );
    return;
  }

  alert(JSON.stringify(foundBook, null, 5));
};

searchBookBtn.addEventListener('click', () => {
  const term = searchBookInput.value;
  findBook(term);
  clearFields();
});

//! ADD BOOK implementacija

const addBook = (name, writter, attributeName = '', attributeValue = '') => {
  const addedBook = {
    id: Math.floor(Math.random() * 100),
    name,
    writter,
  };

  //sprecava dodavanje knjige sa istim imenom
  const bookExists = books.some(
    book =>
      book.name.toLowerCase().trim().split(' ').join('') ===
      addedBook.name.toLowerCase().trim().split(' ').join('')
  );
  if (bookExists) {
    alert(`Book with provided name ${name.trim()} alredy exist!`);
    return;
  }
  if (attributeName !== '' && attributeValue !== '') {
    addedBook[attributeName] = attributeValue;
  }
  books.push(addedBook);
  alert(`Added new book: ${addedBook.name} (${addedBook.writter})`);
};

addBookBtn.addEventListener('click', () => {
  addBook(
    bookNameInput.value,
    bookWritterInput.value,
    additionalAttributeNameInput.value,
    additionalAttributeValueInput.value
  );
  clearFields();
});

//!DELETE BOOK implementacija

const deleteBook = userInput => {
  const searchTerm = userInput.toLowerCase().trim().split(' ').join('');

  const foundBook = books.find(
    book => book.name.toLowerCase().trim().split(' ').join('') === searchTerm
  );
  if (deleteBookInput.value === '') {
    alert(`Please fill the input field!`);
    return;
  }
  // if (searchTerm !== foundBook) {
  //   `Book doesn't exist in our library!`;
  //   return;
  // }

  books.splice(books.indexOf(foundBook), 1);

  alert(`You have deleted book ${foundBook.name}`);
};

deleteBookBtn.addEventListener('click', () => {
  deleteBook(deleteBookInput.value);
  clearFields();
});

//! GET ALL (SEE ALL BOOKS)

seeAllBtn.addEventListener('click', () => {
  //ako nema ni jedne knjige u bibilioteci
  if (books.length === 0) {
    alert(`Our library is empty at the moment. Please try again leter!`);
    return;
  }
  alert(`Check your consol!`);
  books.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  console.log(books);
});

//cisti polja posle klika na dugme
const clearFields = () => {
  deleteBookInput.value = '';
  bookNameInput.value = '';
  bookWritterInput.value = '';
  searchBookInput.value = '';
  additionalAttributeNameInput.value = '';
  additionalAttributeValueInput.value = '';
};
