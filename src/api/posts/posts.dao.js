import { instances } from 'hapi-sequelizejs';

const Post = instances.getModel('Post');

export default class PostDAO {
    async findAll() {
        return await Post.findAll();
    }

    async findById(id) {
        return await Post.findByPk(id);
    }

    async create(payload) {
        return await Post.create(payload);
    }

    async update(id, payload) {
        await Post.update(payload, { where: { id } });
        return await this.findById(id);
    }

    async destroy(id) {
        return await Post.destroy({ where: { id } });
    }
}
