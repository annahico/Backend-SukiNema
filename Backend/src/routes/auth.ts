import express, { Request, Response, Router } from 'express';

// Crear una instancia de Router
const router: Router = express.Router();

// Definir la ruta GET para /register
router.get('/register', (req: Request, res: Response): void => {
  res.send('register');
});

// Exportar el router por defecto
export default router;
