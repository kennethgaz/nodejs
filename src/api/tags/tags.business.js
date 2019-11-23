import TagDAO from './tags.dao';

const dao = new TagDAO();

export default class TagBusiness {

    async findAll(postId) {
        return await dao.findAll(postId);
    }

    async findById(postId, id) {
        return await dao.findById(postId, id);
    }

    async create(postId, payload) {
        return await dao.create(postId, payload);
    }

    async update(postId, id, payload) {
        return await dao.update(postId, id, payload);
    }

    async destroy(postId, id) {
        return await dao.destroy(postId, id);
    }

}
