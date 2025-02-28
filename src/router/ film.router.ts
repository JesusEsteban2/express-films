import { Router } from 'express';
import { FilmsController } from '../controllers/films.controller.js';
import { Repository } from '../repo/repositorytype.js';
import { Film } from '@prisma/client';
import { FilmPrismaRepo } from '../repo/filmsrepository.js';

export const filmsRouter = Router();

const repoFilms: Repository<Film> = new FilmPrismaRepo();
const filmsController = new FilmsController(repoFilms);

filmsRouter.get('/', filmsController.getAll.bind(filmsController));

filmsRouter.get('/:id', filmsController.getById.bind(filmsController));

filmsRouter.post('/', filmsController.post.bind(filmsController));

filmsRouter.patch('/:id', filmsController.patch.bind(filmsController));

filmsRouter.delete('/:id', filmsController.delete.bind(filmsController));

// Sustituye a las líneas de app
// app.get('/api/films', repoFilms.read);
// app.get('/api/films/id', repoFilms.readById);
// app.post('/api/films', repoFilms.create);
// app.patch('/api/films/:id', repoFilms.update);
// app.delete('/api/films/:id', repoFilms.delete);
