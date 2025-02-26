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

// import { createProductsRouter } from './routers/products.router.js';
// import { HomePage } from './views/pages/home-page.js';

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
  // función middleware de express que habilita el parseo automático de los archivos json.
  // (https://expressjs.com/en/5x/api.html#express.json)
  app.use(express.json());
  // función middleware de express que aplica modificadores al parseo de las URL .
  // (https://expressjs.com/en/5x/api.html#express.urlencoded), (https://expressjs.com/en/resources/middleware/body-parser.html)
  app.use(bodyParser.urlencoded({ extended: true }));
  // función definida en la carpeta middleware
  app.use(debugLogger('debug-logger'));
  // función middleware de express que habilita servir como estáticos la carpeta indicada.
  // (https://expressjs.com/en/5x/api.html#example.of.express.static)
  app.use(express.static(publicPath));

  // Routes

  // const homeView = new HomePage();
  // const homeController = new HomeController(homeView);
  // app.get('/', homeController.getPage);

  // let animalModel: Repository<Animal>;
  // switch (process.env.REPO as 'file' | 'sqlite' | 'mysql' | 'prisma') {
  //     case 'sqlite':
  //         animalModel = new AnimalSqliteRepo();
  //         break;
  //     case 'mysql':
  //         animalModel = new AnimalMySqlRepo();
  //         break;
  //     case 'prisma':
  //         animalModel = new AnimalPrismaRepo();
  //         break;
  //     case 'file':
  //         animalModel = new AnimalFileRepo();
  //         break;
  //     default:
  //         throw new Error('Invalid repository');
  // }

  // const productsController = new ProductsController(animalModel);

  // app.use('/products', createProductsRouter(productsController));

  app.get('*', notFoundController);
  app.use('*', notMethodController);

  app.use(errorManager);

  return app;
};
