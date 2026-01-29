import React, { useState } from 'react';

function UserPanel({ userId, API_BASE, getHeaders, loadBooks }) {
  const [bookId, setBookId] = useState('');
  const [result, setResult] = useState('');

  const borrowBook = async () => {
    if (!bookId) return alert('Enter Book ID');
    if (!navigator.geolocation) return alert('Geolocation not supported');

    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      try {
        const response = await fetch(`${API_BASE}/borrow`, {
          method: 'POST',
          headers: { ...getHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookId: parseInt(bookId), latitude, longitude })
        });
        const data = await response.json();
        setResult(response.ok ? `Borrowed! ${JSON.stringify(data)}` : `Error: ${data.error}`);
        loadBooks();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }, (error) => {
      alert('Geolocation error: ' + error.message);
    });
  };

  return (
    <div className="panel">
      <h2>User: Borrow Book</h2>
      <input
        type="number"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Book ID to Borrow"
      />
      <button onClick={borrowBook}>Borrow Book</button>
      <div>{result}</div>
    </div>
  );
}

export default UserPanel;