import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./Home.css";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Errorpage from "./pages/Errorpage.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Sidenav from "./components/Sidenav.jsx"
import Header from "./components/Header.jsx"
import { useState } from "react";


function App() {
  const [profile, setProfile] = useState(null)

  return (
    <BrowserRouter>
     {/* <Header/>  */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home  setProfile={setProfile} profile={profile} />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="profile" element={<Profile setProfile={setProfile} profile={profile} />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
