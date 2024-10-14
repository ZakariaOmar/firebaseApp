import { Link, Outlet, useNavigate } from "react-router-dom";
import "../Home.css";

import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore"; 
import { app } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
function Home({profile,setProfile}) {
  const db = getFirestore(app);
  const auth = getAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('')

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async ()=>{

          const queryDoc = query(
            collection(db, "users"),
            where("userId", "==", user.uid)
          );
          
          const querySnapshot = await getDocs(queryDoc);
          querySnapshot.forEach((userDoc) => {
            let username = userDoc.data().userName;
            let profileImg = userDoc.data().profileImage
            console.log(profileImg)
            console.log(username);
            setUserName(username)
            setProfile(profileImg)
          });
        }
        fetchUser()
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        navigate("/signin");
      }
    });
  }, []);
  return (
    <div className="main">
      <Sidenav />
      <div className="gunners">
        <Header username={userName} profile={profile}/>
        <div className="header">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
