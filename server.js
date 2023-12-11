const Hapi = require('@hapi/hapi');
const {quickStart, getTopHeadlines} = require('./src/handler');


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    });
    server.route([
        {
            method: "GET",
            path: '/',
            handler: (request, h) => {
                return Data = {
                    message: 'Hello World!'
                }
            }
        },
        {
            method: "GET",
            path: '/top-headlines-health-news',
            handler: async (request, h) => {
                try {
                  const headlines = await getTopHeadlines();
                  return headlines;
                } catch (error) {
                  return h.response({ error: 'Internal Server Error' }).code(500);
                }
            },
        },
        {
            method: "POST",
            path: '/text-to-speech',
            handler: quickStart
        },
        
    ])
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();