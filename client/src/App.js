import "./App.css";
import UsersList from "./features/users-list";
import Navbar from "./layout/navbar";
import AddUsersForm from "./forms/add-users";
import { Route, Routes } from "react-router-dom";

import AddPermissionGroup from "./forms/add-permisson-group";
function App() {
  return (
    <div className="App">
      <div className="navbar-area">
        <Navbar />
      </div>

      <div className="container mt-3">
        <Routes>
          <Route path="users-list" element={<UsersList />} />
        </Routes>
        <Routes>
          <Route path="/" element={<AddUsersForm />} />
        </Routes>
        <Routes>
          <Route path="add-permission-group" element={<AddPermissionGroup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
