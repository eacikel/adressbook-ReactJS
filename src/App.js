import React, {Component} from 'react';
import Navbar from "./components/Navbar";
import AddUser from "./components/AddUser";
import Users from "./components/Users";
import './App.css';
import User from './components/User';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Navbar title = "User List"/> 
        <hr/>
        <AddUser />
        <Users/>    
      </div>
    );
  }
}
export default App;