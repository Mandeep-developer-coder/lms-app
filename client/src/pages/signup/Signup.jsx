import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, ProgressBar, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios"


import './signup.css';

const validationSchema = Yup.object().shape({
  userName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only alphabets allowed')
    .min(2, 'Minimum 2 characters')
    .required('Full Name is required'),
  fatherName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Only alphabets allowed')
    .min(2, 'Minimum 2 characters')
    .required("Father's Name is required"),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  address: Yup.string()
    .min(10, 'Minimum 10 characters')
    .required('Address is required'),
  batch: Yup.string()
    .matches(/^\d{4}-\d{4}$/, 'Format: YYYY-YYYY')
    .test('valid-years', 'Start year must be less than end year', (val) => {
      if (!val) return false;
      const [start, end] = val.split('-').map(Number);
      return start < end;
    })
    .required('Batch is required'),
  course: Yup.string().required('Course is required'),
  semester: Yup.string().required('Semester is required'),
  rollNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only')
    .min(6, 'Minimum 6 characters')
    .required('Roll No is required'),
  number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Must be a valid 10-digit Indian number')
    .required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[a-z]/, 'At least one lowercase letter')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[@$!%*?&#]/, 'At least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const courses = ['BCA', 'BBA', 'MCA', 'MBA', 'BCA CTIS', 'BCA AI'];

export const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [semesterTouchedBeforeCourse, setSemesterTouchedBeforeCourse] = useState(false);

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#]/.test(password)) score++;

    if (score <= 1) return 'Weak';
    if (score === 2 || score === 3) return 'Medium';
    return 'Strong';
  };

  const renderStrengthBar = () => {
    let variant = 'danger';
    let now = 33;
    if (passwordStrength === 'Medium') {
      variant = 'warning';
      now = 66;
    } else if (passwordStrength === 'Strong') {
      variant = 'success';
      now = 100;
    }
    return (
      <div className="mt-2">
        <ProgressBar now={now} variant={variant} className="mb-2" animated label={passwordStrength} />
      </div>
    );
  };

  return (
    <div className="signup-screen">
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Card className="p-4 signup-container">
          <h5 className="text-center fw-bold mb-4 signup-heading">SIGNUP</h5>

          <Formik
            initialValues={{
              userName: '',
              fatherName: '',
              email: '',
              address: '',
              batch: '',
              course: '',
              semester: '',
              rollNumber: '',
              number: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
           onSubmit={async (values, { resetForm }) => {
  try {
    //new 
    const res = await axios.post("http://localhost:3000/auth/signup", values);

   
    console.log("Response from server:", res.data);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message); 
       navigate("/student-page"); 
      return;
    } else {
      toast.error(res.data.message || "Signup failed!");
    }
  } catch (err) {
   
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error('Something went wrong during signup!');
    }

    console.error("Signup error:", err.response?.data || err.message);
  }
}}

          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              setFieldValue,
            }) => {
              const handlePasswordChange = (e) => {
                const password = e.target.value;
                setFieldValue('password', password);
                setPasswordStrength(getPasswordStrength(password));
              };

              const getSemesters = () => {
                const isMasters = values.course === 'MCA' || values.course === 'MBA';
                return Array.from({ length: isMasters ? 4 : 6 }, (_, i) => `${i + 1}`);
              };

              return (
                <Form noValidate onSubmit={handleSubmit} className="form-data">
                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="userName"
                          placeholder="Enter full name"
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.userName && !!errors.userName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Father's Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fatherName"
                          placeholder="Enter father name"
                          value={values.fatherName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.fatherName && !!errors.fatherName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.fatherName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter your full address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.address && !!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Batch</Form.Label>
                    <Form.Control
                      type="text"
                      name="batch"
                      placeholder="Enter your batch (e.g., 2024-2026)"
                      value={values.batch}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.batch && !!errors.batch}
                    />
                    <Form.Control.Feedback type="invalid">{errors.batch}</Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Course</Form.Label>
                        <Form.Select
                          name="course"
                          value={values.course}
                          onChange={(e) => {
                            setFieldValue('course', e.target.value);
                            setFieldValue('semester', '');
                            setSemesterTouchedBeforeCourse(false);
                          }}
                          onBlur={handleBlur}
                          isInvalid={touched.course && !!errors.course}
                        >
                          <option value="">Select course</option>
                          {courses.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.course}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Semester</Form.Label>
                        <Form.Select
                          name="semester"
                          value={values.semester}
                          onChange={handleChange}
                          onBlur={(e) => {
                            handleBlur(e);
                            if (!values.course) setSemesterTouchedBeforeCourse(true);
                          }}
                          isInvalid={
                            (touched.semester && !!errors.semester) ||
                            semesterTouchedBeforeCourse
                          }
                          disabled={!values.course}
                        >
                          <option value="">Select semester</option>
                          {getSemesters().map((s) => (
                            <option key={s} value={s}>Semester {s}</option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.semester || (semesterTouchedBeforeCourse && 'Select course first')}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Roll Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="rollNumber"
                          placeholder="Enter your roll number"
                          value={values.rollNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.rollNumber && !!errors.rollNumber}
                        />
                        <Form.Control.Feedback type="invalid">{errors.rollNumber}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="number"
                          placeholder="Enter mobile number"
                          value={values.mobile}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.number && !!errors.number}
                        />
                        <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group className="position-relative">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter password"
                          value={values.password}
                          onChange={handlePasswordChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && !!errors.password}
                        />
                        {values.password && (
                          <>
                            <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                            {renderStrengthBar()}
                          </>
                        )}
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="position-relative">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                        />
                        {values.confirmPassword && (
                          <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        )}
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="w-100 submit-btn" type="submit">SIGNUP</Button>
                </Form>
              );
            }}
          </Formik>

          <div className="text-center mt-3 small">
            Already have an account?{' '}
            <Link to="/" className="login-link">Login</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};
