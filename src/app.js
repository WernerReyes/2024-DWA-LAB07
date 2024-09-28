import { MongoDatabase } from './data/index.js';
import { Server } from './server.js';
import { AppRoutes } from './routes/index.js';

(async () => {
    await main();
})();


async function main() {
    MongoDatabase.connect({
        mongoUrl: 'mongodb://127.0.0.1:27017',
        dbName: 'Negocio2024',
    });

    const server = new Server({
        port: process.env.PORT || 8000,
        publicPath: 'public',
        routes: AppRoutes.routes,
    });

    server.start();

}