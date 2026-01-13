import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Payments({ client, API_URL }) {
  const [payments, setPayments] = useState([]);
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchPayments = async () => {
    const res = await axios.get(`${API_URL}/payments/${client.id}`);
    setPayments(res.data);
  };

  useEffect(() => { fetchPayments(); }, [client]);

  const addPayment = async () => {
    await axios.post(`${API_URL}/payments`, { client_id: client.id, amount, due_date: dueDate });
    setAmount(''); setDueDate('');
    fetchPayments();
  };

  const markPaid = async (id) => {
    await axios.put(`${API_URL}/payments/${id}`, { status: 'pago' });
    fetchPayments();
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Pagamentos de {client.name}</h3>
      <input placeholder="Valor" value={amount} onChange={e=>setAmount(e.target.value)} />
      <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
      <button onClick={addPayment}>Adicionar Pagamento</button>

      <ul>
        {payments.map(p => (
          <li key={p.id}>
            {p.amount} - {p.due_date} - {p.status} 
            {p.status === 'pendente' && <button onClick={()=>markPaid(p.id)}>Marcar Pago</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
