import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { Link, useNavigate } from "react-router-dom"
import { app } from "../firebase"
import { useRef } from "react"

function Signup(){
    const auth = getAuth()
    const navigate = useNavigate()
    const db = getFirestore(app)
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
 const handleSubmit = (event)=>{
    event.preventDefault()
   const name = nameRef.current.value;
   const email = emailRef.current.value;
   const password = passwordRef.current.value;

   createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    const newUser= doc(collection(db,'users'))
    setDoc(newUser,{
     userId: user.uid,
     userName: name,
     userEmail: email,
     timestamp: new Date().getTime()   
    })
    .then(()=>{
        navigate("/")
    }).catch((error)=>{
        console.log(error)
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(error)
  });
 }
return(
  
    <div className="main">
        
        <form className="container" onSubmit={handleSubmit}>
         <h1 className="headin">Create Account</h1>
         <input className="inpoot" ref={nameRef} type="text" placeholder="Enter your full name"/>
          <input className="inpoot"  ref={emailRef} type="email" placeholder="Enter your email address"/>
          <input className="inpoot" ref={passwordRef}  type="password" placeholder="set your password"/>
          <button className="btn">Create Account</button>
          <p  className="content"><Link to="/signin">Signin here if you already have an account</Link></p>
        </form>

        <div className="visuals">

        </div>

    </div>   
)
}

export default Signup