import { OK, CREATED, NO_CONTENT, NOT_FOUND } from 'http-status';
import * as Schemas from './posts.schemas';
import PostBusiness from './posts.business';

const business = new PostBusiness();

export default [
    {
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            const resp = await business.findAll();
            if (resp && resp.length > 0) {
                return h.response(resp).code(OK);
            }
            return h.response({}).code(NOT_FOUND);
        }
    },
    {
        method: 'GET',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const resp = await business.findById(request.params.id);
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
        path: '/posts',
        handler: async (request, h) => {
            const resp = await business.create(request.payload);
            return h.response(resp).code(CREATED);
        },
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { params: { id }, payload } = request;
            const resp = await business.update(id, payload);
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
        path: '/posts/{id}',
        handler: async (request, h) => {
            const resp = await business.destroy(request.params.id);
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
