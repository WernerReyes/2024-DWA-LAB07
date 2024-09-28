import { Router } from 'express';
import { ProveedorRoutes } from './proveedor.routes.js';
import { TbInsumoRoutes } from './tbInsumo.routes.js';

export class AppRoutes {
    static get routes() {
        const router = Router();

        router.use('/proveedores', ProveedorRoutes.routes);
        router.use('/insumos', TbInsumoRoutes.routes);

        return router;
    }
}