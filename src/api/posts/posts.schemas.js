import * as Joi from '@hapi/joi';

export const params = Joi.object({
    id: Joi.number().required()
});

export const payload = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().required()
});
