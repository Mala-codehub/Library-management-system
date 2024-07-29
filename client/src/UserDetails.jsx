import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Login.css';

const UserDetails = ({ username, email, contact }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

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
      <Navbar bg="dark" variant="dark" expand="lg" className="btn1">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="outline-light" onClick={navigateHome}>Home</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="id">
        <Container className="user-details-container">
          <Row className="justify-content-md-center">
            <Col md={6}>
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
          <Row className="my-4">
            <Col>
              <Card>
                <Card.Header>Books</Card.Header>
                <Card.Body>
                  <ul>
                    {books.map(book => (
                      <li key={book.id}>
                        {book.title} - {book.author} - {book.available ? 'Available' : 'Borrowed'}
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

UserDetails.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
};

export default UserDetails;
