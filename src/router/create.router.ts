import { Router } from 'express';
import createDebug from 'debug';
import { FilmsController } from '../controllers/films.controller.js';
import { FilmPrismaRepo } from '../repo/filmsrepository.js';
import { ReviewRepo } from '../repo/review.repository.js';
import { ReviewsController } from '../controllers/review.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { UserRepo } from '../repo/repositorytype.js';
import { Role, User } from '@prisma/client';
import { UserRepository } from '../repo/users.repo.js';
import { UsersController } from '../controllers/users.controllers.js';
import { CategoryPrismaRepo } from '../repo/categories.repo.js';
import { CategoriesController } from '../controllers/category.controller.js';

const debug = createDebug('movies:router:createRouters');

const reviewRepo = new ReviewRepo();
const reviewControl = new ReviewsController(reviewRepo);
const auth = new AuthInterceptor(reviewRepo);

const filmRepo = new FilmPrismaRepo();
const filmsControl = new FilmsController(filmRepo);

const userRepo: UserRepo<User> = new UserRepository();
const userController = new UsersController(userRepo);

const categoriesRepo = new CategoryPrismaRepo();
const categoriesControl = new CategoriesController(categoriesRepo);

export class CreateRouter {
    constructor() {}

    createUsersRouter() {
        debug('Ejecutando createUsersRouter');

        const userRouter = Router();

        userRouter.post('/', userController.register.bind(userController));
        userRouter.post('/login', userController.login.bind(userController));

        return userRouter;
    }

    createReviewRouter() {
        debug('Ejecutando createReviewsRouter');

        const reviewsRouter = Router();
        reviewsRouter.get('/', auth.authenticate, reviewControl.getAll);
        reviewsRouter.get('/:id', auth.authenticate, reviewControl.getById);
        reviewsRouter.post('/', auth.authenticate, reviewControl.create);
        reviewsRouter.patch(
            '/:id',
            auth.authenticate,
            auth.isOwnerReview,
            reviewControl.update,
        );
        reviewsRouter.delete(
            '/:id',
            auth.authenticate,
            auth.isOwnerReview,
            reviewControl.delete,
        );
        return reviewsRouter;
    }

    createFilmRouter() {
        debug('Ejecutando createFilmsRouter');
        const filmsRouter = Router();

        filmsRouter.get('/', filmsControl.getAll.bind(filmsControl));

        filmsRouter.get('/:id', filmsControl.getById.bind(filmsControl));

        filmsRouter.post(
            '/',
            auth.authenticate,
            auth.hasRole(Role.EDITOR),
            filmsControl.post.bind(filmsControl),
        );

        filmsRouter.patch(
            '/:id',
            auth.authenticate,
            auth.hasRole(Role.EDITOR),
            filmsControl.patch.bind(filmsControl),
        );

        filmsRouter.delete(
            '/:id',
            auth.authenticate,
            auth.hasRole(Role.EDITOR),
            filmsControl.delete.bind(filmsControl),
        );

        return filmsRouter;
    }

    createCategoryRouter() {
        debug('Ejecutando createCategoryRouter');
        const categoriesRouter = Router();

        categoriesRouter.get(
            '/',
            categoriesControl.getAll.bind(categoriesControl),
        );

        categoriesRouter.get(
            '/:id',
            categoriesControl.getById.bind(categoriesControl),
        );

        categoriesRouter.post(
            '/',
            auth.authenticate,
            auth.hasRole(Role.EDITOR),
            categoriesControl.post.bind(categoriesControl),
        );

        categoriesRouter.patch(
            '/:id',
            auth.authenticate,
            auth.hasRole(Role.EDITOR),
            categoriesControl.patch.bind(categoriesControl),
        );

        categoriesRouter.delete(
            '/:id',
            auth.authenticate,
            auth.hasRole(Role.EDITOR),
            categoriesControl.delete.bind(categoriesControl),
        );

        return categoriesRouter;
    }
}

// Sustituye a las líneas de app
// app.get('/api/films', repoFilms.read);
// app.get('/api/films/id', repoFilms.readById);
// app.post('/api/films', repoFilms.create);
// app.patch('/api/films/:id', repoFilms.update);
// app.delete('/api/films/:id', repoFilms.delete);
