import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Routes from "./helpers/Routes";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
