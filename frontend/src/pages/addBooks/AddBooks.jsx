import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import './addBooks.css';

const validationSchema = Yup.object().shape({
  entryDate: Yup.date().required('Entry Date is required'),
  author: Yup.string().required('Author name is required'),
  title: Yup.string().required('Title is required'),
  edition: Yup.string().required('Edition is required'),
  volume: Yup.string().required('Volume is required'),
  publisher: Yup.string().required('Publisher is required'),
  place: Yup.string().required('Place is required'),
  year: Yup.number().min(1000).max(new Date().getFullYear()).required('Year is required'),
  pages: Yup.number().min(1).required('Pages required'),
  billNo: Yup.string().required('Bill No is required'),
  billDate: Yup.date().required('Bill Date is required'),
  vendor: Yup.string().required('Vendor name is required'),
  cost: Yup.number().min(0).required('Cost is required'),
});

export const AddBooks = () => {
  return (
    <div className="add-book-screen">
      <Container className="d-flex justify-content-center align-items-center h-100">
        <Card className="p-4 add-book-container">
          <h5 className="text-center fw-bold mb-4 add-book-heading">ADD NEW BOOK</h5>

          <Formik
            initialValues={{
              entryDate: '',
              author: '',
              title: '',
              edition: '',
              volume: '',
              publisher: '',
              place: '',
              year: '',
              pages: '',
              billNo: '',
              billDate: '',
              vendor: '',
              cost: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              toast.success('Book added successfully!');
              resetForm();
            }}
          >
            {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className="form-data">
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Entry Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="entryDate"
                        value={values.entryDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.entryDate && !!errors.entryDate}
                      />
                      <Form.Control.Feedback type="invalid">{errors.entryDate}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Author Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="author"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter author name"
                        isInvalid={touched.author && !!errors.author}
                      />
                      <Form.Control.Feedback type="invalid">{errors.author}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && !!errors.title}
                    placeholder="Enter book title"
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Edition</Form.Label>
                      <Form.Control
                        type="text"
                        name="edition"
                        value={values.edition}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.edition && !!errors.edition}
                      />
                      <Form.Control.Feedback type="invalid">{errors.edition}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Volume</Form.Label>
                      <Form.Control
                        type="text"
                        name="volume"
                        value={values.volume}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.volume && !!errors.volume}
                      />
                      <Form.Control.Feedback type="invalid">{errors.volume}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Publisher</Form.Label>
                      <Form.Control
                        type="text"
                        name="publisher"
                        value={values.publisher}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.publisher && !!errors.publisher}
                      />
                      <Form.Control.Feedback type="invalid">{errors.publisher}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Place</Form.Label>
                      <Form.Control
                        type="text"
                        name="place"
                        value={values.place}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.place && !!errors.place}
                      />
                      <Form.Control.Feedback type="invalid">{errors.place}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        type="number"
                        name="year"
                        value={values.year}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.year && !!errors.year}
                      />
                      <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Pages</Form.Label>
                      <Form.Control
                        type="number"
                        name="pages"
                        value={values.pages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.pages && !!errors.pages}
                      />
                      <Form.Control.Feedback type="invalid">{errors.pages}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Bill No</Form.Label>
                      <Form.Control
                        type="text"
                        name="billNo"
                        value={values.billNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.billNo && !!errors.billNo}
                      />
                      <Form.Control.Feedback type="invalid">{errors.billNo}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Bill Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="billDate"
                        value={values.billDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.billDate && !!errors.billDate}
                      />
                      <Form.Control.Feedback type="invalid">{errors.billDate}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Vendor Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="vendor"
                        value={values.vendor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.vendor && !!errors.vendor}
                      />
                      <Form.Control.Feedback type="invalid">{errors.vendor}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <Form.Label>Cost on Bill</Form.Label>
                      <Form.Control
                        type="number"
                        name="cost"
                        value={values.cost}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.cost && !!errors.cost}
                        step="0.01"
                      />
                      <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="w-100 submit-btn">Add Book</Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
  );
};