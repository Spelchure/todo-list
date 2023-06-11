import {body} from 'express-validator';

export const createTodoValidator = [
  body('title')
    .isString()
    .withMessage('Title is required and should be string'),
  body('description')
    .isString()
    .withMessage('Description is required and should be string'),
];

export const deleteTodoValidator = [
  body('id').isUUID().withMessage('Todo id is required for deletion'),
];
