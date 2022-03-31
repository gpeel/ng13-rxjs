const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./_json-server/db.json', null);
const middlewares = jsonServer.defaults(null);

server.use(middlewares);

// server.get('/orderStatuses', (req, res, next) => {
//     setTimeout(() => {
//         next();
//     }, 1500);
// });

server.get('/orderStatuses', (req, res, next) => {
    // console.log('req', req.params);
    // foro http://localhost:3300/orderStatuses?fil=rr
    // you get: { fil: 'rr' }
    // console.log('req', req.query);
    // node_modules/@types/express-serve-static-core/index.d.ts <= Request interface
    setTimeout(() => {
        next();
    }, 1500);
});

server.get('*', (req, res, next) => {
    setTimeout(() => {
        next();
    }, 500);
});


server.use(router);
const port = process.env.PORT || 3300;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
