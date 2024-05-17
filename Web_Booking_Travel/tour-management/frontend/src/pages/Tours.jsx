import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommonSection from '../shared/CommonSection';
import '../styles/login.css'; // Ensure you have corresponding styles
import registerImg from '../assets/images/register.png'; // Placeholder for register image
import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    accountType: 'user', // Default account type
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Updated to useNavigate

  const handleChange = e => {
    setUserData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userData);
      console.log('Registered successfully:', res.data);
      navigate('/login'); // Updated to use navigate
    } catch (err) {
      setError(err.response.data.message);
      console.error('Registration failed:', err.response.data.message);
    }
  };

  return (
    <>
      <CommonSection title="Register" />
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="register_container d-flex justify-content-between">
                <div className="register_img">
                  <img src={registerImg} alt="Register" />
                </div>
                <div className="register_form">
                  <div className="user">
                    <img src={userIcon} alt="User" />
                  </div>
                  <h2>Register</h2>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <Form onSubmit={handleRegister}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Username"
                        required
                        id="username"
                        value={userData.username}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        value={userData.email}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        value={userData.password}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <select id="accountType" value={userData.accountType} onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </FormGroup>
                    <button className="btn secondary_btn auth_btn" type="submit">
                      Register
                    </button>
                  </Form>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
