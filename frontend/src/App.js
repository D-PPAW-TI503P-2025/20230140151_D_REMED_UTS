import React, { useState } from 'react';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import './App.css';

function App() {
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');

  const API_BASE = 'http://localhost:3001/api';

  // Helper: Get headers berdasarkan role (sesuai backend middleware)
  const getHeaders = () => {
    const headers = {};
    if (role) headers['x-user-role'] = role;
    if (role === 'user' && userId) headers['x-user-id'] = userId;
    return headers;
  };

  // Load books (public endpoint: GET /api/books)
  const loadBooks = async () => {
    try {
      const response = await fetch(`${API_BASE}/books`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      alert('Error loading books: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Library System with Geolocation</h1>
      
      {/* Role Selection (sesuai simulasi backend) */}
      <div className="role-section">
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {role === 'user' && (
          <>
            <label>User ID:</label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g., 1"
            />
          </>
        )}
      </div>

      {/* Public Sections */}
      <BooksList books={books} loadBooks={loadBooks} />
      <BookDetail 
        selectedBookId={selectedBookId} 
        setSelectedBookId={setSelectedBookId} 
        API_BASE={API_BASE} 
      />

      {/* Role-Based Sections (sesuai backend: admin untuk CRUD, user untuk borrow) */}
      {role === 'admin' && (
        <AdminPanel 
          selectedBookId={selectedBookId} 
          setSelectedBookId={setSelectedBookId} 
          API_BASE={API_BASE} 
          getHeaders={getHeaders} 
          loadBooks={loadBooks} 
        />
      )}
      {role === 'user' && (
        <UserPanel 
          userId={userId} 
          API_BASE={API_BASE} 
          getHeaders={getHeaders} 
          loadBooks={loadBooks} 
        />
      )}
    </div>
  );
}

export default App;