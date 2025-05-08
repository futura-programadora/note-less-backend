import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listarPaginas(req, res) {
    const { projetoId } = req.body;

    try {
        const paginas = await prisma.pagina.findMany({
            where: {
                projetoId: projetoId,
            },
        });

        res.json(paginas);
    } catch (erro) {
        console.error('Erro ao listar as paginas desse projeto:', erro);
        res.status(500).json({ erro: 'Erro ao buscar as páginas desse projeto.' });
    }
}

export async function criarPagina(req, res) {
    const { projetoId } = req.body;

    try {
        // Conta quantas páginas já existem no projeto, para definir o número da nova
        const totalPaginas = await prisma.pagina.count({
            where: { projetoId }
        });

        const novaPagina = await prisma.pagina.create({
            data: {
                conteudo: '',
                corFundo: '#ffffff',
                numero: totalPaginas + 1,
                projetoId
            }
        });

        res.status(200).json(novaPagina);
    } catch (erro) {
        console.error('Erro ao adicionar nova página:', erro);
        res.status(400).json({
            erro: 'Erro ao adicionar nova página',
            detalhes: erro.message
        });
    }
}


export async function editarPagina(req, res) {
    const { id, conteudo, corFundo, numero } = req.body;

    try {
        const paginaAtualizada = await prisma.pagina.update({
            where: { id },
            data: {
                conteudo,
                corFundo,
                numero
            }
        });

        res.status(200).json(paginaAtualizada);
    } catch (erro) {
        console.error('Erro ao editar página:', erro);
        res.status(400).json({
            erro: 'Erro ao editar página',
            detalhes: erro.message
        });
    }
}


export async function deletarPagina(req, res) {
    const { id } = req.body;

    try {
        await prisma.pagina.delete({
            where: { id }
        });

        res.status(200).json({ mensagem: 'Página deletada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao deletar página:', erro);
        res.status(400).json({
            erro: 'Erro ao deletar página',
            detalhes: erro.message
        });
    }
}
