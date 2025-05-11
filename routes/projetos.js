import express from 'express';
import { listarProjeto, criarProjeto, editarProjeto, deletarProjeto } from '../controllers/projetosController.js'
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('capa'), criarProjeto);
router.get('/', listarProjeto);
router.put('/', editarProjeto);
router.delete('/', deletarProjeto);

export default router;