import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserDetails from './UserDetails';
import { db } from './firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';
import './Login.css'; 

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    contact: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, contact } = event.target.elements;

    const newUser = {
      username: username.value,
      email: email.value,
      contact: contact.value
    };

    try {
      const userCollection = collection(db, 'user');
      await addDoc(userCollection, newUser);

      setUserData(newUser);
    } catch (error) {
      console.error('Error adding user details:', error);
      alert('There was an error during the login process. Please try again.');
    }

    event.target.reset();
  };

  if (userData.username && userData.email && userData.contact) {
    return <UserDetails {...userData} />;
  }

  return (
    <Container className='id'>
      <Container className="login-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>User Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" required />
              </Form.Group>
              <Form.Group controlId="login-email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" autoComplete="off" placeholder="Email" required />
              </Form.Group>
              <Form.Group controlId="login-contact">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="text" name="contact" autoComplete="off" placeholder="Contact" required />
              </Form.Group>
              <Button variant="primary" type="submit" block className='btn'>
                Login
              </Button>
            </Form>
            <h6>
              Login as an admin? <Link to="/admin">Click here</Link>
            </h6>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
