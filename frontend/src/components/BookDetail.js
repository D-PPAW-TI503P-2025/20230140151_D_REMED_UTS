import React, { useState } from 'react';

function BookDetail({ selectedBookId, setSelectedBookId, API_BASE }) {
  const [detail, setDetail] = useState(null);

  const getDetail = async () => {
    if (!selectedBookId) return alert('Enter Book ID');
    try {
      const response = await fetch(`${API_BASE}/books/${selectedBookId}`);
      const data = await response.json();
      setDetail(response.ok ? data : { error: data.error });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="panel">
      <h2>Book Detail</h2>
      <input
        type="number"
        value={selectedBookId}
        onChange={(e) => setSelectedBookId(e.target.value)}
        placeholder="Enter Book ID"
      />
      <button onClick={getDetail}>Get Detail</button>
      {detail && (
        <div>
          {detail.error ? `Error: ${detail.error}` : 
            `ID: ${detail.id}, Title: ${detail.title}, Author: ${detail.author}, Stock: ${detail.stock}`}
        </div>
      )}
    </div>
  );
}

export default BookDetail;