import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Task from "./components/Task";
import Category from "./components/Category";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./components/Navbar";
import Privaterouting from "./components/Privaterouting";
function App() {
  return (
    <div>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<Privaterouting />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Task" element={<Task />} />
          <Route path="/Category" element={<Category />} />
          </Route>
        </Routes>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
