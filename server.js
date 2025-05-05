import express from 'express';
import { PrismaClient } from '@prisma/client';

import usuariosRoutes from './routes/usuarios.js';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());


// Rota inicial
app.get('/', (req, res) => {
  res.json({ mensagem: 'Olá do backend!' });
});


// Rotas
app.use('/api/usuarios', usuariosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
