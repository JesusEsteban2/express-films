import { NextFunction, Request, Response } from 'express';
import { Film } from '@prisma/client';
import { Repository } from '../repos/repositorytype.js';
import { AppResponse } from '../middleware/responseJson.js';
import debug from 'debug';
import { FilmCreateDTO } from '../DTO/films.dto.js';

export class FilmsController {
    constructor(private repoFilms: Repository<Film>) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const films = await this.repoFilms.read();
            const data: AppResponse<Film> = {
                data: films,
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        debug('getById');
        try {
            const { id } = req.params;
            const films = await this.repoFilms.readById(id);
            const data: AppResponse<Film> = {
                data: [films],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            FilmCreateDTO.parse(req.body);
            const newData: Film = req.body;
            const films: Film = await this.repoFilms.create(newData);
            const data: AppResponse<Film> = {
                data: [films],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            FilmCreateDTO.partial().parse(req.body);
            const newData = req.body;
            console.log('body: ', newData);
            const films = await this.repoFilms.update(id, newData);
            const data: AppResponse<Film> = {
                data: [films],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const films = await this.repoFilms.delete(id);
            const data: AppResponse<Film> = {
                data: [films],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
