import { useState } from "react";
import {app} from "../firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { Button,Form, Modal } from "react-bootstrap";
import Zable from '../components/Zable.jsx';
function Expense (){
    const db =getFirestore(app)
    const [rent, setRent]= useState("");
    const [salary, setSalary]= useState("");
    const [electricitybill, setElectricitybill]= useState("");
    const [food, setFood]= useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newExpense = doc(collection(db, "expenses"));
        await setDoc(newExpense, { rent, salary, electricitybill, food});

    }

    return(
        <>
           <IncomeModal
             setRent={setRent}
             handleSubmit={handleSubmit}
             setSalary={setSalary}
             setElectricitybill={setElectricitybill}
             setFood={setFood}
            />
            <Zable/>
        </>
       
     
    )
}


const IncomeModal = ({ setRent, setSalary, handleSubmit, setElectricitybill, setFood }) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Expenses
        </Button>
  
        <Modal className="modal" show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e)=> e.preventDefault()}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> Rent</Form.Label>
                <Form.Control
                  onChange={(e) => setRent(e.target.value)}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Form.Group>
               <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Electricitybill</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setElectricitybill(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Food</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFood(e.target.value)}
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
  


export default Expense