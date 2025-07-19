// import { useState, useEffect, useRef, useCallback } from 'react';
// import { Form, Button, Row, Col, Alert, Spinner, ProgressBar } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { FaKey, FaSyncAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';

// export const OtpVerify = () => {
//   const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
//   const [otp, setOtp] = useState('');
//   const [verified, setVerified] = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [resending, setResending] = useState(false);
//   const [resetLoading, setResetLoading] = useState(false);
//   const [showNewPass, setShowNewPass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState('');
//   const [email, setEmail] = useState('');
//   const navigate = useNavigate();
//   const otpRefs = useRef([]);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('resetEmail');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       navigate('/forgot-password');
//     }
//   }, [navigate]);

//   const handleVerifyOtp = useCallback(async (otpValue) => {
//     try {
//       await axios.post('http://localhost:5000/api/request-otp/verify', { email, otp: otpValue });
//       toast.success('OTP verified successfully!');
//       setVerified(true);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Invalid OTP');
//     }
//   }, [email]);

//   useEffect(() => {
//     const joined = otpDigits.join('');
//     setOtp(joined);
//     if (joined.length === 6) {
//       handleVerifyOtp(joined);
//     }
//   }, [otpDigits, handleVerifyOtp]);

//   useEffect(() => {
//     let timer;
//     if (resendCooldown > 0) {
//       timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [resendCooldown]);

//   const handleOtpChange = (e, index) => {
//     const value = e.target.value;
//     if (!/\d/.test(value) && value !== '') return;

//     const newOtp = [...otpDigits];
//     newOtp[index] = value;
//     setOtpDigits(newOtp);

//     if (value && index < 5) {
//       otpRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
//       otpRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleResendOtp = async () => {
//     setResending(true);
//     try {
//       await axios.post('http://localhost:5000/api/request-otp', { email });
//       toast.success('OTP resent successfully!');
//       setResendCooldown(30);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to resend OTP');
//     } finally {
//       setResending(false);
//     }
//   };

//   const getPasswordStrength = (password) => {
//     let score = 0;
//     if (password.length >= 6) score++;
//     if (/[A-Z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[@$!%*?&#]/.test(password)) score++;

//     if (score <= 1) return 'Weak';
//     if (score === 2 || score === 3) return 'Medium';
//     return 'Strong';
//   };

//   const formik = useFormik({
//     initialValues: {
//       newPassword: '',
//       confirmPassword: '',
//     },
//     validationSchema: Yup.object({
//       newPassword: Yup.string().min(6, 'At least 6 characters').required('Required'),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('newPassword')], 'Passwords must match')
//         .required('Required'),
//     }),
//     onSubmit: async (values) => {
//       setResetLoading(true);
//       try {
//         const res = await axios.post('http://localhost:5000/api/request-otp/reset-password', {
//           email,
//           newPassword: values.newPassword,
//         });

//         toast.success(res.data.message || 'Password reset successfully!');
//         localStorage.removeItem('resetEmail');
//         setTimeout(() => {
//           setResetLoading(false);
//           navigate('/login');
//         }, 1500);
//       } catch (err) {
//         setResetLoading(false);
//         const msg = err.response?.data?.message;
//         if (msg === 'New password cannot be same as old password') {
//           toast.error('You are using your old password. Please enter a new one.');
//         } else {
//           toast.error(msg || 'Reset failed. Try again.');
//         }
//       }
//     },
//   });

//   useEffect(() => {
//     setPasswordStrength(getPasswordStrength(formik.values.newPassword));
//   }, [formik.values.newPassword]);

//   const renderStrengthBar = () => {
//     let variant = 'danger';
//     let now = 33;
//     if (passwordStrength === 'Medium') {
//       variant = 'warning';
//       now = 66;
//     } else if (passwordStrength === 'Strong') {
//       variant = 'success';
//       now = 100;
//     }
//     return (
//       <div className="mt-2">
//         <ProgressBar
//           now={now}
//           variant={variant}
//           className="mb-2"
//           animated
//           label={passwordStrength}
//         />
//       </div>
//     );
//   };

//   if (!email) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//         <p className="mt-2">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="fade show">
//       {!verified ? (
//         <>
//           <h5 className="text-center mb-3">🔐 Step 2: Verify OTP</h5>
//           <Alert variant="info" className="text-center">
//             OTP has been sent to <strong>{email}</strong>
//           </Alert>

