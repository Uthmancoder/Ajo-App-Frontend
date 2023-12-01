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
import ForgotPassword from "./Components/ForgotPassword";
import NonFound from "./Components/NonFound";
import ResetPassword from "./Components/ResetPassword";
import Layout from "./Container/Layout";
import SendMail from "./SendMail";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/contribution" element={<EachgroupUser />} />
          <Route path="account" element={<Account />} />
          <Route path="messages" element={<Messages />} />
          <Route path="createThrift" element={<CreateThrift />} />
          <Route path="pay" element={<Fetch />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/sendMail" element={<SendMail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/jointhrift/:id" element={<JoinGroup />} />
        <Route path="*" element={<NonFound />} />
      </Routes>
    </div>
  );
}

export default App;
