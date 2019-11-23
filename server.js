const Hapi = require('@hapi/hapi');
const { Sequelize, Model, DataTypes } = require('sequelize');
const { CREATED, OK } = require('http-status');

const sequelize = new Sequelize('sqlite:blog.sqlite');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    class Post extends Model {}
    Post.init({
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {sequelize, modelName: 'post'});

    server.route({
        method: 'POST',
        path: '/posts',
        handler: async (request, h) => {
            const { payload } = request;
            const post = await Post.create(payload);

            return h.response(post).code(CREATED);
        }
    });

    server.route({
        method: 'PUT',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { params: { id }, payload } = request;
            const post = await Post.update(payload, { where: { id }});

            return h.response(post).code(OK);
        }
    });

    server.route({
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            return await Post.findAll();
        }
    });

    try {
        await sequelize.sync({ force: true });
        Post.bulkCreate([
            {title: 'a', content: 'b'},
            {title: 'a', content: 'c'}
        ]);
    } catch (e) {
        throw new Error(e);
    }

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();