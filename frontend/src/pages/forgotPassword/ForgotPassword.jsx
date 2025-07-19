// import { useState, useEffect } from 'react';
// import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// import { OtpVerify } from '../otpVerify/OtpVerify.jsx';

// export const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('resetEmail');
//     if (storedEmail) {
//       setEmail(storedEmail);
//       setOtpSent(true);
//     }
//   }, []);

//   const handleRequestOtp = async () => {
//     setLoading(true);
//     try {
//       await axios.post('http://localhost:5000/api/request-otp', { email });
//       localStorage.setItem('resetEmail', email);
//       toast.success('OTP sent to your email!');
//       setOtpSent(true);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-screen">
//       <Container>
//         {!otpSent ? (
//           <Card className="p-4 shadow-lg login-container">
//             <h5 className="text-center mb-3">Request OTP</h5>
//             <Form.Group className="mb-3">
//               <Form.Label>Registered Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name='email'
//                 autoComplete='email'
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </Form.Group>
//             <Button
//               className="w-100 login-btn"
//               onClick={handleRequestOtp}
//               disabled={loading || !email}
//             >
//               {loading ? (
//                 <>
//                   <Spinner animation="border" size="sm" role="status" className="me-2" />
//                   Sending...
//                 </>
//               ) : (
//                 'Send OTP'
//               )}
//             </Button>
//           </Card>
//         ) : (
//           <Card className="p-4 shadow-lg login-container mt-3">
//             <OtpVerify />
//           </Card>
//         )}
//       </Container>
//     </div>
//   );
// };



import { useFormik } from "formik";
import { Form, Container, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

export const ForgotPassword  = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
    }),
    
    onSubmit : async(values)=>
    {
      const toastId = toast.loading("Sending OTP...",{
        style:{
          backgroundColor: "#061561", 
          color: "white",
         fontWeight: "500",
        }
      })
      try
      {
      const response = await axios.post("http://localhost:3000/auth/verify-email",{
        email : values.email
      })
      toast.update(toastId,{
        render : response.data.message,
        isLoading : false,
        autoClose : 2000,
        type : "success",
        style : {}
      })
      localStorage.setItem("resetEmail", values.email);
       setTimeout(() => {
         navigate("/verify-otp");
       }, 3000);
      }
     catch (error) {
        toast.update(toastId, {
          render: error.response?.data?.message || "Failed to send OTP",
          type: "error",
          isLoading: false,
          autoClose: 3000,
           style: {}
        });
        console.error("Error sending OTP:", error);
      }
    }
  });

  return (
    <Container
      className="bg-light shadow rounded mt-5"
      style={{ width: "400px", height: "250px" }}
    >
      <h3 className="mb-4" style={{ color: "#5f6fff", textAlign: "center" }}>
        Forgot Password
      </h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label className="mb-2 ml-2">Enter your registered email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isInvalid={formik.touched.email && !!formik.errors.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-text">{formik.errors.email}</div>
          )}
        </Form.Group>

        <Button
          type="submit"
          className="mt-4 px-3 w-50 text-center d-block mx-auto"
          style={{ backgroundColor: "#5f6fff" }}
        >
          Send OTP
        </Button>
      </Form>
    </Container>
  );
};
