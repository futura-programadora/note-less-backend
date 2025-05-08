import express from 'express';
import { listarProjeto, criarPorjeto, editarProjeto, deletarProjeto } from '../controllers/projetosController.js'

const router = express.Router();

router.post('/', criarPorjeto);
router.get('/', listarProjeto);
router.put('/', editarProjeto);
router.delete('/', deletarProjeto);

export default router;