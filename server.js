import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import usuariosRoutes from './routes/usuarios.js';
import projetosRoutes from './routes/projetos.js';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());


// Rota inicial
app.get('/', (req, res) => {
  res.json({ mensagem: 'Olá do backend!' });
});


// Rotas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/projetos', projetosRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