//           <Form.Label>Enter 6-digit OTP</Form.Label>
//           <div className="d-flex justify-content-between gap-2 mb-3">
//             {otpDigits.map((digit, index) => (
//               <Form.Control
//                 key={index}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 className="text-center border border-secondary rounded shadow-sm"
//                 style={{ width: '45px', height: '50px', fontSize: '20px' }}
//                 onChange={(e) => handleOtpChange(e, index)}
//                 onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                 ref={(el) => (otpRefs.current[index] = el)}
//               />
//             ))}
//           </div>

//           <Row className="mb-3">
//             <Col xs={7}>
//               <Button className="w-100 login-btn" onClick={() => handleVerifyOtp(otp)}>
//                 <FaKey className="me-2" /> Verify OTP
//               </Button>
//             </Col>
//             <Col xs={5}>

//               <Button
//                 variant="link"
//                 className="p-0 text-primary w-100"
//                 onClick={handleResendOtp}
//                 disabled={resendCooldown > 0 || resending}
//                 style={{ textDecoration: 'none' }}
//               >
//                 <div className="d-flex align-items-center justify-content-center gap-2">
//                   {resending ? (
//                     <>
//                       <Spinner animation="border" size="sm" style={{ color: '#8f55f3' }} />
//                       <span style={{ color: '#8f55f3', fontWeight: '500' }}>Resending...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FaSyncAlt size={15} style={{ color: 'black' }} />
//                       <span style={{ color: '#8f55f3', fontWeight: '500' }}>
//                         Resend {resendCooldown > 0 && `(${resendCooldown}s)`}
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </Button>

//             </Col>
//           </Row>
//         </>
//       ) : (
//         <Form noValidate onSubmit={formik.handleSubmit} className="fade show">
//           <h5 className="text-center mb-3">🔒 Step 3: Reset Password</h5>

//           <Form.Group className="mb-3 position-relative">
//             <Form.Label>New Password</Form.Label>
//             <Form.Control
//               type={showNewPass ? 'text' : 'password'}
//               name="newPassword"
//               value={formik.values.newPassword}
//               onChange={formik.handleChange}
//               isInvalid={formik.touched.newPassword && formik.errors.newPassword}
//             />
//             {formik.values.newPassword && (
//               <span className="password-toggle-icon" onClick={() => setShowNewPass(!showNewPass)}>
//                 {showNewPass ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             )}
//             {formik.values.newPassword && renderStrengthBar()}
//             <Form.Control.Feedback type="invalid">
//               {formik.errors.newPassword}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-3 position-relative">
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type={showConfirmPass ? 'text' : 'password'}
//               name="confirmPassword"
//               value={formik.values.confirmPassword}
//               onChange={formik.handleChange}
//               isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
//             />
//             {formik.values.confirmPassword && (
//               <span className="password-toggle-icon" onClick={() => setShowConfirmPass(!showConfirmPass)}>
//                 {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             )}
//             <Form.Control.Feedback type="invalid">
//               {formik.errors.confirmPassword}
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Button type="submit" className="w-100 login-btn" disabled={resetLoading}>
//             {resetLoading ? (
//               <>
//                 <Spinner animation="border" size="sm" className="me-2" />
//                 Resetting Password...
//               </>
//             ) : (
//               'Reset Password'
//             )}
//           </Button>
//         </Form>
//       )}
//     </div>
//   );
// };







import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const OtpVerify  = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: ""
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
    }),
    onSubmit: async(values) => {
        try{
      const response = await axios.post("http://localhost:3000/auth/verify-otp",{
  email: localStorage.getItem("resetEmail"),
   otp : values.otp
      })
      toast.success(response.data.message);
      setTimeout(()=>{
      navigate("/reset-password");
      },3000)
    }
    catch(e)
    {
    toast.error(e.response?.data?.message || "OTP verification failed.");    }
    }
  });

  return (
    <Container className="bg-light shadow p-4 rounded" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h3 className="mb-4" style={{ color: "#5f6fff", textAlign: "center" }}>Verify OTP</h3>
      
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Enter the OTP sent to your email</Form.Label>
          <Form.Control
            type="text"
            name="otp"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.otp && !!formik.errors.otp}
            className="text-center"
          />
          {formik.touched.otp && formik.errors.otp && (
            <div className="error-text text-danger">{formik.errors.otp}</div>
          )}
        </Form.Group>

        <Button
          type="submit"
          className="mt-4 px-3 w-50 text-center d-block mx-auto"
          style={{ backgroundColor: "#5f6fff" }}
        >
          Verify OTP
        </Button>
      </Form>
    </Container>
  );
};
