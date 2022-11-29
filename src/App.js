import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import LoggedRoute from "./PrivateRoute/LoggedRoute";
// import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route
            exact
            path="/home"
            element={
              // <PrivateRoute>
              <Dashboard />
              // </PrivateRoute>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <LoggedRoute>
                <Login />
              </LoggedRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <LoggedRoute>
                <Register />
              </LoggedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
