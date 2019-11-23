import PostDAO from './posts.dao';

const dao = new PostDAO();

export default class PostBusiness {

    async findAll() {
        return await dao.findAll();
    }

    async findById(id) {
        return await dao.findById(id);
    }

    async create(payload) {
        return await dao.create(payload);
    }

    async update(id, payload) {
        return await dao.update(id, payload);
    }

    async destroy(id) {
        return await dao.destroy(id);
    }

}
