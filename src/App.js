import "./App.css";
import LandingPage from "./Components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import Groups from "./Components/Groups";
import Account from "./Components/Account";
import Messages from "./Components/Messages";
import CreateThrift from "./Components/CreateThrift";
import EachgroupUser from "./Components/EachgroupUser";
import Fetch from "./Components/Fetch";
import JoinGroup from "./Components/JoinGroup";
import Settings from "./Components/Settings";
import About from "./Components/About";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/groups" element={<Groups/>}/>
        <Route path="/contribution" element={<EachgroupUser/>}/>
        <Route path="/account" element={<Account/>} />
        <Route path="/messages" element={<Messages/>}/> 
        <Route path="/create" element={<CreateThrift/>} />
        <Route path="/pay" element={<Fetch/>} />
        <Route path="/jointhrift" element={<JoinGroup/>}/>
        <Route path="/settings" element={<Settings/>}/> 
        <Route path="/about" element={<About/>}/> 
      </Routes>
    </div>
  );
}

export default App;
