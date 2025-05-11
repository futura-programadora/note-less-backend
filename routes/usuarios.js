import express from 'express';
import { listarUsuarios, criarUsuario, loginUsuario, editarUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', listarUsuarios);
router.post('/', criarUsuario);
router.post('/login', loginUsuario);
router.put('/', editarUsuario);

export default router;
