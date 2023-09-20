import "./App.css";
import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

//pages
import Homepage from "./pages/Homepage/Homepage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/login";
import Error from "./pages/Error/Error";

function App() {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Header />
          <div className="main_container">
            <Routes>
              <Route
                index
                path="/"
                element={token ? <Homepage /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!token ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!token ? <SignUp /> : <Navigate to="/" />}
              />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
