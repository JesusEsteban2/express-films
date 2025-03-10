import { NextFunction, Request, Response } from 'express';
import { Category } from '@prisma/client';
import { Repository2 } from '../repo/repositorytype.js';
import { AppResponse } from '../middleware/responseJson.js';
import debug from 'debug';

export class CategoriesController {
    constructor(private repoCategories: Repository2<Category>) {}

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.repoCategories.read();
            const data: AppResponse<Category> = {
                data: categories,
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
            const categories = await this.repoCategories.readById(id);
            const data: AppResponse<Category> = {
                data: [categories],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const { body } = req.body;
            const categories = await this.repoCategories.create(body);
            const data: AppResponse<Category> = {
                data: [categories],
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
            const { body } = req.body;
            const categories = await this.repoCategories.update(id, body);
            const data: AppResponse<Category> = {
                data: [categories],
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
            const categories = await this.repoCategories.delete(id);
            const data: AppResponse<Category> = {
                data: [categories],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}
