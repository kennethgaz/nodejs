import * as Joi from '@hapi/joi';

export const params = Joi.object({
    postId: Joi.number().required(),
    id: Joi.number()
});

export const payload = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    postId: Joi.number().required(),
});
