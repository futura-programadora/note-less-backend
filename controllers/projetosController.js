import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listarProjeto(req, res) {
    const { userId } = req.body;

    try {
        const projetos = await prisma.projeto.findMany({
            where: {
                userId: userId,
            },
            include: {
                paginas: true
            }
        });

        res.json(projetos);
    } catch (erro) {
        console.error('Erro ao listar projetos:', erro);
        res.status(500).json({ erro: 'Erro ao buscar projetos.' });
    }
}


export async function criarProjeto(req, res) {
    const { titulo, tipo, capa, userId } = req.body;

    try {
        const novoProjeto = await prisma.projeto.create({
            data: {
                titulo,
                tipo,
                capa,
                userId,
                paginas: {
                    create: {
                        conteudo: '',           // conteúdo inicial da página
                        corFundo: '#ffffff',    // cor de fundo padrão
                        numero: 1               // número da página inicial
                    }
                }
            },
            include: {
                paginas: true
            }
        });

        res.status(200).json(novoProjeto);
    } catch (erro) {
        console.error('Erro ao criar projeto com página inicial:', erro);
        res.status(400).json({ erro: 'Erro ao criar projeto', detalhes: erro.message });
    }
}


export async function editarProjeto(req, res) {

}

export async function deletarProjeto(req, res) {

}