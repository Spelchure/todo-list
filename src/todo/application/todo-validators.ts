import {body} from 'express-validator';

export const createTodoValidator = [
  body('title')
    .isString()
    .withMessage('Title is required and should be string'),
  body('description')
    .isString()
    .withMessage('Description is required and should be string'),
];
