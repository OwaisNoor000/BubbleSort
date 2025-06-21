import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "../pages/Chat";
import Login from "../pages/Login";

export default function AppRoutes(){
    return(<Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/welcome" element={<Login />} />
      </Routes>
    </Router>)
     
}