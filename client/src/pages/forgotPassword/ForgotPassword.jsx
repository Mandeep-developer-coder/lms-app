import { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import { OtpVerify } from '../otpVerify/OtpVerify.jsx';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setOtpSent(true);
    }
  }, []);

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/request-otp', { email });
      localStorage.setItem('resetEmail', email);
      toast.success('OTP sent to your email!');
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <Container>
        {!otpSent ? (
          <Card className="p-4 shadow-lg login-container">
            <h5 className="text-center mb-3">Request OTP</h5>
            <Form.Group className="mb-3">
              <Form.Label>Registered Email</Form.Label>
              <Form.Control
                type="email"
                name='email'
                autoComplete='email'
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              className="w-100 login-btn"
              onClick={handleRequestOtp}
              disabled={loading || !email}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" role="status" className="me-2" />
                  Sending...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>
          </Card>
        ) : (
          <Card className="p-4 shadow-lg login-container mt-3">
            <OtpVerify />
          </Card>
        )}
      </Container>
    </div>
  );
};