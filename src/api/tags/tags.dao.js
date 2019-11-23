import { instances } from 'hapi-sequelizejs';

const Tag = instances.getModel('Tag');
const Post = instances.getModel('Post');

export default class TagDAO {
    async findAll(postId) {
        return await Tag.findAll({ where: { postId } });
    }

    async findById(postId, id) {
        return await Tag.findOne({ where: { postId, id } });
    }

    async create(postId, payload) {
        const post = await Post.findByPk(postId);
        if (post && payload && post.id === payload.postId) {
            return await Tag.create(payload);
        }
        return null;
    }

    async update(postId, id, payload) {
        await Tag.update(payload, { where: { postId, id } });
        return await this.findById(postId, id);
    }

    async destroy(postId, id) {
        return await Tag.destroy({ where: { postId, id } });
    }
}
