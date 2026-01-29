import React from 'react';

function BooksList({ books, loadBooks }) {
  return (
    <div className="panel">
      <h2>Books List</h2>
      <button onClick={loadBooks}>Load Books</button>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            ID: {book.id}, Title: {book.title}, Author: {book.author}, Stock: {book.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;