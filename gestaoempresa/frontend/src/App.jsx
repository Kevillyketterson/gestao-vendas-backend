import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientList from './components/ClientList';
import AddClient from './components/AddClient';

function App() {
  const [clients, setClients] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchClients = async () => {
    const res = await axios.get(`${API_URL}/clients`);
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestão de Vendas</h1>
      <AddClient fetchClients={fetchClients} API_URL={API_URL}/>
      <ClientList clients={clients} API_URL={API_URL}/>
    </div>
  );
}

export default App;
