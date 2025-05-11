import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { cloudinaryV2 } from '../config/cloudinary.js';
import fs from 'fs'; 

export async function listarProjeto(req, res) {
  const { userId } = req.body;

  try {
    const projetos = await prisma.projeto.findMany({
      where: { userId },
      include: { paginas: true }
    });

    res.json(projetos);
  } catch (erro) {
    console.error('Erro ao listar projetos:', erro);
    res.status(500).json({ erro: 'Erro ao buscar projetos.' });
  }
}

export async function buscarProjetoPorId(req, res) {
  const { id } = req.params;

  try {
    const projeto = await prisma.projeto.findUnique({
      where: { id },
      include: { paginas: true }
    });

    if (!projeto) {
      return res.status(404).json({ erro: 'Projeto não encontrado.' });
    }

    res.status(200).json(projeto);
  } catch (erro) {
    console.error('Erro ao buscar projeto por ID:', erro);
    res.status(500).json({ erro: 'Erro ao buscar projeto.' });
  }
}

export async function filtrarProjeto(req, res) {
  const { tipo } = req.body;

  try {
    const projetosFiltrados = await prisma.projeto.findMany({
      where: {
        tipo: {
          contains: tipo,
          mode: 'insensitive' // ignora maiúsculas/minúsculas
        }
      },
      include: {
        paginas: true
      }
    });

    res.status(200).json(projetosFiltrados);
  } catch (erro) {
    console.error('Erro ao filtrar projetos:', erro);
    res.status(400).json({ erro: 'Erro ao filtrar projetos' });
  }
}


export async function criarProjeto(req, res) {
    const { titulo, tipo, userId } = req.body;
    const capa = req.file?.path; // Caminho temporário da imagem salvo no servidor

    try {
        // Fazer o upload da imagem para o Cloudinary
        const uploadResponse = await cloudinaryV2.uploader.upload(capa, {
            folder: 'note_less',  // Pasta no Cloudinary para organizar as imagens
        });

        // Obter a URL segura (link público) da imagem no Cloudinary
        const capaUrl = uploadResponse.secure_url;  // URL gerada pelo Cloudinary

        // Criar o projeto e salvar a URL da capa (não o caminho local)
        const novoProjeto = await prisma.projeto.create({
            data: {
                titulo,
                tipo,
                capa: capaUrl, // Aqui você armazena o link da imagem no Cloudinary
                userId,
                paginas: {
                    create: {
                        conteudo: '',
                        corFundo: '#ffffff',
                        numero: 1
                    }
                }
            },
            include: {
                paginas: true
            }
        });

        // Remover o arquivo local após o upload (opcional)
        fs.unlinkSync(capa);  // Exclui o arquivo local da pasta 'uploads'

        res.status(200).json(novoProjeto);  // Retorna o novo projeto
    } catch (erro) {
        console.error('Erro ao criar projeto com página inicial:', erro);
        res.status(400).json({ erro: 'Erro ao criar projeto', detalhes: erro.message });
    }
}

export async function editarProjeto(req, res) {
  // implementar depois
}

export async function deletarProjeto(req, res) {
  // implementar depois
}
