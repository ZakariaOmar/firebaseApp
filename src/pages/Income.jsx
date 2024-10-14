import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"
import { app } from "../firebase";
import { Button, Form, Modal } from "react-bootstrap";
import "../Income.css";
import Table from '../components/Table.jsx'
import "../Home.css"
function Income() {
  const db = getFirestore(app);
  const [appliance, setAppliance] = useState("");
  const [electronics, setElectronics] = useState("");
  const [exports, setExports] = useState("");
  const [services, setServices] = useState("");
  const [hardware, setHardware] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIncome = doc(collection(db, "income"));
    await setDoc(newIncome, { appliance, electronics, exports, services, hardware });
    // fetchIncomeData();
  };

  return (
    <div>
      {/* <h1>Income</h1> */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="submit" >Add Income</button>
      </form> */}
      <IncomeModal
        setAppliance={setAppliance}
        handleSubmit={handleSubmit}
        setElectronics={setElectronics}
        setExports={setExports}
        setServices={setServices}
        setHardware={setHardware}
      />
      <Table/>
    </div>
  );
}

        // setServices={setServices}
        const IncomeModal = ({ setAppliance, setElectronics, handleSubmit, setExports, setServices, setHardware  }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Income
      </Button>

      <Modal className="modal" show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e)=> e.preventDefault()}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Appliances</Form.Label>
              <Form.Control
                onChange={(e) => setAppliance(e.target.value)}
                type="text"
                placeholder=""
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Electronics</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setElectronics(e.target.value)}
              />
            </Form.Group>
             <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Exports</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setExports(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Services</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setServices(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>hardware</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setHardware(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Income;
