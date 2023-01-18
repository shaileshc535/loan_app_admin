import React, { useState, useRef } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createPromoCode } from "../../redux/action/promocodeAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePromocode({ showChange }) {
  const [state, setState] = useState({
    name: "",
    code: "",
    ispercentage: "",
  });

  const { name, code, ispercentage } = state;

  let dispatch = useDispatch();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !code) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(createPromoCode(state));
      showChange();
    }
  };

  return (
    <div className="content">
      <Row>
        <ToastContainer />
        <Col>
          <div className="my-4">
            <Button
              onClick={() => showChange()}
              className="btn btn-sm btn-warning mx-2"
            >
              Back
            </Button>
          </div>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Header>
              <h4 className="card-title">Add New Promo-Code</h4>
            </Card.Header>
            <Card.Body>
              <Form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="name">
                      <Form.Label>Promotion Code Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Promotion Code Name"
                        name="name"
                        value={name}
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="code">
                      <Form.Label>Promotion Code</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="code"
                        placeholder="Promotion Code"
                        value={code}
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="ispercentage">
                      <Form.Label>Discount Percentage</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="ispercentage"
                        placeholder="Discount Percentage"
                        value={ispercentage}
                        className="form-control"
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3">
                    <Button
                      type="submit"
                      className="update btn btn-sm btn-success btn-block form-control"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CreatePromocode;
