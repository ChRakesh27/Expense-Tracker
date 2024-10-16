import React, { useEffect, useRef, useState } from "react";
import "./Expense.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Expense() {
  const API_URL = "/api/v1";
  // const API_URL = "http://localhost:3001/api/v1/";
  const navigate = useNavigate();
  const [dataSet, setDataSet] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(true);
  const [isAddAnother, setIsAddAnother] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const formRef = useRef(null);

  const [item, setItem] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("authToken");
    if (!userData) {
      navigate("/Login");
    }
    const userName = JSON.parse(userData).userName;
    setUserDetails(userName);
    async function fetch() {
      try {
        const res = await axios.get(API_URL + "/expenses");

        setDataSet(res.data);
      } catch (e) {
        console.log("🚀 ~ fetch ~ e:", e);
        navigate("/Login");
      }
    }
    fetch();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setItem({
        _id: "",
        title: "",
        amount: "",
        category: "",
        date: "",
      });
    }
  }, [isModalOpen]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const handleModal = (isNew) => {
    setIsModalOpen((val) => !val);
    setIsNewItem(isNew);
  };

  async function updateItem(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(formRef.current);
      const newItem = Object.fromEntries(formData.entries());

      await axios.patch(`${API_URL}/expenses/${item._id}`, newItem);

      const updatedDataSet = dataSet.map((ele) => {
        if (ele._id === item._id) {
          ele = { _id: item._id, ...newItem };
        }
        return ele;
      });

      setDataSet(updatedDataSet);
      handleModal(false);
    } catch (e) {
      console.log("🚀 ~ updateItem ~ e:", e);
    }
    setIsLoading(false);
  }

  async function addItem(e) {
    setIsLoading(true);

    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const newItem = Object.fromEntries(formData.entries());
      const res = await axios.post(API_URL + "/expenses", newItem);

      setDataSet((val) => [...val, res.data]);
      formRef.current.reset();
      if (!isAddAnother) {
        handleModal(false);
      }
    } catch (e) {
      console.log("🚀 ~ addItem ~ e:", e);
    }
    setIsLoading(false);
  }
  async function deleteItem(item) {
    setIsLoading(true);

    try {
      await axios.delete(`${API_URL}/expenses/${item._id}`);
      setDataSet((val) => val.filter((ele) => ele._id !== item._id));
    } catch (e) {
      console.log("🚀 ~ addItem ~ e:", e);
    }
    setIsLoading(false);
  }

  function logout() {
    localStorage.removeItem("authToken");
    navigate("/Login");
  }
  return (
    <>
      {isLoading && (
        <div className="loading">
          <div className="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Container>
        <div className="nav d-flex justify-content-end align-items-center pe-5">
          <span className="fs-2 me-5">{userDetails}</span>
          <div>
            <Button ariant="primary" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center pt-5">
          <h1>EXPENSE TRACKER</h1>
          <div className="me-5 pe-5">
            <Button variant="primary" onClick={() => handleModal(true)}>
              Add
            </Button>
          </div>
        </div>
        <Table striped bordered hover responsive width="100%">
          <thead>
            <tr>
              <th width="5%">#</th>
              <th width="20%">Title</th>
              <th width="20%">Amount</th>
              <th width="20%">Category</th>
              <th width="20%">
                Date <i>(YYYY-MM-DD)</i>
              </th>
              <th width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataSet &&
              dataSet.map((ele, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ele.title}</td>
                  <td>{ele.amount}</td>
                  <td>{ele.category}</td>
                  <td>{formatDate(ele.date)}</td>
                  <td>
                    <Button
                      variant="outline-success"
                      className="me-3"
                      size="sm"
                      onClick={() => {
                        setItem(ele);
                        handleModal(false);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteItem(ele)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Modal
          show={isModalOpen}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={handleModal}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Expense</Modal.Title>
          </Modal.Header>
          <form ref={formRef} onSubmit={isNewItem ? addItem : updateItem}>
            <Modal.Body>
              <Row className="row">
                <Col xs={6} md={4}>
                  Title
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    defaultValue={item.title}
                    required
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col xs={6} md={4}>
                  Amount
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={item.amount}
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col xs={6} md={4}>
                  Category
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="text"
                    name="category"
                    defaultValue={item.category}
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col xs={6} md={4}>
                  Date
                </Col>
                <Col xs={12} md={8}>
                  <input
                    type="date"
                    name="date"
                    defaultValue={formatDate(item.date)}
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              {isNewItem && (
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={isAddAnother}
                    onChange={(e) => setIsAddAnother((val) => !val)}
                  />
                  Add Another
                </div>
              )}
              <Button variant="secondary" onClick={handleModal}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                {isNewItem ? "Create" : "Update"}
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Container>
    </>
  );
}

export default Expense;
