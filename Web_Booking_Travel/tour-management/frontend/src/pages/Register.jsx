import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import '../styles/login.css';
import registerImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
    accountType: 'user' // Thêm trường accountType với giá trị mặc định là 'user'
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Col lg='8' className="m-auto" >
          <div className='login_container d-flex justify-content-between'>
            <div className="login_img">
              <img src={registerImg} alt="" />
            </div>
            <div className="login_form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>
              <h2>Register</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input type="text" placeholder="Email" required id="email" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <input type="text" placeholder="Phone" required id="phone" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <input type="text" placeholder="Username" required id="user" onChange={handleChange} /> {/* Sửa id thành "userName" */}
                </FormGroup>
                <FormGroup>
                  <input type="password" placeholder="Password" required id="password" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                  <select className="accountType" onChange={handleChange}>
                    <option value="user">User</option> {/* Thêm option cho user */}
                    <option value="sale">Sale</option> {/* Thêm option cho saler */}
                  </select>
                </FormGroup>
                <button className="btn secondary_btn auth_btn" type="submit" >Create Account</button>
              </Form>
              <p>Already have an account?<Link to='/login'>Login</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Register;