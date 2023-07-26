import React, { useState } from 'react';
import { getAllEmployees, getEmployeeById } from '../services/api';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchId, setSearchId] = useState('');
  const [searchedEmployee, setSearchedEmployee] = useState(null);

  const handleGetAllEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployees();
      if (response && response.data && Array.isArray(response.data)) {
        setEmployees(response.data);
        setError('');
      } else {
        setError('Datos inválidos recibidos desde el servidor.');
      }
    } catch (error) {
      setError('Error importando empleados: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetEmployeeById = async () => {
    if (!searchId) {
      handleGetAllEmployees();
      return;
    }

    try {
      setLoading(true);
      const response = await getEmployeeById(parseInt(searchId));
      if (response && response.data) {
        setEmployees([response.data]);
        setError('');
        // Clear the search input after finding the employee
        setSearchId('');
      } else {
        setError('Empleado no encontrado con ID: ' + searchId);
        setSearchedEmployee(null);
      }
    } catch (error) {
      setError('Error importando empleado con ID ' + searchId + ': ' + error.message);
      setSearchedEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col justify-content-center d-flex">
          <button className="btn btn-primary" onClick={handleGetAllEmployees} disabled={loading}>
            {loading ? 'Cargando...' : 'Obtener todos los empleados'}
          </button>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={handleGetEmployeeById} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar por ID'}
          </button>
        </div>
      </div>
      {error && <p className="alert alert-danger">Error: {error}</p>}
      {!searchedEmployee ? (
        <table className="table table-striped table-bordered table-shadow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Salario Mensual</th>
              <th>Salario Anual</th>
              <th>Edad</th>
              <th>Foto de Perfil</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.employee_name}</td>
                <td>${employee.employee_salary.toLocaleString()}</td>
                <td>${employee.annualSalary.toLocaleString()}</td>
                <td>{employee.employee_age}</td>
                <td>{employee.profile_image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-success">
          <h3>Empleado ID: {searchId}</h3>
          <p>Nombre: {searchedEmployee.employee_name}</p>
          <p>Salario Mensual: {searchedEmployee.employee_salary}</p>
          <p>Edad: {searchedEmployee.employee_age}</p>
          <p>Foto de Perfil: {searchedEmployee.profile_image}</p>
          <p>Salario Anual: {searchedEmployee.annualSalary}</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;