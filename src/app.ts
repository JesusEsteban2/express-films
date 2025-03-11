import express from 'express';
import createDebug from 'debug';
import { resolve } from 'path';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { debugLogger } from './middleware/debug-logger.js';
import {
    notFoundController,
    notMethodController,
} from './controllers/base.controller.js';
import { errorManager } from './controllers/errors.controller.js';
import { MPayload } from './services/auth.service.js';
import { CreateRouter } from './router/create.router.js';
import { rateLimit } from 'express-rate-limit';

// Limiter Comiguration 3 req in 3 sec
const limiter = rateLimit({
    windowMs: 3000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too Many Requests',
    },
});

// Expansión de interface Request
declare module 'express' {
    interface Request {
        user?: MPayload;
    }
}

const debug = createDebug('films:app');
debug('Loaded module');

export const createApp = () => {
    debug('Iniciando App...');

    const app = express();
    const __dirname = resolve();
    const publicPath = resolve(__dirname, 'public');

    app.disable('x-powered-by');

    debug('Registrando Middleware...');

    // Middlewares
    // Cors paquete de node-express que habilita rutas para evitar el (Cross-Origin Resource Sharing de HTTP)
    // (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing),(https://expressjs.com/en/resources/middleware/cors.html)
    app.use(cors());
    if (!process.env.DEBUG) {
        app.use(morgan('dev'));
    }

    // use midelware limiter for all request.
    app.use(limiter);

    // Función middleware de express que habilita el parseo automático de los archivos json.
    // (https://expressjs.com/en/5x/api.html#express.json)
    app.use(express.json());
    // Función middleware de express que aplica modificadores al parseo de las URL .
    // (https://expressjs.com/en/5x/api.html#express.urlencoded), (https://expressjs.com/en/resources/middleware/body-parser.html)
    app.use(bodyParser.urlencoded({ extended: true }));
    // Función definida en la carpeta middleware
    app.use(debugLogger('debug-logger'));
    // función middleware de express que habilita servir como estáticos la carpeta indicada.
    // (https://expressjs.com/en/5x/api.html#example.of.express.static)
    app.use(express.static(publicPath));

    /* App Routes */
    // Reviews
    const createRouter = new CreateRouter();

    app.use('/api/review', createRouter.createReviewRouter());
    // User
    app.use('/api/users', createRouter.createUsersRouter());
    // Film
    app.use('/api/films', createRouter.createFilmRouter());
    // Category
    app.use('/api/category', createRouter.createCategoryRouter());

    // const homeView = new HomePage();
    // const homeController = new HomeController(homeView);
    // app.get('/', homeController.getPage);

    // const productsController = new ProductsController(animalModel);

    // app.use('/products', createProductsRouter(productsController));

    app.get('*', notFoundController);
    app.use('*', notMethodController);

    app.use(errorManager);

    return app;
};
