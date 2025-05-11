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
  
export async function loginUsuario(req, res) {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({
            where: { email } // apenas email aqui, pois é único
        });

        if (!usuario || usuario.senha !== senha) {
            return res.status(401).json({ erro: 'Email ou senha inválidos' });
        }

        res.status(200).json({
            message: 'Login bem-sucedido!',
            usuario: {
                id: usuario.id,
                senha: usuario.senha,
                email: usuario.email,
                nomeUsuario: usuario.nomeUsuario
            }
        });

    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao fazer login', detalhes: erro.message });
    }
}

export async function editarUsuario(req, res) {
    const { id, email, senha } = req.body;

    try {
        const usuarioAtualizado = await prisma.usuario.update({
            where: {
                id: id
            },
            data: {
                email: email,
                senha: senha
            }
        });

        res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        console.error('Erro ao tentar editar usuario:', erro);
        res.status(500).json({ erro: 'Erro ao atualizar perfil' });
    }
}
