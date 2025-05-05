import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function listarUsuarios(req, res) {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
}

export async function criarUsuario(req, res) {
    const { nomeUsuario, email, senha } = req.body;

    try {
        const novoUsuario = await prisma.usuario.create({
        data: { nomeUsuario, email, senha },
        });
        res.status(201).json(novoUsuario);
    } catch (erro) {
        res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: erro.message });
    }
}
  