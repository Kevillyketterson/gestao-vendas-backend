const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ======== ROTAS ========

// Criar cliente
app.post('/clients', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, email, phone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// Listar clientes
app.get('/clients', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

// Criar pagamento
app.post('/payments', async (req, res) => {
  const { client_id, amount, due_date, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO payments (client_id, amount, due_date, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [client_id, amount, due_date, status || 'pendente']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
});

// Listar pagamentos de um cliente
app.get('/payments/:client_id', async (req, res) => {
  const { client_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM payments WHERE client_id = $1 ORDER BY due_date",
      [client_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar pagamentos' });
  }
});

// Atualizar status de pagamento
app.put('/payments/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE payments SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar pagamento' });
  }
});

// ======== START SERVER ========
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
