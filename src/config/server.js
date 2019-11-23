import { server as _server } from '@hapi/hapi';
import { Sequelize } from 'sequelize';

const init = async () => {
    const server = _server({
        port: 3000,
        host: 'localhost'
    });

    const sequelize = new Sequelize('sqlite:blog.sqlite');

    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'sqlite',
                    models: [
                        'src/api/**/**.models.js'
                    ],
                    sequelize,
                    sync: true
                }
            ]
        },
        {
            plugin: require('hapi-router'),
            options: {
                routes: 'src/api/**/**.routes.js'
            }
        }
    ]);

    try {
        await sequelize.sync({ force: true });
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
