import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";




function Signin (){

  const emailRef =   useRef()
  const passwordRef =   useRef()
const navigate =useNavigate()
const auth = getAuth()
    const handleSubmit = (event)=>{
        event.preventDefault()
      
       const email = emailRef.current.value;
       const password = passwordRef.current.value;
    
       signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         // ...
         navigate('/')
         console.log('User signed in:', user);
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.error('Error signing in:', errorCode, errorMessage)
       });
     }
    return(
        <div className="main">
        
        <form className="container" onSubmit={handleSubmit}>
         <h1 className="headin">Sign in</h1>
         
          <input className="inpoot" ref={emailRef} type="email" placeholder="Enter your email address"/>
          <input className="inpoot"  ref={passwordRef} type="password" placeholder="set your password"/>
          <button className="btn" type="submit">signin</button>
          <p  className="content"><Link to="/signup">click here if you want to create an account</Link></p>

        </form>

        <div className="visuals">

        </div>

    </div>
    )
}
export default Signin