import Table from 'react-bootstrap/Table';
import { app } from "../firebase";
import { collection, deleteDoc,doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { set } from 'firebase/database';
import '../Home.css'
import { FaRegTrashAlt } from 'react-icons/fa';
function BasicExample() {
    const db = getFirestore(app);
    const [income, setIncome] =useState([]);
    useEffect(() =>{
       const unsubcribe = onSnapshot(collection(db, "income"), (querySnapshot)=>{
        const usersList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setIncome(usersList);
       });
     
      
      

       return () => unsubcribe();
    },[db]);

    const handleDelete = async (id) => {
      try {
          await deleteDoc(doc(db, "income", id));
          setIncome(income.filter(item => item.id !== id));
      } catch (error) {
          console.error("Error deleting document: ", error);
      }
  };
  return (
    <Table className='table' striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Appliances</th>
          <th>Electronics</th>
          <th>Exports</th>
          <th>Services</th>
          <th>Hardware</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      {income.map((income, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{income.appliance}</td>
            <td>{income.electronics}</td>
            <td>{income.exports}</td>
            <td>{income.hardware}</td>
            <td>{income.services}</td>
            <td>
              <button className='deletebtn'  
              onClick={() => handleDelete(income.id)}>
              <FaRegTrashAlt />
              </button>
              </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicExample;