import React, { useState } from 'react';

function AdminPanel({ selectedBookId, setSelectedBookId, API_BASE, getHeaders, loadBooks }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [stock, setStock] = useState('');

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/books`, {
        method: 'POST',
        headers: { ...getHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, stock: parseInt(stock) })
      });
      const result = await response.json();
      alert(response.ok ? 'Book added!' : `Error: ${result.error}`);
      loadBooks();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const updateBook = async () => {
    if (!selectedBookId) return alert('Select Book ID');
    try {
      const response = await fetch(`${API_BASE}/books/${selectedBookId}`, {
        method: 'PUT',
        headers: { ...getHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, stock: parseInt(stock) })
      });
      const result = await response.json();
      alert(response.ok ? 'Book updated!' : `Error: ${result.error}`);
      loadBooks();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const deleteBook = async () => {
    if (!selectedBookId) return alert('Select Book ID');
    try {
      const response = await fetch(`${API_BASE}/books/${selectedBookId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const result = await response.json();
      alert(response.ok ? 'Book deleted!' : `Error: ${result.error}`);
      loadBooks();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="panel">
      <h2>Admin: Manage Books</h2>
      <form onSubmit={addBook}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" required />
        <button type="submit">Add Book</button>
      </form>
      <button onClick={updateBook}>Update Selected Book</button>
      <button onClick={deleteBook}>Delete Selected Book</button>
    </div>
  );
}

export default AdminPanel;