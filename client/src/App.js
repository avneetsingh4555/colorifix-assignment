import logo from './logo.svg';
import './App.css';
import UsersList from './features/users-list';
import Navbar from './layout/navbar';
import AddUsersForm from './forms/add-users';
import {
  Route,
  Router,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <div class="navbar-area">
      <Navbar/>
      </div>  
 
    <div class="container">
    <Routes>
    <Route path="users-list" element={<UsersList />} />
     
    </Routes>
    <Routes>
    <Route path="/" element={<AddUsersForm />} />
     
    </Routes>
    
  </div>  
 </div>
  );
}

export default App;
