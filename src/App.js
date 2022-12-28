import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Certificate from "./components/Certificate/Certificate";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Dashboard from "./components/Dashboard/Dashboard";
import ImportData from "./components/ImportData/ImportData";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import LoggedRoute from "./PrivateRoute/LoggedRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/home" />} />
          <Route exact path="/home" element={<Dashboard />} />
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
          <Route
            exact
            path="/panel"
            element={
              <PrivateRoute>
                <ControlPanel />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/certificates"
            element={
              <PrivateRoute>
                <Certificate />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/import"
            element={
              <PrivateRoute>
                <ImportData />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
