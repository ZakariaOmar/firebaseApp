import Table from 'react-bootstrap/Table';
import { app } from "../firebase";
import { collection, deleteDoc, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { set } from 'firebase/database';
// import '../Home.css'
import { FaRegTrashAlt } from 'react-icons/fa';
function BasicExample() {
    const db = getFirestore(app);
    const [expenses, setExpenses] = useState([]);
    useEffect(() =>{
        const unSubscribe = onSnapshot(collection(db, "expenses"),  (querySnapshot)=>{
            const usersList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}));
            setExpenses(usersList);
        });
       
        // Cleanup the subscription on unmount
        return () => unSubscribe();

       
    },[db]);

    const handleDelete = async(id) =>{
        try{
            await deleteDoc(doc(db,"expenses", id));
            setExpenses(expenses.filter(item=> item.id !==id));
        } catch(error){
            console.error("error deleting documents:", error )
        }
    }
  return (
    <Table className='table' striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Rent</th>
          <th>Salary</th>
          <th>Electricitybill</th>
          <th>Food</th>
          <th>Delete</th>
          
        </tr>
      </thead>
      <tbody className='tbody'>
      {expenses.map((expenses, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{expenses.rent}</td>
            <td>{expenses.salary}</td>
            <td>{expenses.electricitybill}</td>
            <td>{expenses.food}</td>
            <td><button className='deletebtn'  
              onClick={() => handleDelete(expenses.id)}>
              <FaRegTrashAlt />
              </button></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicExample;