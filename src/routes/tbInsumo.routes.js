import { Router } from "express";
import { TbInsumoController } from "../controllers/index.js";

export class TbInsumoRoutes {
    static get routes() {
        const router = Router();

        const tbInsumoController = new TbInsumoController();

        router.get('/', tbInsumoController.get);
        router.post('/', tbInsumoController.post);
        router.post('/update', tbInsumoController.put);
        router.get('/delete/:id', tbInsumoController.delete);

        return router;

    }
}