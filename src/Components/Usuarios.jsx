import React, { useState, useEffect } from 'react';
import './Usuarios.css';

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000/api/users');
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  function handleSort(key) {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }

  function sortData(data) {
    const { key, direction } = sortConfig;
    if (key && direction) {
      return data.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }

  return (
    <div className="table-container">
      <h1>Lista de Usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>
              <button className="table-header" onClick={() => handleSort('id')}>
                ID
              </button>
            </th>
            <th>
              <button className="table-header" onClick={() => handleSort('codigo_usuario')}>
                Código de usuario
              </button>
            </th>
            <th>
              <button className="table-header" onClick={() => handleSort('nombre_usuario')}>
                Nombre de usuario
              </button>
            </th>
            <th>
              <button className="table-header" onClick={() => handleSort('contrasena')}>
                Contraseña
              </button>
            </th>
            <th>
              <button className="table-header" onClick={() => handleSort('fecha_alta')}>
                Fecha de alta
              </button>
            </th>
            <th>
              <button className="table-header" onClick={() => handleSort('activo')}>
                Activo
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortData(users).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.codigo_usuario}</td>
              <td>{user.nombre_usuario}</td>
              <td>{user.contrasena}</td>
              <td>{user.fecha_alta}</td>
              <td>{user.activo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
