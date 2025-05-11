import pkg from 'cloudinary';
import multer from 'multer';  // Importando multer para manipulação de arquivos
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();  // Carrega as variáveis de ambiente

// Verifica o caminho absoluto da pasta atual
const __dirname = path.resolve(path.dirname(''));

// Verifica se a pasta 'uploads' existe e cria, caso contrário
const uploadPath = path.join(__dirname, 'config', 'uploads'); // Garante que o caminho seja correto
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuração do Cloudinary
const { v2: cloudinaryV2 } = pkg;

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuração do Multer para fazer upload de arquivos temporariamente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);  // Usando o caminho correto da pasta 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Nome único para o arquivo
  }
});

const upload = multer({ storage: storage });  // Exporta o upload para usar em outras partes

export { upload, cloudinaryV2 };
