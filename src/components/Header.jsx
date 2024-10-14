import { useState } from "react";
import { Navbar, Spinner } from "react-bootstrap"
import { FaRegBell } from "react-icons/fa"
import { useResolvedPath } from "react-router-dom";
// import { useLocation } from "react-router-dom";


function Header({username,user, profile}) {
  console.log(profile)
    // const [profileImage, setProfileImage] = useState(null);
  // const location = useLocation();

  // const getTitle = () => {
  //   switch (location.pathname) {
  //     case '/income':
  //       return 'Income';
  //     case '/expense':
  //       return 'Expense';
  //     case '/profile':
  //       return 'Profile';
  //     case '/settings':
  //       return 'Settings';
  //     default:
  //       return 'Dashboard';
  //   }
  // };

  const params = useResolvedPath();


    return (
      <div className="navbar">
        <h1>
          {params.pathname === "/"
            ? "Dashboard"
            :params.pathname.replace("/", "")}
         
        </h1> 
       <div className="bell"><FaRegBell /></div> 
         <div className="info">
           <div className="profile">
           {profile ? (
             <img src={profile} alt="Profile"  style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            ) : (
              
              <div>No Profile Image</div>
            )}
                      <p>{user}</p>
             </div>
         </div>
         <h6 id="username">{username}</h6>
       </div>
      
        
    );
}

export default Header
