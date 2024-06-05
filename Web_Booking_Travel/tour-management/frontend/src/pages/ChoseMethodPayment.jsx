import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Container, Button, Box, Typography, Grid, Paper, Card, CardContent, CardActions } from '@mui/material';
import { URL_DOMAIN } from '../utils/config';
import { Col } from 'reactstrap';

const ChoseMethodPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [totalAmount, setTotalAmount] = useState(null);
  const [tourName, setTourName] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState({
    fullName: '',
    phoneNumber: '',
    userEmail: '',
    guestSize: '',
    BookAt: ''
  });
  const [credentials] = useState({
    partnerCode: "",
    payUrl: "",
  });
  const [data] = useState({
    links: []
  });
  useEffect(() => {
    if (location.state) {
      setTotalAmount(location.state.totalAmount);
      setTourName(location.state.tourName);
      setBuyerInfo({
        fullName: location.state.fullName,
        phoneNumber: location.state.phoneNumber,
        userEmail: location.state.userEmail,
        guestSize: location.state.guestSize,
        BookAt: location.state.BookAt
      });
    } else {
      navigate('/booking');
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', paymentDetails);
    alert('Payment Successful!');
  };
  const GetMethod = async (res) => {
    try {
      res = await fetch(`${URL_DOMAIN}/paymentmmo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });
      if (!res.ok) {
        console.log("error");
      } else {
        const result = await res.json();
        window.location.href = result.data.payUrl;
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  const GetMethodPaypal = async (res) => {
    try {
      res = await fetch(`${URL_DOMAIN}/paymentPayPal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        console.log("error");
      } else {
        const result = await res.json();
        console.log("", result.data.links[1].href)
        const link = result.data.links[1].href;
        window.location.href = link;
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  if (!totalAmount || !tourName) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        {/* Left Side: Booking Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Booking Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Total Amount:</strong> ${totalAmount}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Tour:</strong> {tourName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Full Name:</strong> {buyerInfo.fullName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone Number:</strong> {buyerInfo.phoneNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {buyerInfo.userEmail}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Guest Size:</strong> {buyerInfo.guestSize}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Book At:</strong> {buyerInfo.BookAt}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Choose Payment Method */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Choose Payment Method
              </Typography>
              <Box>
                <CardActions>
                  <Col lg='12' className='d-flex align-items-center'>
                    <Button variant="contained" color="secondary" onClick={GetMethod}>
                      <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>Momo</Link>
                    </Button>
                  </Col>
                </CardActions>
                <CardActions>
                  <Col lg='12' className='d-flex align-items-center'>
                    <Button variant="contained" color="secondary" onClick={GetMethodPaypal}>
                      <Link to="#" style={{ color: 'white', textDecoration: 'none' }}>PayPal</Link>
                    </Button>
                  </Col>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChoseMethodPayment;
