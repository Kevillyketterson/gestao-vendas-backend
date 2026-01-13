import React, { useState } from 'react';
import Payments from './Payments';

export default function ClientList({ clients, API_URL }) {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <div>
      {clients.map(client => (
        <div key={client.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <b>{client.name}</b> - {client.email} - {client.phone}
          <button onClick={() => setSelectedClient(client)}>Ver Pagamentos</button>
        </div>
      ))}
      {selectedClient && <Payments client={selectedClient} API_URL={API_URL} />}
    </div>
  );
}
