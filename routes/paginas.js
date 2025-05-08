import express from 'express';
import { listarPaginas, criarPaginas, editarPagina, deletarPagina } from '../controllers/paginasController.js';

const router = express.Router();

router.post('/', criarPaginas);
router.get('/', listarPaginas);
router.put('/', editarPagina);
router.delete('/', deletarPagina);

export default router;