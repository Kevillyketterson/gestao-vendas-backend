import React, { useState } from 'react';
import axios from 'axios';

export default function AddClient({ fetchClients, API_URL }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/clients`, { name, email, phone });
    setName(''); setEmail(''); setPhone('');
    fetchClients();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} required/>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <button type="submit">Adicionar Cliente</button>
    </form>
  );
}
