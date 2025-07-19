import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: yup.object({
      newPassword: yup
        .string()
        .required("Required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
          "Weak password"
        ),
      confirmPassword: yup
        .string()
        .required("Required")
        .oneOf([yup.ref("newPassword")], "Password mismatch")
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/auth/reset-password", {
  email: localStorage.getItem("resetEmail"),
   newPassword: values.newPassword
        });

        toast.success(response.data.message);
        localStorage.removeItem("resetEmail");
        setTimeout(()=>
        { 
        navigate("/login");
        },2000)
      } catch (e) {
        toast.error(e.response?.data?.message || "Something went wrong");
      }
    }
  });

  return (
    <Container
      className="bg-light shadow rounded mt-5 p-4"
      style={{ width: "400px" }}
    >
      <h3 className="mb-4" style={{ color: "#5f6fff", textAlign: "center" }}>
        Reset Password
      </h3>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="ml-1 mt-3">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center mt-3">
          <Button
            type="submit"
            className="mt-4 px-3 w-50 text-center d-block mx-auto"
            style={{ backgroundColor: "#5f6fff" }}
          >
            Update Password
          </Button>
        </div>
      </Form>
    </Container>
  );
};
