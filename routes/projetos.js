import express from 'express';
import { listarProjeto, criarProjeto, editarProjeto, deletarProjeto, buscarProjetoPorId, filtrarProjeto } from '../controllers/projetosController.js'
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('capa'), criarProjeto);
router.post('/buscar', listarProjeto);
router.get('/:id', buscarProjetoPorId);
router.get('/filtro', filtrarProjeto)
router.put('/', editarProjeto);
router.delete('/', deletarProjeto);

export default router;