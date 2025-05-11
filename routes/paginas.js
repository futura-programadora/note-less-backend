import express from 'express';
import { listarPaginas, criarPagina, editarPagina, deletarPagina } from '../controllers/paginasController.js';

const router = express.Router();

router.post('/', criarPagina);
router.get('/', listarPaginas);
router.put('/', editarPagina);
router.delete('/', deletarPagina);

export default router;