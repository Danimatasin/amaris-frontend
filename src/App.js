import React from 'react';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './assets/logo.png';

function App() {
  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Navbar.Brand href="#">
        <img src={logo} width="40%" height="40%" alt="Brand Logo" className="ms-4"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container mt-4">
        <h1>Lista de Empleados</h1>
        <EmployeeTable />
      </div>
    </div>
  );
}

export default App;