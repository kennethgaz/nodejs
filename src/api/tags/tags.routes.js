import { OK, CREATED, NO_CONTENT, NOT_FOUND } from 'http-status';
import * as Schemas from './tags.schemas';
import TagBusiness from './tags.business';

const business = new TagBusiness();

export default [
    {
        method: 'GET',
        path: '/posts/{postId}/tags',
        handler: async (request, h) => {
            const { postId } = request.params;
            const resp = await business.findAll(postId);
            if (resp && resp.length > 0) {
                return h.response(resp).code(OK);
            }
            return h.response({}).code(NOT_FOUND);
        },
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'GET',
        path: '/posts/{postId}/tags/{id}',
        handler: async (request, h) => {
            const { postId, id } = request.params;
            const resp = await business.findById(postId, id);
            if (resp) {
                return h.response(resp).code(OK);
            }
            return h.response({}).code(NOT_FOUND);
        },
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: '/posts/{postId}/tags',
        handler: async (request, h) => {
            const { payload, params: { postId } } = request;
            const resp = await business.create(postId, payload);
            if (resp) {
                return h.response(resp).code(CREATED);
            }
            return h.response({}).code(NOT_FOUND);
        },
        config: {
            validate: {
                params: Schemas.params,
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/posts/{postId}/tags/{id}',
        handler: async (request, h) => {
            const { payload, params: { postId, id } } = request;
            const resp = await business.update(postId, id, payload);
            if (resp) {
                return h.response(resp).code(OK);
            }
            return h.response({}).code(NOT_FOUND);
        },
        config: {
            validate: {
                params: Schemas.params,
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'DELETE',
        path: '/posts/{postId}/tags/{id}',
        handler: async (request, h) => {
            const { postId, id } = request.params;
            const resp = await business.destroy(postId, id);
            if (resp) {
                return h.response(resp).code(NO_CONTENT);
            }
            return h.response({}).code(NOT_FOUND);
        },
        config: {
            validate: {
                params: Schemas.params
            }
        }
    }
];
