javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('/api/books');
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/transactions', {
          headers: { Authorization: Bearer ${token} }
        });
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooks();
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      <h3>Available Books</h3>
      <BookList books={books} />
      <h3>Your Transactions</h3>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default UserDashboard;