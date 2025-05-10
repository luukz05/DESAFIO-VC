import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import Perfil from "./pages/Perfil.jsx";
import Controle from "./pages/Controle.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/controle" element={<Controle />} />
      </Routes>
    </Router>
  );
}

export default App;
