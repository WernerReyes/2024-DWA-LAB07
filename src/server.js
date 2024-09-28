import express, { Router } from 'express';
import path from 'path';

export class Server {
    app = express();
    serverListener = null;
    port = null;
    publicPath = null;
    routes = Router;


    constructor(options) {
        const { port, publicPath = "public", routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;

        this.configure();
    }

    configure() {
        //* Middlewares
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        //* Static files
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);

        //* Template engine
        this.app.set('view engine', 'ejs');

       


    }

    start() {
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    close() {
        this.serverListener?.close();
    }

}