import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from './firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore'; 
import './Login.css';

const Admin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, contact } = event.target.elements;

    const userInput = {
      username: username.value,
      email: email.value,
      password: password.value,
      contact: contact.value
    };

    console.log("User input:", userInput);  // Log user input

    try {
      const adminsCollection = collection(db, 'admin');
      const adminsSnapshot = await getDocs(adminsCollection);
      const adminsList = adminsSnapshot.docs.map(doc => doc.data());

      console.log("Admins list:", adminsList);  // Log fetched admin data

      const admin = adminsList.find(
        admin => admin.username === userInput.username &&
                 admin.email === userInput.email &&
                 admin.password === userInput.password &&
                 admin.contact === userInput.contact
      );

      console.log("Found admin:", admin);  // Log found admin

      if (admin) {
        navigate('/admindashboard', { state: userInput });
      } else {
        alert('Invalid admin credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching admin details:', error);
      alert('There was an error during the login process. Please try again.');
    }

    event.target.reset();
  };

  return (
    <Container className='id'>
      <Container className="login-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Admin Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" required />
              </Form.Group>
              <Form.Group controlId="login-email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" autoComplete="off" placeholder="Email" required />
              </Form.Group>
              <Form.Group controlId="login-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" autoComplete="off" placeholder="Password" required />
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
              Login as a user? <Link to="/">Click here</Link>
            </h6>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Admin;
