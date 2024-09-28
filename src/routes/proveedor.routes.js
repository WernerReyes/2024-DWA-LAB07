import { Router } from 'express';
import { ProveedorController } from '../controllers/index.js';

export class ProveedorRoutes {
    static get routes() {
        const router = Router();

        const proveedorController = new ProveedorController();

        router.get('/', proveedorController.get);
        router.post('/', proveedorController.post);
        router.post('/update', proveedorController.put);
        router.get('/delete/:id', proveedorController.delete);

        return router;

    }
}