import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Add updateDoc here
import './Login.css';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', available: true });
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { username, email, contact } = location.state || {};

  const navigateHome = () => {
    navigate('/admin');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(db, 'book');
        const booksSnapshot = await getDocs(booksCollection);
        const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksList);
      } catch (err) {
        console.error('There was an error fetching the books!', err);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      const booksCollection = collection(db, 'book');
      const docRef = await addDoc(booksCollection, newBook);
      setBooks([...books, { id: docRef.id, ...newBook }]);
      setNewBook({ title: '', author: '', available: true });
    } catch (err) {
      console.error('There was an error adding the book!', err);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'book', id));
      setBooks(books.filter(book => book.id !== id));
    } catch (err) {
      console.error('There was an error deleting the book!', err);
    }
  };

  const handleViewTransactions = async () => {
    try {
      const usersCollection = collection(db, 'user');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
      setShowModal(true);
    } catch (err) {
      console.error('There was an error fetching the users!', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const bookRef = doc(db, 'book', id);
      await updateDoc(bookRef, { available: !currentStatus });
      setBooks(books.map(book => (book.id === id ? { ...book, available: !currentStatus } : book)));
    } catch (err) {
      console.error('There was an error updating the book status!', err);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className='btn1'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={navigateHome}>Home</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row className="my-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Welcome, {username}</Card.Title>
                <Card.Text>
                  Email: {email}
                  <br />
                  Contact: {contact}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Books</Card.Header>
              <Card.Body>
                <ul>
                  {books.map(book => (
                    <li key={book.id}>
                      {book.title} - {book.author} - {book.available ? 'Available' : 'Borrowed'}
                      <Button variant="danger" size="sm" onClick={() => handleDeleteBook(book.id)} className="ms-2">Delete</Button>
                      <Button 
                        variant={book.available ? "warning" : "success"} 
                        size="sm" 
                        onClick={() => toggleAvailability(book.id, book.available)} 
                        className="ms-2"
                      >
                        {book.available ? 'Mark as Borrowed' : 'Mark as Available'}
                      </Button>
                    </li>
                  ))}
                </ul>
                <Form>
                  <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter book title" 
                      value={newBook.title} 
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="formAuthor" className="mt-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter author" 
                      value={newBook.author} 
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleAddBook} className="mt-3">Add New Book</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Transactions</Card.Header>
              <Card.Body>
                <Button variant="primary" onClick={handleViewTransactions}>View All Transactions</Button>
                {/* Modal for displaying user details */}
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {users.length > 0 ? (
                      <ul>
                        {users.map(user => (
                          <li key={user.id}>
                            Username: {user.username} <br />
                            Email: {user.email} <br />
                            Contact: {user.contact}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No user transactions found.</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
