import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import "./contact.css";


import Ball from "../../assets/ball.png";

export const ContactUs = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toggleView = () => setShowDetails((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Too short").required("Name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().min(6, "Minimum 6 characters").required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsSending(true);

      emailjs.send("service_6qqcv79", "template_670n0xv", values, "MN4_m-UcxIfmseV9U")
        .then(() => {
          toast.success("Message sent successfully!");
          resetForm();
          setIsSending(false);
        })
        .catch(() => {
          toast.error("Something went wrong. Try again later.");
          setIsSending(false);
        });
    },
  });

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={`contact-wrapper ${showDetails ? "expanded" : ""}`}>
        <img className="ball" src={Ball} alt="Ball" />
        <div className={`contact-card form-card ${showDetails ? "slide-left" : ""}`}>
          <h2>Send Us a Message</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="form-error">{formik.errors.name}</div>
            )}

            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="form-error">{formik.errors.phone}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="form-error">{formik.errors.email}</div>
            )}

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
            />
            {formik.touched.subject && formik.errors.subject && (
              <div className="form-error">{formik.errors.subject}</div>
            )}

            <textarea
              name="message"
              placeholder="Your Query/Feedback remarks."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="form-error">{formik.errors.message}</div>
            )}

            <div className="form-buttons">
              <button type="submit" className="send-btn" disabled={isSending}>
                {isSending ? "Sending..." : "Send Now"}
              </button>
              <button
                type="button"
                className="contact-clear-btn"
                onClick={() => formik.resetForm()}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <button className="toggle-btn-float" onClick={toggleView}>
          {showDetails ? (
            <>
              <FaAngleDoubleRight /> See Less
            </>
          ) : (
            <>
              See More <FaAngleDoubleLeft />
            </>
          )}
        </button>

        {showDetails && (
          <div className="contact-card contact-info-card">
            <h3>Maharaja Agrasen Institute of Management and Technology</h3>
            <p>Near Agrasen Chowk, Old Saharanpur Road,<br />Adjacent to Sector-15, HUDA, Jagadhri-135003.</p>
            <p><strong>Director:</strong> director@maimt.com</p>
            <p><strong>HR Department:</strong> hr@maimt.com</p>
            <p><strong>Placement Cell:</strong> placement@maimt.com</p>
            <p><strong>MBA Department:</strong> hodmgt@maimt.com</p>
            <p><strong>MCA Department:</strong> hodca@maimt.com</p>
            <p><strong>Librarian:</strong> library@maimt.com</p>
            <h4>HELPLINE</h4>
            <p>01732-235255</p>
            <p>01732-231362</p>
          </div>
        )}
      </div>
    </>
  );
};